import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, FileText, RotateCcw, Home, DollarSign, Calculator, TrendingUp, CheckCircle, BarChart3, HardHat, Hammer, Shield, Landmark, Wallet, CreditCard, AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import jsPDF from 'jspdf';
import { cn } from '@/lib/utils';
import BrandedReportModal from '@/components/BrandedReportModal';

// Branding data type
interface BrandingData {
  displayName: string;
  companyName: string;
  title: string;
  businessPhone: string;
  businessEmail: string;
  website: string;
  nmls: string;
  companyNmls: string;
  license: string;
  brokerage: string;
}

// Loan Type Definitions
type FinancingType = 'Conventional' | 'FHA' | 'FHA 203(k) Rehab' | 'DSCR' | 'VA' | 'Hard Money' | 'Cash';

const financingTypes: FinancingType[] = ['Conventional', 'FHA', 'FHA 203(k) Rehab', 'DSCR', 'VA', 'Hard Money', 'Cash'];

// Types
interface FormData {
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  units: number;
  unitDescription: string;
  purchasePrice: number;
  financingType: FinancingType;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  loanTermMonths: number; // For hard money
  closingCostsPercent: number;
  sellerConcessionPercent: number;
  // Rehab fields (203k)
  rehabCost: number;
  afterRepairValue: number;
  contingencyPercent: number;
  rehabTimeline: number;
  holdingCostsMonthly: number;
  // DSCR fields
  originationPoints: number;
  prepaymentPenalty: string;
  // Hard Money fields
  interestOnly: boolean;
  exitStrategy: string;
  estimatedSalePrice: number;
  // Monthly expenses
  monthlyTaxes: number;
  monthlyInsurance: number;
  maintenanceReserve: number;
  propertyMgmt: number;
  grossMonthlyRent: number;
  propertyCondition: string;
  conditionNotes: string;
  highlights: string[];
}

interface CalculatedMetrics {
  downPayment: number;
  baseLoan: number;
  upfrontMIP: number;
  vaFundingFee: number;
  totalLoan: number;
  monthlyMIP: number;
  monthlyPI: number;
  totalMonthlyPayment: number;
  cashRequired: number;
  totalMonthlyExpenses: number;
  totalMonthlyOutflow: number;
  annualRent: number;
  annualExpenses: number;
  noi: number;
  annualDebtService: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  capRate: number;
  capRateOnARV: number;
  cashOnCash: number;
  dscr: number;
  breakEvenOccupancy: number;
  // Rehab specific
  totalRehabWithContingency: number;
  totalProjectCost: number;
  totalInvestmentDuringRehab: number;
  instantEquity: number;
  // Hard Money specific
  totalInterestCost: number;
  grossFlipProfit: number;
  flipROI: number;
  annualizedROI: number;
}

const defaultHighlights = [
  "Strong financing terms available",
  "Two income-producing units",
  "Positive monthly cash flow",
  "Below-market purchase opportunity"
];

const defaultFormData: FormData = {
  address: '',
  city: '',
  state: 'NY',
  zip: '',
  propertyType: 'Duplex',
  units: 2,
  unitDescription: '',
  purchasePrice: 0,
  financingType: 'Conventional',
  downPaymentPercent: 20,
  interestRate: 6.5,
  loanTerm: 30,
  loanTermMonths: 12,
  closingCostsPercent: 3.0,
  sellerConcessionPercent: 6,
  rehabCost: 0,
  afterRepairValue: 0,
  contingencyPercent: 15,
  rehabTimeline: 6,
  holdingCostsMonthly: 0,
  originationPoints: 1.0,
  prepaymentPenalty: 'None',
  interestOnly: true,
  exitStrategy: 'Refinance to Permanent Loan',
  estimatedSalePrice: 0,
  monthlyTaxes: 0,
  monthlyInsurance: 0,
  maintenanceReserve: 0,
  propertyMgmt: 0,
  grossMonthlyRent: 0,
  propertyCondition: 'Recently Rehabbed',
  conditionNotes: '',
  highlights: [...defaultHighlights]
};

const propertyTypes = ['Single Family', 'Duplex', 'Triplex', 'Fourplex', 'Multi-Unit 5+', 'Mixed Use', 'Land', 'Commercial'];
const conditionOptions = ['Recently Rehabbed', 'New Construction', 'Good Condition', 'Needs Updates', 'Needs Major Rehab'];
const loanTermsYears = [30, 25, 20, 15];
const hardMoneyTermsMonths = [6, 9, 12, 18, 24];
const prepaymentOptions = ['None', '1 Year', '2 Years', '3 Years', '5 Years'];
const exitStrategies = ['Refinance to Permanent Loan', 'Sell / Flip', 'Other'];

// Loan type defaults
const loanDefaults: Record<FinancingType, Partial<FormData>> = {
  'Conventional': { downPaymentPercent: 20, interestRate: 6.5, sellerConcessionPercent: 6 },
  'FHA': { downPaymentPercent: 3.5, interestRate: 6.5, sellerConcessionPercent: 6 },
  'FHA 203(k) Rehab': { downPaymentPercent: 3.5, interestRate: 6.5, sellerConcessionPercent: 6, contingencyPercent: 15, rehabTimeline: 6 },
  'DSCR': { downPaymentPercent: 25, interestRate: 7.5, sellerConcessionPercent: 3, originationPoints: 1.0 },
  'VA': { downPaymentPercent: 0, interestRate: 6.25, sellerConcessionPercent: 4 },
  'Hard Money': { downPaymentPercent: 20, interestRate: 11.0, sellerConcessionPercent: 0, loanTermMonths: 12, originationPoints: 2.0, interestOnly: true },
  'Cash': { downPaymentPercent: 100, interestRate: 0, sellerConcessionPercent: 6 }
};

