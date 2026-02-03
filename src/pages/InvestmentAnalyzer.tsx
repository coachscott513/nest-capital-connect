import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FileText, RotateCcw, TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';
import jsPDF from 'jspdf';

// Types
interface FormData {
  // Property Info
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  units: number;
  unitDescription: string;
  
  // Purchase & Financing
  purchasePrice: number;
  financingType: string;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  closingCostsPercent: number;
  sellerConcessionPercent: number;
  
  // Income & Expenses
  grossMonthlyRent: number;
  monthlyOperatingExpenses: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  maintenanceReserve: number;
  propertyMgmt: number;
  
  // Highlights & Condition
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
  grossMonthlyRent: 0,
  monthlyOperatingExpenses: 0,
  monthlyTaxes: 0,
  monthlyInsurance: 0,
  maintenanceReserve: 0,
  propertyMgmt: 0,
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
  { label: 'Cash', downPercent: 100 },
];

const propertyTypes = [
  'Single Family',
  'Duplex',
  'Triplex',
  'Fourplex',
  'Multi-Unit 5+',
  'Mixed Use',
  'Land',
  'Commercial'
];

const conditionOptions = [
  'Recently Rehabbed',
  'New Construction',
  'Good Condition',
  'Needs Updates',
  'Needs Major Rehab'
];

const loanTerms = [30, 25, 20, 15];

