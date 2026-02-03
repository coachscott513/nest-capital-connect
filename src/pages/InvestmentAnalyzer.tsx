import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FileText, RotateCcw, Home, DollarSign, Calculator, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';
import jsPDF from 'jspdf';

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
  financingType: string;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  closingCostsPercent: number;
  sellerConcessionPercent: number;
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
  cashOnCash: number;
  dscr: number;
  breakEvenOccupancy: number;
}

const defaultHighlights = [
  "FHA 3.5% down payment",
  "6% seller concession covers closing costs",
  "Two income-producing units",
  "Positive monthly cash flow"
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
  financingType: 'FHA 3.5% Down',
  downPaymentPercent: 3.5,
  interestRate: 6.75,
  loanTerm: 30,
  closingCostsPercent: 3.0,
  sellerConcessionPercent: 6,
  monthlyTaxes: 0,
  monthlyInsurance: 0,
  maintenanceReserve: 0,
  propertyMgmt: 0,
  grossMonthlyRent: 0,
  propertyCondition: 'Recently Rehabbed',
  conditionNotes: '',
  highlights: [...defaultHighlights]
};

const financingOptions = [
  { label: 'FHA 3.5% Down', downPercent: 3.5 },
  { label: 'Conventional 5%', downPercent: 5 },
  { label: 'Conventional 10%', downPercent: 10 },
  { label: 'Conventional 15%', downPercent: 15 },
  { label: 'Conventional 20%', downPercent: 20 },
  { label: 'Conventional 25%', downPercent: 25 },
  { label: 'Cash/No Financing', downPercent: 100 },
];

const propertyTypes = ['Single Family', 'Duplex', 'Triplex', 'Fourplex', 'Multi-Unit 5+', 'Mixed Use', 'Land', 'Commercial'];
const conditionOptions = ['Recently Rehabbed', 'New Construction', 'Good Condition', 'Needs Updates', 'Needs Major Rehab'];
const loanTerms = [30, 25, 20, 15];