const InvestmentAnalyzer = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [newHighlight, setNewHighlight] = useState('');
  const [rehabView, setRehabView] = useState<'during' | 'after'>('after');
  const [reportModalOpen, setReportModalOpen] = useState(false);


  const isFHA = formData.financingType === 'FHA' || formData.financingType === 'FHA 203(k) Rehab';
  const is203k = formData.financingType === 'FHA 203(k) Rehab';
  const isDSCR = formData.financingType === 'DSCR';
  const isVA = formData.financingType === 'VA';
  const isHardMoney = formData.financingType === 'Hard Money';
  const isCash = formData.financingType === 'Cash';
  const showFlipFields = isHardMoney && formData.exitStrategy === 'Sell / Flip';

  const metrics = useMemo<CalculatedMetrics>(() => {
    const { purchasePrice, downPaymentPercent, interestRate, loanTerm, loanTermMonths, closingCostsPercent, sellerConcessionPercent, grossMonthlyRent, monthlyTaxes, monthlyInsurance, maintenanceReserve, propertyMgmt, rehabCost, afterRepairValue, contingencyPercent, rehabTimeline, holdingCostsMonthly, originationPoints, estimatedSalePrice, interestOnly } = formData;
    
    // Rehab calculations (for 203k)
    const totalRehabWithContingency = is203k ? rehabCost * (1 + contingencyPercent / 100) : 0;
    const totalProjectCost = is203k ? purchasePrice + totalRehabWithContingency : purchasePrice;
    
    // Down Payment calculation base
    const downPaymentBase = is203k ? totalProjectCost : purchasePrice;
    const downPayment = isVA ? 0 : (isCash ? purchasePrice : downPaymentBase * (downPaymentPercent / 100));
    
    // Base loan calculation
    let baseLoan = 0;
    if (isCash) {
      baseLoan = 0;
    } else if (is203k) {
      baseLoan = totalProjectCost - downPayment;
    } else {
      baseLoan = purchasePrice - downPayment;
    }
    
    // FHA MIP calculations
    const upfrontMIP = isFHA ? baseLoan * 0.0175 : 0;
    const monthlyMIP = isFHA ? (baseLoan * 0.0055) / 12 : 0;
    
    // VA Funding Fee
    const vaFundingFee = isVA ? purchasePrice * 0.0215 : 0;
    
    // Total loan amount
    let totalLoan = baseLoan;
    if (isFHA) totalLoan = baseLoan + upfrontMIP;
    if (isVA) totalLoan = purchasePrice + vaFundingFee;
    
    // Monthly payment calculation
    let monthlyPI = 0;
    const effectiveRate = interestRate / 100;
    const monthlyRate = effectiveRate / 12;
    
    if (!isCash && totalLoan > 0 && monthlyRate > 0) {
      if (isHardMoney) {
        if (interestOnly) {
          monthlyPI = totalLoan * effectiveRate / 12;
        } else {
          const numPayments = loanTermMonths;
          monthlyPI = totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        }
      } else {
        const numPayments = loanTerm * 12;
        monthlyPI = totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      }
    }
    
    const totalMonthlyPayment = monthlyPI + monthlyMIP;
    
    // Cash Required at Closing
    const closingCosts = purchasePrice * (closingCostsPercent / 100);
    const sellerConcession = purchasePrice * (sellerConcessionPercent / 100);
    
    let cashRequired = 0;
    if (isCash) {
      cashRequired = purchasePrice + closingCosts - sellerConcession;
    } else if (isDSCR || isHardMoney) {
      const loanForPoints = isHardMoney ? (purchasePrice - downPayment) : baseLoan;
      const points = loanForPoints * (originationPoints / 100);
      cashRequired = downPayment + closingCosts + points - sellerConcession;
    } else if (isVA) {
      cashRequired = closingCosts - sellerConcession;
    } else {
      cashRequired = downPayment + closingCosts - sellerConcession;
    }
    cashRequired = Math.max(0, cashRequired);
    
    // Expenses
    const totalMonthlyExpenses = monthlyTaxes + monthlyInsurance + maintenanceReserve + propertyMgmt;
    const totalMonthlyOutflow = totalMonthlyPayment + totalMonthlyExpenses;
    
    // Annual figures
    const annualRent = grossMonthlyRent * 12;
    const annualExpenses = totalMonthlyExpenses * 12;
    const noi = annualRent - annualExpenses;
    const annualDebtService = isHardMoney 
      ? totalMonthlyPayment * loanTermMonths  // Total interest for hard money
      : totalMonthlyPayment * 12;
    const annualCashFlow = isCash ? noi : noi - (totalMonthlyPayment * 12);
    const monthlyCashFlow = grossMonthlyRent - totalMonthlyOutflow;
    
    // Key Metrics
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
    const capRateOnARV = is203k && afterRepairValue > 0 ? (noi / afterRepairValue) * 100 : 0;
    const cashOnCash = cashRequired > 0 ? (annualCashFlow / cashRequired) * 100 : 0;
    const dscr = isCash ? 0 : (totalMonthlyPayment > 0 ? noi / (totalMonthlyPayment * 12) : 0);
    const breakEvenOccupancy = annualRent > 0 ? ((annualExpenses + (isCash ? 0 : totalMonthlyPayment * 12)) / annualRent) * 100 : 0;
    
    // Rehab specific
    const totalInvestmentDuringRehab = is203k ? cashRequired + (holdingCostsMonthly * rehabTimeline) : 0;
    const instantEquity = is203k && afterRepairValue > 0 ? afterRepairValue - totalLoan : 0;
    
    // Hard Money flip calculations
    const totalInterestCost = isHardMoney ? monthlyPI * loanTermMonths : 0;
    const loanForPoints = purchasePrice - downPayment;
    const pointsCost = (isHardMoney || isDSCR) ? loanForPoints * (originationPoints / 100) : 0;
    const fullProjectCost = purchasePrice + closingCosts + pointsCost + totalInterestCost;
    const grossFlipProfit = showFlipFields && estimatedSalePrice > 0 ? estimatedSalePrice - fullProjectCost : 0;
    const flipROI = showFlipFields && cashRequired > 0 ? (grossFlipProfit / cashRequired) * 100 : 0;
    const annualizedROI = showFlipFields && loanTermMonths > 0 ? flipROI / (loanTermMonths / 12) : 0;
    
    return {
      downPayment,
      baseLoan,
      upfrontMIP,
      vaFundingFee,
      totalLoan,
      monthlyMIP,
      monthlyPI,
      totalMonthlyPayment,
      cashRequired,
      totalMonthlyExpenses,
      totalMonthlyOutflow,
      annualRent,
      annualExpenses,
      noi,
      annualDebtService,
      annualCashFlow,
      monthlyCashFlow,
      capRate,
      capRateOnARV,
      cashOnCash,
      dscr,
      breakEvenOccupancy,
      totalRehabWithContingency,
      totalProjectCost,
      totalInvestmentDuringRehab,
      instantEquity,
      totalInterestCost,
      grossFlipProfit,
      flipROI,
      annualizedROI
    };
  }, [formData, is203k, isDSCR, isVA, isHardMoney, isCash, isFHA, showFlipFields]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinancingChange = (value: FinancingType) => {
    const defaults = loanDefaults[value];
    setFormData(prev => ({
      ...prev,
      financingType: value,
      ...defaults
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setNewHighlight('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // DSCR qualification status
  const getDSCRStatus = () => {
    if (!isDSCR) return null;
    if (metrics.dscr >= 1.25) return { color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', text: 'Strong — exceeds most lender minimums', icon: CheckCircle2 };
    if (metrics.dscr >= 1.0) return { color: 'text-amber-500 bg-amber-500/10 border-amber-500/30', text: 'Marginal — may not qualify with all lenders', icon: AlertTriangle };
    return { color: 'text-red-500 bg-red-500/10 border-red-500/30', text: 'Below 1.0 — does not qualify for DSCR financing', icon: AlertCircle };
  };

  const generatePDF = (branding: BrandingData | null) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0;
    const hasBranding = branding && (branding.displayName || branding.companyName);

    // Header bar - dark navy background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    
    if (hasBranding) {
      // Custom branding - LEFT side shows user's brand
      doc.text(branding.displayName || 'Investment Analysis', margin, 14);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(212, 175, 55); // Gold for title/credentials
      const credentials = [
        branding.title,
        branding.nmls ? `NMLS# ${branding.nmls}` : null,
        branding.license ? `Lic# ${branding.license}` : null
      ].filter(Boolean).join(' | ');
      if (credentials) doc.text(credentials, margin, 20);
      
      doc.setTextColor(255, 255, 255);
      if (branding.companyName) doc.text(branding.companyName, margin, 26);
      
      // RIGHT side - Platform attribution
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text('CAPITAL DISTRICT NEST', pageWidth - margin, 12, { align: 'right' });
      doc.text('KNOW THE NUMBERS BEFORE YOU BUY', pageWidth - margin, 18, { align: 'right' });
      doc.setFontSize(7);
      doc.text('Scott Alvarez | RE/MAX Solutions', pageWidth - margin, 24, { align: 'right' });
    } else {
      // Default branding
      doc.text('CAPITAL DISTRICT NEST', margin, 14);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 180);
      doc.text('THE YIELD INTELLIGENCE PLATFORM', margin, 23);
    }
    
    // Gold accent line
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(2);
    doc.line(0, 32, pageWidth, 32);
    
    y = 45;
    
    // Title and date
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('INVESTMENT EXECUTIVE SUMMARY', margin, y);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth - margin, y, { align: 'right' });
    y += 10;
    
    // Property Address
    doc.setFontSize(13);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    const fullAddress = formData.address ? `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}` : 'Property Address Not Specified';
    doc.text(fullAddress, margin, y);
    y += 6;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${formData.propertyType} • ${formData.units} Unit${formData.units > 1 ? 's' : ''} • ${formData.financingType} Financing`, margin, y);
    y += 12;
    
    // 4 Metric Boxes
    const boxWidth = (pageWidth - margin * 2 - 12) / 4;
    const boxHeight = 26;
    const metricsData = [
      { label: 'Cash on Cash', value: isCash ? 'N/A' : `${metrics.cashOnCash.toFixed(1)}%`, highlight: true },
      { label: 'Cap Rate', value: `${metrics.capRate.toFixed(1)}%`, highlight: false },
      { label: 'DSCR', value: isCash ? 'N/A' : `${metrics.dscr.toFixed(2)}x`, highlight: false },
      { label: 'Break-Even', value: `${metrics.breakEvenOccupancy.toFixed(1)}%`, highlight: false }
    ];
    
    metricsData.forEach((metric, index) => {
      const x = margin + index * (boxWidth + 4);
      
      if (metric.highlight) {
        doc.setFillColor(255, 248, 220);
        doc.setDrawColor(212, 175, 55);
      } else {
        doc.setFillColor(245, 245, 245);
        doc.setDrawColor(220, 220, 220);
      }
      doc.setLineWidth(0.5);
      doc.roundedRect(x, y, boxWidth, boxHeight, 2, 2, 'FD');
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(metric.label, x + boxWidth / 2, y + 9, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(metric.highlight ? 139 : 50, metric.highlight ? 119 : 50, metric.highlight ? 42 : 50);
      doc.text(metric.value, x + boxWidth / 2, y + 20, { align: 'center' });
    });
    
    y += boxHeight + 12;
    
    // Two columns
    const colWidth = (pageWidth - margin * 2 - 10) / 2;
    const leftX = margin;
    const rightX = margin + colWidth + 10;
    let leftY = y;
    let rightY = y;
    
    // Left Column - THE DEAL
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('THE DEAL', leftX, leftY);
    leftY += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    const dealItems: string[] = [
      `Purchase Price: ${formatCurrency(formData.purchasePrice)}`
    ];
    
    if (!isCash) {
      dealItems.push(`Down Payment: ${formatCurrency(metrics.downPayment)} (${formData.downPaymentPercent}%)`);
      dealItems.push(`Loan Amount: ${formatCurrency(metrics.totalLoan)}`);
    }
    
    if (isFHA) {
      dealItems.push(`Upfront MIP: ${formatCurrency(metrics.upfrontMIP)} (1.75%)`);
      dealItems.push(`Monthly MIP: ${formatCurrency(metrics.monthlyMIP)}`);
    }
    
    if (isVA) {
      dealItems.push(`VA Funding Fee: ${formatCurrency(metrics.vaFundingFee)} (2.15%)`);
      dealItems.push('No monthly mortgage insurance');
    }
    
    if (isDSCR || isHardMoney) {
      dealItems.push(`Origination Points: ${formData.originationPoints}%`);
    }
    
    if (is203k) {
      dealItems.push(`Rehab Budget: ${formatCurrency(formData.rehabCost)}`);
      dealItems.push(`Total w/Contingency: ${formatCurrency(metrics.totalRehabWithContingency)}`);
      dealItems.push(`ARV: ${formatCurrency(formData.afterRepairValue)}`);
      dealItems.push(`Instant Equity: ${formatCurrency(metrics.instantEquity)}`);
    }
    
    dealItems.push(`Seller Concession: ${formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)} (${formData.sellerConcessionPercent}%)`);
    dealItems.push(`Cash Required: ${formatCurrency(metrics.cashRequired)}`);
    
    dealItems.forEach(item => {
      doc.text(item, leftX, leftY);
      leftY += 5;
    });
    
    // Right Column - THE RETURNS
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('THE RETURNS', rightX, rightY);
    rightY += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    const returnsItems: string[] = [];
    
    if (isHardMoney && showFlipFields) {
      returnsItems.push(`Sale Price: ${formatCurrency(formData.estimatedSalePrice)}`);
      returnsItems.push(`Total Interest: ${formatCurrency(metrics.totalInterestCost)}`);
      returnsItems.push(`Gross Profit: ${formatCurrency(metrics.grossFlipProfit)}`);
      returnsItems.push(`ROI: ${metrics.flipROI.toFixed(1)}%`);
      returnsItems.push(`Annualized ROI: ${metrics.annualizedROI.toFixed(1)}%`);
    } else {
      returnsItems.push(`Monthly Rent: ${formatCurrency(formData.grossMonthlyRent)}`);
      
      if (isCash) {
        returnsItems.push('Monthly Mortgage: $0 — Cash Purchase');
      } else if (isFHA) {
        returnsItems.push(`Monthly Mortgage (P&I + MIP): ${formatCurrency(metrics.totalMonthlyPayment)}`);
      } else {
        returnsItems.push(`Monthly Mortgage (P&I): ${formatCurrency(metrics.totalMonthlyPayment)}`);
      }
      
      returnsItems.push(`Monthly Expenses: ${formatCurrency(metrics.totalMonthlyExpenses)}`);
      returnsItems.push(`Monthly Cash Flow: ${formatCurrency(metrics.monthlyCashFlow)}`);
      returnsItems.push(`Annual Cash Flow: ${formatCurrency(metrics.annualCashFlow)}`);
      returnsItems.push(`NOI: ${formatCurrency(metrics.noi)}`);
      
      if (is203k) {
        returnsItems.push(`Cap Rate (Purchase): ${metrics.capRate.toFixed(1)}%`);
        returnsItems.push(`Cap Rate (ARV): ${metrics.capRateOnARV.toFixed(1)}%`);
      }
    }
    
    returnsItems.forEach(item => {
      doc.text(item, rightX, rightY);
      rightY += 5;
    });
    
    y = Math.max(leftY, rightY) + 10;
    
    // Highlights
    if (formData.highlights.length > 0) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text('INVESTMENT HIGHLIGHTS', margin, y);
      y += 8;
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      formData.highlights.forEach(highlight => {
        doc.setTextColor(180, 150, 50);
        doc.text('✓', margin, y);
        doc.setTextColor(80, 80, 80);
        doc.text(highlight, margin + 8, y);
        y += 5;
      });
    }
    
    y += 5;
    
    // Condition
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('PROPERTY CONDITION', margin, y);
    y += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Condition: ${formData.propertyCondition}`, margin, y);
    if (formData.conditionNotes) {
      y += 5;
      doc.text(`Notes: ${formData.conditionNotes}`, margin, y);
    }
    
    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1);
    doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);
    
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text('This analysis is for informational purposes only and does not constitute investment advice.', margin, footerY);
    
    if (hasBranding && (branding.businessPhone || branding.businessEmail)) {
      // Custom footer with user contact + powered by
      const contactInfo = [branding.displayName, branding.businessPhone, branding.businessEmail].filter(Boolean).join(' | ');
      doc.text(`Ready to discuss? Contact: ${contactInfo}`, margin, footerY + 4);
      doc.setFontSize(6);
      doc.text('Powered by AnalyzeAnyDeal.com | Capital District Nest', pageWidth - margin, footerY + 4, { align: 'right' });
    } else {
      // Default footer
      doc.text(`Capital District Nest • The Yield Intelligence Platform • capitaldistrictnest.com`, margin, footerY + 4);
      doc.text(`Report generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, footerY + 4, { align: 'right' });
    }
    
    const addressSlug = formData.address.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') || 'Property';
    const ownerSlug = hasBranding && branding.displayName ? branding.displayName.replace(/[^a-zA-Z0-9]/g, '_') : 'Nest';
    doc.save(`${ownerSlug}_Investment_Report_${addressSlug}.pdf`);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Investment Property Analyzer | 7 Loan Types | Capital District Nest</title>
        <meta name="description" content="Analyze any investment property with FHA, conventional, 203(k) rehab, DSCR, VA, hard money, or cash scenarios. Calculate cap rate, cash flow, DSCR, and generate professional PDF reports instantly." />
        <link rel="canonical" href="https://capitaldistrictnest.com/analyzer" />
        <meta property="og:title" content="Investment Property Analyzer | 7 Loan Types | Capital District Nest" />
        <meta property="og:description" content="Analyze any investment property with FHA, conventional, 203(k) rehab, DSCR, VA, hard money, or cash scenarios. Calculate cap rate, cash flow, DSCR, and generate professional PDF reports instantly." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <TrendingUp className="w-3 h-3 mr-1" />
              Yield Intelligence
            </Badge>
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3">
              Investment Property <span className="text-primary font-normal">Analyzer</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Analyze any deal. Any loan type. Institutional-quality reports in seconds.
            </p>
          </div>

          {/* Step-by-Step Form */}
          <div className="space-y-8">
            {/* STEP 1: The Property */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">① The Property</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="123 Main Street"
                    className="bg-background/50"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city} onChange={(e) => updateField('city', e.target.value)} placeholder="Albany" className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={formData.state} onChange={(e) => updateField('state', e.target.value)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP</Label>
                    <Input id="zip" value={formData.zip} onChange={(e) => updateField('zip', e.target.value)} placeholder="12203" className="bg-background/50" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(v) => updateField('propertyType', v)}>
                      <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="units">Units</Label>
                    <Input id="units" type="number" value={formData.units} onChange={(e) => updateField('units', parseInt(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="unitDesc">Unit Description</Label>
                    <Input id="unitDesc" value={formData.unitDescription} onChange={(e) => updateField('unitDescription', e.target.value)} placeholder="Each unit: 3BR/1.5BA" className="bg-background/50" />
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 2: Purchase & Financing */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">② Purchase & Financing</h2>
              </div>
              
              <div className="space-y-4">
                {/* Purchase Price */}
                <div>
                  <Label htmlFor="purchasePrice" className="text-base font-medium">Purchase Price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground">$</span>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={formData.purchasePrice || ''}
                      onChange={(e) => updateField('purchasePrice', parseFloat(e.target.value) || 0)}
                      className="bg-background/50 pl-10 text-2xl h-14 font-semibold"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                {/* Financing Type */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-primary" />
                    Financing Type
                  </Label>
                  <Select value={formData.financingType} onValueChange={(v) => handleFinancingChange(v as FinancingType)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {financingTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'Cash' ? 'Cash (No Financing)' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional Fields with transitions */}
                <div className={cn(
                  "space-y-4 transition-all duration-300 ease-in-out",
                  isCash ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-[2000px]"
                )}>
                  <div className="grid grid-cols-4 gap-3">
                    {/* Down Payment - hidden for VA and Cash */}
                    <div className={cn(
                      "transition-all duration-200",
                      isVA ? "opacity-50" : ""
                    )}>
                      <Label htmlFor="downPercent">Down Payment %</Label>
                      <Input 
                        id="downPercent" 
                        type="number" 
                        step="0.5" 
                        value={isVA ? 0 : formData.downPaymentPercent} 
                        onChange={(e) => updateField('downPaymentPercent', parseFloat(e.target.value) || 0)} 
                        className="bg-background/50"
                        disabled={isVA}
                        min={isFHA ? 3.5 : isDSCR ? 20 : 0}
                      />
                      {isVA && <p className="text-xs text-muted-foreground mt-1">VA requires $0 down</p>}
                      {isFHA && <p className="text-xs text-muted-foreground mt-1">Min 3.5%</p>}
                      {isDSCR && <p className="text-xs text-muted-foreground mt-1">Min 20%</p>}
                    </div>
                    <div>
                      <Label htmlFor="rate">Interest Rate %</Label>
                      <Input 
                        id="rate" 
                        type="number" 
                        step={isHardMoney ? 0.25 : 0.125} 
                        value={formData.interestRate} 
                        onChange={(e) => updateField('interestRate', parseFloat(e.target.value) || 0)} 
                        className="bg-background/50" 
                      />
                    </div>
                    <div>
                      <Label>Loan Term</Label>
                      {isHardMoney ? (
                        <Select value={formData.loanTermMonths.toString()} onValueChange={(v) => updateField('loanTermMonths', parseInt(v))}>
                          <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {hardMoneyTermsMonths.map(term => <SelectItem key={term} value={term.toString()}>{term} Months</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Select value={formData.loanTerm.toString()} onValueChange={(v) => updateField('loanTerm', parseInt(v))}>
                          <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {loanTermsYears.map(term => <SelectItem key={term} value={term.toString()}>{term} Years</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="closing">Closing Costs %</Label>
                      <Input id="closing" type="number" step="0.5" value={formData.closingCostsPercent} onChange={(e) => updateField('closingCostsPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="concession">Seller Concession %</Label>
                      <Input id="concession" type="number" step="0.5" value={formData.sellerConcessionPercent} onChange={(e) => updateField('sellerConcessionPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                    </div>
                    
                    {/* Origination Points - DSCR and Hard Money only */}
                    <div className={cn(
                      "transition-all duration-300",
                      (isDSCR || isHardMoney) ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}>
                      <Label htmlFor="origPoints">Origination Points %</Label>
                      <Input 
                        id="origPoints" 
                        type="number" 
                        step="0.5" 
                        value={formData.originationPoints} 
                        onChange={(e) => updateField('originationPoints', parseFloat(e.target.value) || 0)} 
                        className="bg-background/50" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Added to closing costs</p>
                    </div>
                  </div>

                  {/* DSCR-specific: Prepayment Penalty */}
                  <div className={cn(
                    "transition-all duration-300",
                    isDSCR ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                  )}>
                    <Label>Prepayment Penalty</Label>
                    <Select value={formData.prepaymentPenalty} onValueChange={(v) => updateField('prepaymentPenalty', v)}>
                      <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {prepaymentOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Penalty period if you refinance or sell early</p>
                  </div>

                  {/* Hard Money-specific fields */}
                  <div className={cn(
                    "space-y-4 transition-all duration-300",
                    isHardMoney ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"
                  )}>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor="interestOnly" className="text-sm font-medium">Interest Only</Label>
                        <p className="text-xs text-muted-foreground">Most bridge loans are interest-only</p>
                      </div>
                      <Switch 
                        id="interestOnly" 
                        checked={formData.interestOnly} 
                        onCheckedChange={(v) => updateField('interestOnly', v)} 
                      />
                    </div>
                    
                    <div>
                      <Label>Exit Strategy</Label>
                      <Select value={formData.exitStrategy} onValueChange={(v) => updateField('exitStrategy', v)}>
                        <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {exitStrategies.map(strat => <SelectItem key={strat} value={strat}>{strat}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sale Price for Flip */}
                    <div className={cn(
                      "transition-all duration-300",
                      showFlipFields ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                    )}>
                      <Label htmlFor="salePrice">Estimated Sale Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="salePrice" 
                          type="number" 
                          value={formData.estimatedSalePrice || ''} 
                          onChange={(e) => updateField('estimatedSalePrice', parseFloat(e.target.value) || 0)} 
                          className="bg-background/50 pl-7" 
                          placeholder="0" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash-specific: just show closing/concession */}
                <div className={cn(
                  "grid grid-cols-2 gap-3 transition-all duration-300",
                  isCash ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
                )}>
                  <div>
                    <Label htmlFor="cashClosing">Closing Costs %</Label>
                    <Input id="cashClosing" type="number" step="0.5" value={formData.closingCostsPercent} onChange={(e) => updateField('closingCostsPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="cashConcession">Seller Concession %</Label>
                    <Input id="cashConcession" type="number" step="0.5" value={formData.sellerConcessionPercent} onChange={(e) => updateField('sellerConcessionPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                </div>
                
                {/* FHA/VA Auto-displays */}
                <div className={cn(
                  "grid gap-4 pt-4 border-t border-border/30",
                  isCash ? "hidden" : "",
                  (isFHA || isVA) ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"
                )}>
                  {isFHA && (
                    <>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Upfront MIP</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(metrics.upfrontMIP)}</p>
                        <p className="text-xs text-muted-foreground">1.75% financed into loan</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Monthly MIP</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(metrics.monthlyMIP)}</p>
                        <p className="text-xs text-muted-foreground">0.55%/yr on base loan</p>
                      </div>
                    </>
                  )}
                  
                  {isVA && (
                    <>
                      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                        <p className="text-xs text-accent uppercase tracking-wide mb-1">VA Funding Fee</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(metrics.vaFundingFee)}</p>
                        <p className="text-xs text-muted-foreground">2.15% financed into loan</p>
                      </div>
                      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                        <p className="text-xs text-accent uppercase tracking-wide mb-1">Monthly PMI</p>
                        <p className="text-lg font-semibold text-foreground">$0</p>
                        <p className="text-xs text-muted-foreground">No MI with VA loans</p>
                      </div>
                    </>
                  )}
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {isCash ? 'Cash Required' : 'Loan Amount'}
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {isCash ? formatCurrency(metrics.cashRequired) : formatCurrency(metrics.totalLoan)}
                    </p>
                    {isFHA && <p className="text-xs text-muted-foreground mt-1">Includes upfront MIP</p>}
                    {isVA && <p className="text-xs text-muted-foreground mt-1">Includes VA funding fee</p>}
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Cash Required at Closing</p>
                    <p className="text-xl font-semibold text-foreground">{formatCurrency(metrics.cashRequired)}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 203(k) REHAB SECTION */}
            <section className={cn(
              "bg-card/50 border-l-4 border-l-primary border border-border/50 rounded-2xl p-6 transition-all duration-300",
              is203k ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden py-0 px-0 border-0"
            )}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Rehab Budget</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rehabCost">Estimated Rehab Cost</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="rehabCost" type="number" value={formData.rehabCost || ''} onChange={(e) => updateField('rehabCost', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="arv">After-Repair Value (ARV)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="arv" type="number" value={formData.afterRepairValue || ''} onChange={(e) => updateField('afterRepairValue', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contingency">Contingency %</Label>
                    <Input id="contingency" type="number" value={formData.contingencyPercent} onChange={(e) => updateField('contingencyPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="rehabTime">Timeline (months)</Label>
                    <Input id="rehabTime" type="number" value={formData.rehabTimeline} onChange={(e) => updateField('rehabTimeline', parseInt(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="holding">Monthly Holding Costs</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="holding" type="number" value={formData.holdingCostsMonthly || ''} onChange={(e) => updateField('holdingCostsMonthly', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Mortgage + insurance + utilities while vacant</p>
                  </div>
                </div>
                
                {/* Calculated Rehab Displays */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <p className="text-xs text-primary uppercase tracking-wide mb-1">Total w/ Contingency</p>
                    <p className="text-lg font-semibold">{formatCurrency(metrics.totalRehabWithContingency)}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Loan Amount</p>
                    <p className="text-lg font-semibold">{formatCurrency(metrics.totalLoan)}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Investment During Rehab</p>
                    <p className="text-lg font-semibold">{formatCurrency(metrics.totalInvestmentDuringRehab)}</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-xs text-emerald-600 uppercase tracking-wide mb-1">Instant Equity</p>
                    <p className="text-lg font-semibold text-emerald-600">{formatCurrency(metrics.instantEquity)}</p>
                  </div>
                </div>

                {/* Rehab View Toggle */}
                <div className="flex items-center gap-2 pt-4">
                  <span className="text-sm text-muted-foreground">View:</span>
                  <button 
                    onClick={() => setRehabView('during')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      rehabView === 'during' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    During Rehab
                  </button>
                  <button 
                    onClick={() => setRehabView('after')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      rehabView === 'after' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    After Stabilization
                  </button>
                </div>
              </div>
            </section>

            {/* STEP 3: Monthly Costs */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">③ Monthly Costs</h2>
              </div>
              
              <div className="space-y-4">
                {/* Mortgage Payment Display */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                  <p className="text-sm text-primary uppercase tracking-wide font-medium mb-1">Monthly Mortgage Payment</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isCash ? '$0' : formatCurrency(metrics.totalMonthlyPayment)}
                  </p>
                  {isCash ? (
                    <p className="text-sm text-muted-foreground mt-1">Cash Purchase — No Financing</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {isFHA ? 'P&I + MIP' : isHardMoney && formData.interestOnly ? 'Interest Only' : 'P&I'} • {formData.interestRate}% / {isHardMoney ? `${formData.loanTermMonths} mo` : `${formData.loanTerm} yr`} • {formatCurrency(metrics.totalLoan)} loan
                    </p>
                  )}
                </div>
                
                {/* Expense Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taxes">Property Taxes (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="taxes" type="number" value={formData.monthlyTaxes || ''} onChange={(e) => updateField('monthlyTaxes', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="insurance">Insurance (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="insurance" type="number" value={formData.monthlyInsurance || ''} onChange={(e) => updateField('monthlyInsurance', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="maintenance">Maintenance Reserve</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="maintenance" type="number" value={formData.maintenanceReserve || ''} onChange={(e) => updateField('maintenanceReserve', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mgmt">Property Mgmt / Other</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="mgmt" type="number" value={formData.propertyMgmt || ''} onChange={(e) => updateField('propertyMgmt', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                  </div>
                </div>
                
                {/* Expense Totals */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Monthly Expenses</p>
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(metrics.totalMonthlyExpenses)}</p>
                    <p className="text-xs text-muted-foreground">Excludes mortgage</p>
                  </div>
                  <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Monthly Outflow</p>
                    <p className="text-xl font-bold text-foreground">{formatCurrency(metrics.totalMonthlyOutflow)}</p>
                    <p className="text-xs text-muted-foreground">Mortgage + Expenses</p>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 4: Rental Income */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">④ Rental Income</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rent" className="text-base font-medium">Gross Monthly Rent — All Units</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground">$</span>
                    <Input
                      id="rent"
                      type="number"
                      value={formData.grossMonthlyRent || ''}
                      onChange={(e) => updateField('grossMonthlyRent', parseFloat(e.target.value) || 0)}
                      className="bg-background/50 pl-10 text-2xl h-14 font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total rent from all {formData.units} unit{formData.units > 1 ? 's' : ''}</p>
                </div>
                
                {/* Cash Flow Display */}
                <div className={`rounded-xl p-6 text-center ${metrics.monthlyCashFlow >= 0 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <p className="text-sm uppercase tracking-wide mb-2 font-medium" style={{ color: metrics.monthlyCashFlow >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                    {is203k && rehabView === 'during' ? 'Monthly Outflow During Rehab' : 'Monthly Cash Flow'}
                  </p>
                  <p className="text-4xl font-bold" style={{ color: metrics.monthlyCashFlow >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                    {is203k && rehabView === 'during' 
                      ? formatCurrency(formData.holdingCostsMonthly) 
                      : formatCurrency(metrics.monthlyCashFlow)
                    }
                  </p>
                  <p className="text-lg mt-2" style={{ color: metrics.monthlyCashFlow >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                    {is203k && rehabView === 'during' 
                      ? `Total During Rehab: ${formatCurrency(formData.holdingCostsMonthly * formData.rehabTimeline)}`
                      : `Annual: ${formatCurrency(metrics.annualCashFlow)}`
                    }
                  </p>
                </div>
              </div>
            </section>

            {/* STEP 5: Deal Highlights */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">⑤ Deal Highlights</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Property Condition</Label>
                    <Select value={formData.propertyCondition} onValueChange={(v) => updateField('propertyCondition', v)}>
                      <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map(cond => <SelectItem key={cond} value={cond}>{cond}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Condition Notes</Label>
                    <Input id="notes" value={formData.conditionNotes} onChange={(e) => updateField('conditionNotes', e.target.value)} placeholder="Recent updates, renovations..." className="bg-background/50" />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Investment Highlights</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="Add highlight..."
                      className="bg-background/50 flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && addHighlight()}
                    />
                    <Button size="icon" variant="outline" onClick={addHighlight}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 bg-background/30 rounded-md px-3 py-2 text-sm">
                        <span className="text-primary">✓</span>
                        <span className="flex-1 text-foreground/90">{highlight}</span>
                        <button onClick={() => removeHighlight(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 6: Investment Analysis */}
            <section className="bg-card/50 border-2 border-primary/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">⑥ Investment Analysis</h2>
              </div>
              
              {/* DSCR Qualification Badge */}
              {isDSCR && metrics.dscr > 0 && (() => {
                const status = getDSCRStatus();
                const StatusIcon = status?.icon;
                return (
                  <div className={cn(
                    "rounded-lg p-4 mb-6 border flex items-center gap-3",
                    status?.color
                  )}>
                    {StatusIcon && <StatusIcon className="w-5 h-5" />}
                    <div>
                      <p className="font-semibold">DSCR: {metrics.dscr.toFixed(2)}x</p>
                      <p className="text-sm">{status?.text}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Hard Money Flip Results */}
              {showFlipFields && formData.estimatedSalePrice > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-6">
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">Flip Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-semibold">{formatCurrency(metrics.totalInterestCost)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gross Profit</p>
                      <p className="text-lg font-semibold text-emerald-600">{formatCurrency(metrics.grossFlipProfit)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <p className="text-lg font-semibold text-emerald-600">{metrics.flipROI.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Annualized ROI</p>
                      <p className="text-lg font-semibold text-emerald-600">{metrics.annualizedROI.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1">Cash on Cash</p>
                  <p className="text-2xl font-bold text-primary">
                    {isCash ? 'N/A' : metrics.cashOnCash > 0 ? `${metrics.cashOnCash.toFixed(1)}%` : '—'}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {is203k ? 'Cap Rate (Purchase)' : 'Cap Rate'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{metrics.capRate > 0 ? `${metrics.capRate.toFixed(1)}%` : '—'}</p>
                </div>
                {is203k ? (
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Cap Rate (ARV)</p>
                    <p className="text-2xl font-bold text-foreground">{metrics.capRateOnARV > 0 ? `${metrics.capRateOnARV.toFixed(1)}%` : '—'}</p>
                  </div>
                ) : (
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">DSCR</p>
                    <p className="text-2xl font-bold text-foreground">
                      {isCash ? 'N/A' : metrics.dscr > 0 ? `${metrics.dscr.toFixed(2)}x` : '—'}
                    </p>
                  </div>
                )}
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Break-Even</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.breakEvenOccupancy > 0 ? `${metrics.breakEvenOccupancy.toFixed(1)}%` : '—'}</p>
                </div>
              </div>
              
              {/* Summary Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">The Deal</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Purchase Price</span><span className="font-medium">{formatCurrency(formData.purchasePrice)}</span></div>
                    {!isCash && (
                      <>
                        <div className="flex justify-between"><span className="text-muted-foreground">Down Payment</span><span className="font-medium">{formatCurrency(metrics.downPayment)} ({formData.downPaymentPercent}%)</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount</span><span className="font-medium">{formatCurrency(metrics.totalLoan)}</span></div>
                      </>
                    )}
                    <div className="flex justify-between"><span className="text-muted-foreground">Seller Concession</span><span className="font-medium">{formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)} ({formData.sellerConcessionPercent}%)</span></div>
                    <div className="flex justify-between border-t border-border/30 pt-2"><span className="text-foreground font-medium">Cash Required</span><span className="font-bold">{formatCurrency(metrics.cashRequired)}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">The Returns</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Monthly Rent</span><span className="font-medium">{formatCurrency(formData.grossMonthlyRent)}</span></div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Mortgage</span>
                      <span className="font-medium">{isCash ? '$0' : formatCurrency(metrics.totalMonthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Monthly Expenses</span><span className="font-medium">{formatCurrency(metrics.totalMonthlyExpenses)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Monthly Cash Flow</span><span className={`font-medium ${metrics.monthlyCashFlow >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{formatCurrency(metrics.monthlyCashFlow)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Annual Cash Flow</span><span className={`font-medium ${metrics.annualCashFlow >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{formatCurrency(metrics.annualCashFlow)}</span></div>
                    <div className="flex justify-between border-t border-border/30 pt-2"><span className="text-foreground font-medium">NOI</span><span className="font-bold">{formatCurrency(metrics.noi)}</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button onClick={() => setReportModalOpen(true)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                <FileText className="w-5 h-5 mr-2" />
                Generate PDF Report
              </Button>
              <Button onClick={resetForm} size="lg" variant="outline" className="px-8">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Branded Report Modal */}
      <BrandedReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onGeneratePdf={generatePDF}
        analysisData={{
          propertyAddress: formData.address,
          propertyCity: formData.city,
          propertyState: formData.state,
          askingPrice: formData.purchasePrice,
          loanType: formData.financingType,
          capRate: metrics.capRate,
          monthlyCashFlow: metrics.monthlyCashFlow,
          noi: metrics.noi,
          cashToClose: metrics.cashRequired,
        }}
      />
    </MainLayout>
  );
};

export default InvestmentAnalyzer;