const InvestmentAnalyzer = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [newHighlight, setNewHighlight] = useState('');

  // Calculate all metrics in real-time
  const metrics = useMemo<CalculatedMetrics>(() => {
    const { purchasePrice, downPaymentPercent, interestRate, loanTerm, closingCostsPercent, sellerConcessionPercent, grossMonthlyRent, monthlyOperatingExpenses, financingType } = formData;
    
    const isFHA = financingType.includes('FHA');
    const isCash = financingType === 'Cash';
    
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
    
    // Annual figures
    const annualRent = grossMonthlyRent * 12;
    const annualExpenses = monthlyOperatingExpenses * 12;
    const noi = annualRent - annualExpenses;
    const annualDebtService = totalMonthlyPayment * 12;
    const annualCashFlow = noi - annualDebtService;
    const monthlyCashFlow = annualCashFlow / 12;
    
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

  const updateExpenseBreakdown = () => {
    const total = formData.monthlyTaxes + formData.monthlyInsurance + formData.maintenanceReserve + formData.propertyMgmt;
    if (total > 0) {
      updateField('monthlyOperatingExpenses', total);
    }
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
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 0;

    // Header bar - dark background
    doc.setFillColor(11, 11, 11);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Brand name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CAPITAL DISTRICT NEST', margin, 15);
    
    // Tagline
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text('THE YIELD INTELLIGENCE PLATFORM', margin, 24);
    
    // Gold accent line
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(2);
    doc.line(0, 35, pageWidth, 35);
    
    y = 50;
    
    // Title
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('INVESTMENT EXECUTIVE SUMMARY', margin, y);
    y += 10;
    
    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
    y += 8;
    
    // Property Address
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;
    doc.text(fullAddress || 'Property Address Not Specified', margin, y);
    y += 15;
    
    // Key Metrics Boxes (4 boxes in a row)
    const boxWidth = (pageWidth - margin * 2 - 15) / 4;
    const boxHeight = 28;
    const metricsData = [
      { label: 'Cash on Cash', value: `${metrics.cashOnCash.toFixed(1)}%`, highlight: true },
      { label: 'Cap Rate', value: `${metrics.capRate.toFixed(1)}%`, highlight: false },
      { label: 'Monthly Cash Flow', value: formatCurrency(metrics.monthlyCashFlow), highlight: false },
      { label: 'Cash Required', value: formatCurrency(metrics.cashRequired), highlight: false }
    ];
    
    metricsData.forEach((metric, index) => {
      const x = margin + index * (boxWidth + 5);
      
      if (metric.highlight) {
        doc.setFillColor(212, 175, 55);
      } else {
        doc.setFillColor(245, 245, 245);
      }
      doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'F');
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(metric.highlight ? 255 : 100, metric.highlight ? 255 : 100, metric.highlight ? 255 : 100);
      doc.text(metric.label, x + boxWidth / 2, y + 10, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(metric.highlight ? 255 : 30, metric.highlight ? 255 : 30, metric.highlight ? 255 : 30);
      doc.text(metric.value, x + boxWidth / 2, y + 22, { align: 'center' });
    });
    
    y += boxHeight + 15;
    
    // Property Snapshot Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('PROPERTY SNAPSHOT', margin, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const snapshotItems = [
      `Purchase Price: ${formatCurrency(formData.purchasePrice)}`,
      `Down Payment: ${formatCurrency(metrics.downPayment)} (${formData.downPaymentPercent}%)`,
      `Seller Concession: ${formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)} (${formData.sellerConcessionPercent}%)`,
      `Cash Required at Closing: ${formatCurrency(metrics.cashRequired)}`,
      `Property Type: ${formData.propertyType} (${formData.units} units)`,
      `Condition: ${formData.propertyCondition}`
    ];
    snapshotItems.forEach(item => {
      doc.text(item, margin, y);
      y += 6;
    });
    
    y += 8;
    
    // Monthly Numbers Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('MONTHLY NUMBERS', margin, y);
    y += 8;
    
    const isFHA = formData.financingType.includes('FHA');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const monthlyItems = [
      `Gross Rent: ${formatCurrency(formData.grossMonthlyRent)}`,
      `Mortgage Payment${isFHA ? ' (incl. MIP)' : ''}: ${formatCurrency(metrics.totalMonthlyPayment)}`,
      `Operating Expenses: ${formatCurrency(formData.monthlyOperatingExpenses)}`,
      `Net Cash Flow: ${formatCurrency(metrics.monthlyCashFlow)}`
    ];
    monthlyItems.forEach(item => {
      doc.text(item, margin, y);
      y += 6;
    });
    
    y += 8;
    
    // Annual Summary Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('ANNUAL SUMMARY', margin, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const annualItems = [
      `Annual Rent: ${formatCurrency(metrics.annualRent)}`,
      `Net Operating Income (NOI): ${formatCurrency(metrics.noi)}`,
      `Annual Cash Flow: ${formatCurrency(metrics.annualCashFlow)}`,
      `DSCR: ${metrics.dscr.toFixed(2)}x`,
      `Break-Even Occupancy: ${metrics.breakEvenOccupancy.toFixed(1)}%`
    ];
    annualItems.forEach(item => {
      doc.text(item, margin, y);
      y += 6;
    });
    
    y += 8;
    
    // Investment Highlights Section
    if (formData.highlights.length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text('INVESTMENT HIGHLIGHTS', margin, y);
      y += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      formData.highlights.forEach(highlight => {
        doc.text(`✓ ${highlight}`, margin, y);
        y += 6;
      });
    }
    
    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 25;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('This analysis is for informational purposes only and does not constitute financial advice.', margin, footerY);
    doc.text('Consult with qualified professionals before making investment decisions.', margin, footerY + 5);
    doc.text('capitaldistrictnest.com', pageWidth - margin, footerY + 5, { align: 'right' });
    
    // Generate filename
    const addressSlug = formData.address.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-') || 'Property';
    doc.save(`Nest_Investment_Report_${addressSlug}.pdf`);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Investment Property Analyzer | Capital District Nest</title>
        <meta name="description" content="Free investment property calculator with branded PDF reports. Analyze cash-on-cash returns, cap rates, and DSCR for Capital District real estate." />
      </Helmet>

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <TrendingUp className="w-3 h-3 mr-1" />
              Yield Intelligence
            </Badge>
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3">
              Investment Property <span className="text-primary font-normal">Analyzer</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate returns, analyze cash flow, and generate professional PDF reports for your investment properties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Sections (2x2 Grid) */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section 1: Property Information */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <Building2 className="w-5 h-5 text-primary" />
                      Property Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          placeholder="Albany"
                          className="bg-background/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP</Label>
                          <Input
                            id="zip"
                            value={formData.zip}
                            onChange={(e) => updateField('zip', e.target.value)}
                            placeholder="12203"
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Property Type</Label>
                        <Select value={formData.propertyType} onValueChange={(v) => updateField('propertyType', v)}>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="units">Units</Label>
                        <Input
                          id="units"
                          type="number"
                          value={formData.units}
                          onChange={(e) => updateField('units', parseInt(e.target.value) || 0)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="unitDescription">Unit Description</Label>
                      <Textarea
                        id="unitDescription"
                        value={formData.unitDescription}
                        onChange={(e) => updateField('unitDescription', e.target.value)}
                        placeholder="2BR/1BA each unit..."
                        className="bg-background/50 resize-none h-16"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Section 2: Purchase & Financing */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Purchase & Financing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="purchasePrice">Purchase Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="purchasePrice"
                          type="number"
                          value={formData.purchasePrice || ''}
                          onChange={(e) => updateField('purchasePrice', parseFloat(e.target.value) || 0)}
                          className="bg-background/50 pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Financing Type</Label>
                      <Select value={formData.financingType} onValueChange={handleFinancingChange}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {financingOptions.map(opt => (
                            <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="downPaymentPercent">Down Payment %</Label>
                        <Input
                          id="downPaymentPercent"
                          type="number"
                          step="0.5"
                          value={formData.downPaymentPercent}
                          onChange={(e) => updateField('downPaymentPercent', parseFloat(e.target.value) || 0)}
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interestRate">Interest Rate %</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.125"
                          value={formData.interestRate}
                          onChange={(e) => updateField('interestRate', parseFloat(e.target.value) || 0)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Loan Term</Label>
                      <Select value={formData.loanTerm.toString()} onValueChange={(v) => updateField('loanTerm', parseInt(v))}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {loanTerms.map(term => (
                            <SelectItem key={term} value={term.toString()}>{term} Years</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="closingCosts">Closing Costs %</Label>
                        <Input
                          id="closingCosts"
                          type="number"
                          step="0.5"
                          value={formData.closingCostsPercent}
                          onChange={(e) => updateField('closingCostsPercent', parseFloat(e.target.value) || 0)}
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sellerConcession">Seller Concession %</Label>
                        <Input
                          id="sellerConcession"
                          type="number"
                          step="0.5"
                          value={formData.sellerConcessionPercent}
                          onChange={(e) => updateField('sellerConcessionPercent', parseFloat(e.target.value) || 0)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 3: Income & Expenses */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <Percent className="w-5 h-5 text-primary" />
                      Income & Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="grossRent">Gross Monthly Rent (All Units)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="grossRent"
                          type="number"
                          value={formData.grossMonthlyRent || ''}
                          onChange={(e) => updateField('grossMonthlyRent', parseFloat(e.target.value) || 0)}
                          className="bg-background/50 pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="operatingExpenses">Monthly Operating Expenses</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="operatingExpenses"
                          type="number"
                          value={formData.monthlyOperatingExpenses || ''}
                          onChange={(e) => updateField('monthlyOperatingExpenses', parseFloat(e.target.value) || 0)}
                          className="bg-background/50 pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div className="border-t border-border/30 pt-4">
                      <p className="text-xs text-muted-foreground mb-3">Optional Expense Breakdown:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="taxes" className="text-xs">Taxes</Label>
                          <Input
                            id="taxes"
                            type="number"
                            value={formData.monthlyTaxes || ''}
                            onChange={(e) => {
                              updateField('monthlyTaxes', parseFloat(e.target.value) || 0);
                              setTimeout(updateExpenseBreakdown, 100);
                            }}
                            className="bg-background/50 h-8 text-sm"
                            placeholder="$"
                          />
                        </div>
                        <div>
                          <Label htmlFor="insurance" className="text-xs">Insurance</Label>
                          <Input
                            id="insurance"
                            type="number"
                            value={formData.monthlyInsurance || ''}
                            onChange={(e) => {
                              updateField('monthlyInsurance', parseFloat(e.target.value) || 0);
                              setTimeout(updateExpenseBreakdown, 100);
                            }}
                            className="bg-background/50 h-8 text-sm"
                            placeholder="$"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maintenance" className="text-xs">Maintenance Reserve</Label>
                          <Input
                            id="maintenance"
                            type="number"
                            value={formData.maintenanceReserve || ''}
                            onChange={(e) => {
                              updateField('maintenanceReserve', parseFloat(e.target.value) || 0);
                              setTimeout(updateExpenseBreakdown, 100);
                            }}
                            className="bg-background/50 h-8 text-sm"
                            placeholder="$"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mgmt" className="text-xs">Mgmt / Other</Label>
                          <Input
                            id="mgmt"
                            type="number"
                            value={formData.propertyMgmt || ''}
                            onChange={(e) => {
                              updateField('propertyMgmt', parseFloat(e.target.value) || 0);
                              setTimeout(updateExpenseBreakdown, 100);
                            }}
                            className="bg-background/50 h-8 text-sm"
                            placeholder="$"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section 4: Highlights & Condition */}
                <Card className="glass-card border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Highlights & Condition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Property Condition</Label>
                      <Select value={formData.propertyCondition} onValueChange={(v) => updateField('propertyCondition', v)}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {conditionOptions.map(cond => (
                            <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="conditionNotes">Condition Notes</Label>
                      <Textarea
                        id="conditionNotes"
                        value={formData.conditionNotes}
                        onChange={(e) => updateField('conditionNotes', e.target.value)}
                        placeholder="Recent updates, renovations..."
                        className="bg-background/50 resize-none h-16"
                      />
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
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {formData.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 bg-background/30 rounded-md px-3 py-1.5 text-sm">
                            <span className="text-primary">✓</span>
                            <span className="flex-1 text-foreground/90">{highlight}</span>
                            <button 
                              onClick={() => removeHighlight(index)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Results Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Key Metrics */}
                <Card className="glass-strong border-primary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-center">Live Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Primary Metric - Cash on Cash */}
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                      <p className="text-xs text-primary uppercase tracking-wider mb-1">Cash on Cash Return</p>
                      <p className="text-4xl font-bold text-primary">
                        {metrics.cashOnCash > 0 ? `${metrics.cashOnCash.toFixed(1)}%` : '—'}
                      </p>
                    </div>
                    
                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-background/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Cap Rate</p>
                        <p className="text-lg font-semibold text-foreground">
                          {metrics.capRate > 0 ? `${metrics.capRate.toFixed(1)}%` : '—'}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-background/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Monthly CF</p>
                        <p className={`text-lg font-semibold ${metrics.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metrics.monthlyCashFlow !== 0 ? formatCurrency(metrics.monthlyCashFlow) : '—'}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-background/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Cash Req.</p>
                        <p className="text-lg font-semibold text-foreground">
                          {metrics.cashRequired > 0 ? formatCurrency(metrics.cashRequired) : '—'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Property Snapshot */}
                    <div className="border-t border-border/30 pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Property Snapshot</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Purchase Price</span>
                          <span className="font-medium">{formatCurrency(formData.purchasePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Down Payment</span>
                          <span className="font-medium">{formatCurrency(metrics.downPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Seller Concession</span>
                          <span className="font-medium text-green-400">-{formatCurrency(formData.purchasePrice * formData.sellerConcessionPercent / 100)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Monthly Numbers */}
                    <div className="border-t border-border/30 pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Monthly Numbers</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gross Rent</span>
                          <span className="font-medium text-green-400">{formatCurrency(formData.grossMonthlyRent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Mortgage{formData.financingType.includes('FHA') && ' (w/MIP)'}
                          </span>
                          <span className="font-medium">{formatCurrency(metrics.totalMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expenses</span>
                          <span className="font-medium">{formatCurrency(formData.monthlyOperatingExpenses)}</span>
                        </div>
                        <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                          <span className="font-semibold">Net Cash Flow</span>
                          <span className={`font-bold ${metrics.monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(metrics.monthlyCashFlow)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Annual Summary */}
                    <div className="border-t border-border/30 pt-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Annual Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Rent</span>
                          <span className="font-medium">{formatCurrency(metrics.annualRent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">NOI</span>
                          <span className="font-medium">{formatCurrency(metrics.noi)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Cash Flow</span>
                          <span className={`font-medium ${metrics.annualCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(metrics.annualCashFlow)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">DSCR</span>
                          <span className="font-medium">{metrics.dscr > 0 ? `${metrics.dscr.toFixed(2)}x` : '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Break-Even Occ.</span>
                          <span className="font-medium">{metrics.breakEvenOccupancy > 0 ? `${metrics.breakEvenOccupancy.toFixed(1)}%` : '—'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={generatePDF} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate PDF Report
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    className="w-full border-border/50 hover:bg-background/50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Calculator
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InvestmentAnalyzer;