const InvestmentAnalyzer = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [newHighlight, setNewHighlight] = useState('');

  const metrics = useMemo<CalculatedMetrics>(() => {
    const { purchasePrice, downPaymentPercent, interestRate, loanTerm, closingCostsPercent, sellerConcessionPercent, grossMonthlyRent, financingType, monthlyTaxes, monthlyInsurance, maintenanceReserve, propertyMgmt } = formData;
    
    const isFHA = financingType.includes('FHA');
    const isCash = financingType === 'Cash/No Financing';
    
    // Down Payment and Loan
    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const baseLoan = purchasePrice - downPayment;
    
    // FHA MIP calculations
    const upfrontMIP = isFHA ? baseLoan * 0.0175 : 0;
    const totalLoan = baseLoan + upfrontMIP;
    const monthlyMIP = isFHA ? (baseLoan * 0.0055) / 12 : 0;
    
    // Monthly P&I (standard amortization)
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    let monthlyPI = 0;
    
    if (!isCash && totalLoan > 0 && monthlyRate > 0) {
      monthlyPI = totalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const totalMonthlyPayment = monthlyPI + monthlyMIP;
    
    // Cash Required at Closing
    const closingCosts = purchasePrice * (closingCostsPercent / 100);
    const sellerConcession = purchasePrice * (sellerConcessionPercent / 100);
    const cashRequired = Math.max(0, downPayment + closingCosts - sellerConcession);
    
    // Expenses
    const totalMonthlyExpenses = monthlyTaxes + monthlyInsurance + maintenanceReserve + propertyMgmt;
    const totalMonthlyOutflow = totalMonthlyPayment + totalMonthlyExpenses;
    
    // Annual figures
    const annualRent = grossMonthlyRent * 12;
    const annualExpenses = totalMonthlyExpenses * 12;
    const noi = annualRent - annualExpenses;
    const annualDebtService = totalMonthlyPayment * 12;
    const annualCashFlow = noi - annualDebtService;
    const monthlyCashFlow = grossMonthlyRent - totalMonthlyOutflow;
    
    // Key Metrics
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
    const cashOnCash = cashRequired > 0 ? (annualCashFlow / cashRequired) * 100 : 0;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
    const breakEvenOccupancy = annualRent > 0 ? ((annualExpenses + annualDebtService) / annualRent) * 100 : 0;
    
    return {
      downPayment,
      baseLoan,
      upfrontMIP,
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
      cashOnCash,
      dscr,
      breakEvenOccupancy
    };
  }, [formData]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinancingChange = (value: string) => {
    const option = financingOptions.find(o => o.label === value);
    setFormData(prev => ({
      ...prev,
      financingType: value,
      downPaymentPercent: option?.downPercent || prev.downPaymentPercent
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

  const isFHA = formData.financingType.includes('FHA');
  const isCash = formData.financingType === 'Cash/No Financing';

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 0;

    // Header bar - dark navy background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CAPITAL DISTRICT NEST', margin, 14);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text('THE YIELD INTELLIGENCE PLATFORM', margin, 23);
    
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
    doc.text(`${formData.propertyType} • ${formData.units} Unit${formData.units > 1 ? 's' : ''}`, margin, y);
    y += 12;
    
    // 4 Metric Boxes
    const boxWidth = (pageWidth - margin * 2 - 12) / 4;
    const boxHeight = 26;
    const metricsData = [
      { label: 'Cash on Cash', value: `${metrics.cashOnCash.toFixed(1)}%`, highlight: true },
      { label: 'Cap Rate', value: `${metrics.capRate.toFixed(1)}%`, highlight: false },
      { label: 'DSCR', value: `${metrics.dscr.toFixed(2)}x`, highlight: false },
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
    
    // Left Column - PROPERTY SNAPSHOT
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('THE DEAL', leftX, leftY);
    leftY += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const dealItems = [
      `Purchase Price: ${formatCurrency(formData.purchasePrice)}`,
      `Down Payment: ${formatCurrency(metrics.downPayment)} (${formData.downPaymentPercent}%)`,
      `Loan Amount: ${formatCurrency(metrics.totalLoan)}`,
      `Seller Concession: ${formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)} (${formData.sellerConcessionPercent}%)`,
      `Cash Required: ${formatCurrency(metrics.cashRequired)}`
    ];
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
    const returnsItems = [
      `Monthly Rent: ${formatCurrency(formData.grossMonthlyRent)}`,
      `Monthly Mortgage${isFHA ? ' (P&I + MIP)' : ''}: ${formatCurrency(metrics.totalMonthlyPayment)}`,
      `Monthly Expenses: ${formatCurrency(metrics.totalMonthlyExpenses)}`,
      `Monthly Cash Flow: ${formatCurrency(metrics.monthlyCashFlow)}`,
      `Annual Cash Flow: ${formatCurrency(metrics.annualCashFlow)}`,
      `NOI: ${formatCurrency(metrics.noi)}`
    ];
    returnsItems.forEach(item => {
      doc.text(item, rightX, rightY);
      rightY += 5;
    });
    
    y = Math.max(leftY, rightY) + 10;
    
    // MONTHLY NUMBERS
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('MONTHLY NUMBERS', margin, y);
    y += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const monthlyItems = [
      `Gross Rent: ${formatCurrency(formData.grossMonthlyRent)}`,
      `Mortgage${isFHA ? ' (P&I + MIP)' : ' (P&I)'}: ${formatCurrency(metrics.totalMonthlyPayment)}`,
      `Operating Expenses: ${formatCurrency(metrics.totalMonthlyExpenses)}`,
      `Total Outflow: ${formatCurrency(metrics.totalMonthlyOutflow)}`
    ];
    monthlyItems.forEach(item => {
      doc.text(item, margin, y);
      y += 5;
    });
    
    y += 5;
    
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
    doc.text(`Capital District Nest • The Yield Intelligence Platform • capitaldistrictnest.com`, margin, footerY + 4);
    doc.text(`Report generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, footerY + 4, { align: 'right' });
    
    const addressSlug = formData.address.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') || 'Property';
    doc.save(`Nest_Investment_Report_${addressSlug}.pdf`);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Investment Property Analyzer | Capital District Nest</title>
        <meta name="description" content="Free investment property analysis tool for New York real estate investors. Calculate cap rate, cash-on-cash return, DSCR, cash flow, and generate professional PDF reports instantly." />
        <link rel="canonical" href="https://capitaldistrictnest.com/analyzer" />
        <meta property="og:title" content="Investment Property Analyzer | Capital District Nest" />
        <meta property="og:description" content="Free investment property analysis tool for New York real estate investors. Calculate cap rate, cash-on-cash return, DSCR, cash flow, and generate professional PDF reports instantly." />
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
            <p className="text-muted-foreground max-w-xl mx-auto">
              Walk through the deal step-by-step. Live calculations update as you type.
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
                {/* Purchase Price - Large and prominent */}
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
                
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label>Financing Type</Label>
                    <Select value={formData.financingType} onValueChange={handleFinancingChange}>
                      <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {financingOptions.map(opt => <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="downPercent">Down Payment %</Label>
                    <Input id="downPercent" type="number" step="0.5" value={formData.downPaymentPercent} onChange={(e) => updateField('downPaymentPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="rate">Interest Rate %</Label>
                    <Input id="rate" type="number" step="0.125" value={formData.interestRate} onChange={(e) => updateField('interestRate', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label>Loan Term</Label>
                    <Select value={formData.loanTerm.toString()} onValueChange={(v) => updateField('loanTerm', parseInt(v))}>
                      <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {loanTerms.map(term => <SelectItem key={term} value={term.toString()}>{term} Years</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="closing">Closing Costs %</Label>
                    <Input id="closing" type="number" step="0.5" value={formData.closingCostsPercent} onChange={(e) => updateField('closingCostsPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                  <div>
                    <Label htmlFor="concession">Seller Concession %</Label>
                    <Input id="concession" type="number" step="0.5" value={formData.sellerConcessionPercent} onChange={(e) => updateField('sellerConcessionPercent', parseFloat(e.target.value) || 0)} className="bg-background/50" />
                  </div>
                </div>
                
                {/* Calculated Read-Only Displays */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Loan Amount</p>
                    <p className="text-xl font-semibold text-foreground">{formatCurrency(metrics.totalLoan)}</p>
                    {isFHA && <p className="text-xs text-muted-foreground mt-1">Includes 1.75% upfront MIP</p>}
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Cash Required at Closing</p>
                    <p className="text-xl font-semibold text-foreground">{formatCurrency(metrics.cashRequired)}</p>
                  </div>
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
                {/* Mortgage Payment - Calculated Display */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                  <p className="text-sm text-primary uppercase tracking-wide font-medium mb-1">Monthly Mortgage Payment</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isCash ? '$0' : formatCurrency(metrics.totalMonthlyPayment)}
                  </p>
                  {isCash ? (
                    <p className="text-sm text-muted-foreground mt-1">No Financing</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {isFHA ? 'P&I + MIP' : 'P&I'} • {formData.interestRate}% / {formData.loanTerm} yr • {formatCurrency(metrics.totalLoan)} loan
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
                    <p className="text-xs text-muted-foreground mt-1">Annual tax bill ÷ 12</p>
                  </div>
                  <div>
                    <Label htmlFor="insurance">Insurance (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="insurance" type="number" value={formData.monthlyInsurance || ''} onChange={(e) => updateField('monthlyInsurance', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Annual premium ÷ 12</p>
                  </div>
                  <div>
                    <Label htmlFor="maintenance">Maintenance Reserve</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="maintenance" type="number" value={formData.maintenanceReserve || ''} onChange={(e) => updateField('maintenanceReserve', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Typical: 5-10% of rent</p>
                  </div>
                  <div>
                    <Label htmlFor="mgmt">Property Mgmt / Other</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="mgmt" type="number" value={formData.propertyMgmt || ''} onChange={(e) => updateField('propertyMgmt', parseFloat(e.target.value) || 0)} className="bg-background/50 pl-7" placeholder="0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Typical: 8-10% of rent if managed</p>
                  </div>
                </div>
                
                {/* Expense Totals */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Monthly Expenses</p>
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(metrics.totalMonthlyExpenses)}</p>
                    <p className="text-xs text-muted-foreground">Excludes mortgage</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
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
                    Monthly Cash Flow
                  </p>
                  <p className="text-4xl font-bold" style={{ color: metrics.monthlyCashFlow >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                    {formatCurrency(metrics.monthlyCashFlow)}
                  </p>
                  <p className="text-lg mt-2" style={{ color: metrics.monthlyCashFlow >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)' }}>
                    Annual: {formatCurrency(metrics.annualCashFlow)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    {metrics.monthlyCashFlow >= 0 
                      ? `You keep ${formatCurrency(metrics.monthlyCashFlow)} per month after all costs`
                      : `You're short ${formatCurrency(Math.abs(metrics.monthlyCashFlow))} per month`
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
              
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1">Cash on Cash</p>
                  <p className="text-2xl font-bold text-primary">{metrics.cashOnCash > 0 ? `${metrics.cashOnCash.toFixed(1)}%` : '—'}</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Cap Rate</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.capRate > 0 ? `${metrics.capRate.toFixed(1)}%` : '—'}</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">DSCR</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.dscr > 0 ? `${metrics.dscr.toFixed(2)}x` : '—'}</p>
                </div>
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
                    <div className="flex justify-between"><span className="text-muted-foreground">Down Payment</span><span className="font-medium">{formatCurrency(metrics.downPayment)} ({formData.downPaymentPercent}%)</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount</span><span className="font-medium">{formatCurrency(metrics.totalLoan)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Seller Concession</span><span className="font-medium">{formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)} ({formData.sellerConcessionPercent}%)</span></div>
                    <div className="flex justify-between border-t border-border/30 pt-2"><span className="text-foreground font-medium">Cash Required</span><span className="font-bold">{formatCurrency(metrics.cashRequired)}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">The Returns</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Monthly Rent</span><span className="font-medium">{formatCurrency(formData.grossMonthlyRent)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Monthly Mortgage</span><span className="font-medium">{formatCurrency(metrics.totalMonthlyPayment)}</span></div>
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
              <Button onClick={generatePDF} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
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
    </MainLayout>
  );
};

export default InvestmentAnalyzer;
