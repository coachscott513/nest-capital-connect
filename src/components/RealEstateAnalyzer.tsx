import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ShareAnalysis from './ShareAnalysis';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface FormData {
  propertyAddress: string;
  propertyType: 'SFH' | 'Multi';
  numUnits: number;
  purchasePrice: number;
  arv: number;
  estimatedTotalRent: number;
  rehabCosts: number;
  acquisitionCosts: number;
  sellingCosts: number;
  holdingPeriod: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  propertyManagement: number;
  vacancyRate: number;
  repairsCapEx: number;
  acquisitionLTV: number;
  acquisitionInterestRate: number;
  refiLTV: number;
  refiInterestRate: number;
  refiClosingCosts: number;
}

interface AnalysisResults {
  flipTotalCost: number;
  flipSalePrice: number;
  flipNetProfit: number;
  flipROI: number;
  rentalGrossRent: number;
  rentalOperatingExpenses: number;
  rentalNOI: number;
  rentalDebtService: number;
  rentalCashFlow: number;
  rentalAnnualCashFlow: number;
  rentalCoC: number;
  rentalCapRate: number;
  brrrrInitialCash: number;
  brrrrRefiLoan: number;
  brrrrCashOut: number;
  brrrrCashLeft: number;
  brrrrPostRefiCoC: number;
}

const RealEstateAnalyzer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: '',
    propertyType: 'SFH',
    numUnits: 2,
    purchasePrice: 0,
    arv: 0,
    estimatedTotalRent: 0,
    rehabCosts: 0,
    acquisitionCosts: 3.0,
    sellingCosts: 6.0,
    holdingPeriod: 4,
    monthlyTaxes: 0,
    monthlyInsurance: 0,
    propertyManagement: 8.0,
    vacancyRate: 5.0,
    repairsCapEx: 0,
    acquisitionLTV: 80,
    acquisitionInterestRate: 8.0,
    refiLTV: 75,
    refiInterestRate: 6.5,
    refiClosingCosts: 2.0
  });

  const [unitRents, setUnitRents] = useState<number[]>([]);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const formatNumber = (num: number): string => {
    if (typeof num !== 'number' || isNaN(num)) return 'N/A';
    if (!isFinite(num)) return 'Infinite';
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const calculatePMT = (principal: number, annualInterestRate: number, loanTermYears: number): number => {
    const monthlyRate = annualInterestRate / 12;
    const numPayments = loanTermYears * 12;

    if (principal === 0 || numPayments === 0) return 0;
    if (monthlyRate === 0) return principal / numPayments;

    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const handlePropertyTypeChange = (type: 'SFH' | 'Multi') => {
    setFormData(prev => ({
      ...prev,
      propertyType: type
    }));
    
    if (type === 'SFH') {
      setUnitRents([]);
    } else {
      setUnitRents(new Array(formData.numUnits).fill(0));
    }
  };

  const handleNumUnitsChange = (numUnits: number) => {
    setFormData(prev => ({
      ...prev,
      numUnits
    }));
    setUnitRents(new Array(numUnits).fill(0));
  };

  const updateUnitRent = (index: number, value: number) => {
    const newUnitRents = [...unitRents];
    newUnitRents[index] = value;
    setUnitRents(newUnitRents);
    
    const totalRent = newUnitRents.reduce((sum, rent) => sum + rent, 0);
    setFormData(prev => ({
      ...prev,
      estimatedTotalRent: totalRent
    }));
  };

  const calculateAnalysis = (): AnalysisResults | null => {
    try {
      console.log('Starting calculation with formData:', formData);
      
      const {
        purchasePrice, arv, rehabCosts, acquisitionCosts, sellingCosts, holdingPeriod,
        monthlyTaxes, monthlyInsurance, propertyManagement, vacancyRate, repairsCapEx,
        acquisitionLTV, acquisitionInterestRate, refiLTV, refiInterestRate, refiClosingCosts,
        estimatedTotalRent
      } = formData;

      // Convert string inputs to numbers and handle empty values
      const numericData = {
        purchasePrice: Number(purchasePrice) || 0,
        arv: Number(arv) || 0,
        rehabCosts: Number(rehabCosts) || 0,
        acquisitionCosts: Number(acquisitionCosts) || 0,
        sellingCosts: Number(sellingCosts) || 0,
        holdingPeriod: Number(holdingPeriod) || 0,
        monthlyTaxes: Number(monthlyTaxes) || 0,
        monthlyInsurance: Number(monthlyInsurance) || 0,
        propertyManagement: Number(propertyManagement) || 0,
        vacancyRate: Number(vacancyRate) || 0,
        repairsCapEx: Number(repairsCapEx) || 0,
        acquisitionLTV: Number(acquisitionLTV) || 0,
        acquisitionInterestRate: Number(acquisitionInterestRate) || 0,
        refiLTV: Number(refiLTV) || 0,
        refiInterestRate: Number(refiInterestRate) || 0,
        refiClosingCosts: Number(refiClosingCosts) || 0,
        estimatedTotalRent: Number(estimatedTotalRent) || 0
      };

      console.log('Converted numeric data:', numericData);

      // Validate required fields
      if (numericData.purchasePrice <= 0 || numericData.arv <= 0 || numericData.estimatedTotalRent <= 0) {
        console.log('Missing required fields');
        return null;
      }

      const totalAcquisitionPlusRehab = numericData.purchasePrice + numericData.rehabCosts;
      const loanAmountAcquisition = totalAcquisitionPlusRehab * (numericData.acquisitionLTV / 100);
      const loanTermYears = 30;
      const cashDownPayment = totalAcquisitionPlusRehab * (1 - numericData.acquisitionLTV / 100);
      const acquisitionClosingCosts = loanAmountAcquisition * (numericData.acquisitionCosts / 100);
      const monthlyDebtServiceAcquisitionDuringHolding = calculatePMT(loanAmountAcquisition, numericData.acquisitionInterestRate / 100, loanTermYears);
      const totalHoldingCosts = (numericData.monthlyTaxes + numericData.monthlyInsurance + monthlyDebtServiceAcquisitionDuringHolding) * numericData.holdingPeriod;

      console.log('Key calculations:', {
        totalAcquisitionPlusRehab,
        loanAmountAcquisition,
        cashDownPayment,
        acquisitionClosingCosts,
        monthlyDebtServiceAcquisitionDuringHolding,
        totalHoldingCosts
      });

      // Flip Analysis
      const initialCashOutlayFlip = cashDownPayment + acquisitionClosingCosts;
      const estimatedSalePriceFlip = numericData.arv;
      const sellingCostsAmount = estimatedSalePriceFlip * (numericData.sellingCosts / 100);
      const totalExpensesFlip = numericData.purchasePrice + numericData.rehabCosts + acquisitionClosingCosts + totalHoldingCosts + sellingCostsAmount;
      const netProfitFlip = estimatedSalePriceFlip - totalExpensesFlip;
      const roiFlip = (initialCashOutlayFlip > 0) ? (netProfitFlip / initialCashOutlayFlip) * 100 : (netProfitFlip > 0 ? Infinity : 0);

      console.log('Flip Analysis:', {
        initialCashOutlayFlip,
        estimatedSalePriceFlip,
        sellingCostsAmount,
        totalExpensesFlip,
        netProfitFlip,
        roiFlip
      });

      // Rental Analysis
      const monthlyPropertyManagementCost = numericData.estimatedTotalRent * (numericData.propertyManagement / 100);
      const monthlyVacancyCost = numericData.estimatedTotalRent * (numericData.vacancyRate / 100);
      const totalMonthlyOperatingExpenses = numericData.monthlyTaxes + numericData.monthlyInsurance + monthlyPropertyManagementCost + monthlyVacancyCost + numericData.repairsCapEx;
      const noiMonthly = numericData.estimatedTotalRent - totalMonthlyOperatingExpenses;
      const noiAnnual = noiMonthly * 12;
      const monthlyDebtServiceRental = calculatePMT(loanAmountAcquisition, numericData.acquisitionInterestRate / 100, loanTermYears);
      const monthlyCashFlowRental = noiMonthly - monthlyDebtServiceRental;
      const annualCashFlowRental = monthlyCashFlowRental * 12;
      const initialCashInvestedRental = cashDownPayment + acquisitionClosingCosts;

      let cocReturnRental = 0;
      if (initialCashInvestedRental > 0) {
        cocReturnRental = (annualCashFlowRental / initialCashInvestedRental) * 100;
      } else if (annualCashFlowRental > 0) {
        cocReturnRental = Infinity;
      }

      const capRate = numericData.purchasePrice > 0 ? (noiAnnual / numericData.purchasePrice) * 100 : 0;

      console.log('Rental Analysis:', {
        monthlyPropertyManagementCost,
        monthlyVacancyCost,
        totalMonthlyOperatingExpenses,
        noiMonthly,
        monthlyDebtServiceRental,
        monthlyCashFlowRental,
        cocReturnRental,
        capRate
      });

      // BRRRR Analysis
      const refiLoanAmount = numericData.arv * (numericData.refiLTV / 100);
      const refiClosingCostsDollars = refiLoanAmount * (numericData.refiClosingCosts / 100);
      const cashPulledOut = refiLoanAmount - (loanAmountAcquisition + refiClosingCostsDollars);
      const cashLeftInDeal = initialCashInvestedRental - cashPulledOut;
      const monthlyDebtServiceRefi = calculatePMT(refiLoanAmount, numericData.refiInterestRate / 100, loanTermYears);
      const monthlyCashFlowPostRefi = noiMonthly - monthlyDebtServiceRefi;
      const annualCashFlowPostRefi = monthlyCashFlowPostRefi * 12;

      let postRefiCoC = 0;
      if (cashLeftInDeal > 0) {
        postRefiCoC = (annualCashFlowPostRefi / cashLeftInDeal) * 100;
      } else if (cashLeftInDeal <= 0 && annualCashFlowPostRefi > 0) {
        postRefiCoC = Infinity;
      }

      console.log('BRRRR Analysis:', {
        refiLoanAmount,
        refiClosingCostsDollars,
        cashPulledOut,
        cashLeftInDeal,
        monthlyDebtServiceRefi,
        monthlyCashFlowPostRefi,
        postRefiCoC
      });

      const finalResults = {
        flipTotalCost: totalExpensesFlip,
        flipSalePrice: estimatedSalePriceFlip,
        flipNetProfit: netProfitFlip,
        flipROI: roiFlip,
        rentalGrossRent: numericData.estimatedTotalRent,
        rentalOperatingExpenses: totalMonthlyOperatingExpenses,
        rentalNOI: noiMonthly,
        rentalDebtService: monthlyDebtServiceRental,
        rentalCashFlow: monthlyCashFlowRental,
        rentalAnnualCashFlow: annualCashFlowRental,
        rentalCoC: cocReturnRental,
        rentalCapRate: capRate,
        brrrrInitialCash: initialCashInvestedRental,
        brrrrRefiLoan: refiLoanAmount,
        brrrrCashOut: cashPulledOut,
        brrrrCashLeft: cashLeftInDeal,
        brrrrPostRefiCoC: postRefiCoC
      };

      console.log('Final results:', finalResults);
      return finalResults;
    } catch (error) {
      console.error('Calculation Error:', error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const analysisResults = calculateAnalysis();
    setResults(analysisResults);
  };

  const flipChartData = results ? {
    labels: ['Purchase Price', 'Rehab Costs', 'Holding Costs', 'Selling Costs', 'Net Profit'],
    datasets: [{
      label: 'Flip Financials ($)',
      data: [
        formData.purchasePrice,
        formData.rehabCosts,
        (formData.monthlyTaxes + formData.monthlyInsurance) * formData.holdingPeriod,
        results.flipSalePrice * (formData.sellingCosts / 100),
        results.flipNetProfit
      ],
      backgroundColor: [
        '#00509E',
        '#007BBF', 
        '#0097DA',
        '#E2002A',
        results.flipNetProfit >= 0 ? '#4CAF50' : '#F44336'
      ]
    }]
  } : null;

  const rentalChartData = results ? {
    labels: ['Gross Rent', 'Operating Expenses', 'Debt Service', 'Cash Flow'],
    datasets: [{
      label: 'Monthly Rental Financials ($)',
      data: [
        results.rentalGrossRent,
        results.rentalOperatingExpenses,
        results.rentalDebtService,
        results.rentalCashFlow
      ],
      backgroundColor: [
        '#4CAF50',
        '#F44336',
        '#FF9800',
        results.rentalCashFlow >= 0 ? '#2196F3' : '#F44336'
      ]
    }]
  } : null;

  const brrrrChartData = results ? {
    labels: ['Initial Cash Invested', 'Cash Pulled Out', 'Cash Left in Deal'],
    datasets: [{
      data: [
        results.brrrrInitialCash,
        results.brrrrCashOut,
        results.brrrrCashLeft
      ],
      backgroundColor: [
        '#00509E',
        '#4CAF50',
        '#FFC107'
      ]
    }]
  } : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-6xl mx-auto mb-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-4 sm:mb-0">
          Property Investment Analyzer
        </h3>
        <div className="w-32 sm:w-40 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">REMAX</span>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Property Information Section */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-2xl font-semibold text-blue-700 mb-4 pb-2 border-b border-gray-300">
            Property Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Property Address:
              </label>
              <input
                type="text"
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 123 Main St, Anytown"
                required
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Property Type:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="propertyType"
                    value="SFH"
                    checked={formData.propertyType === 'SFH'}
                    onChange={() => handlePropertyTypeChange('SFH')}
                    className="form-radio text-red-600 mr-2"
                  />
                  <span>Single Family</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="propertyType"
                    value="Multi"
                    checked={formData.propertyType === 'Multi'}
                    onChange={() => handlePropertyTypeChange('Multi')}
                    className="form-radio text-red-600 mr-2"
                  />
                  <span>Multi-Unit</span>
                </label>
              </div>
            </div>

            {formData.propertyType === 'Multi' && (
              <>
                <div>
                  <label htmlFor="numUnits" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Units (Max 8):
                  </label>
                  <select
                    id="numUnits"
                    value={formData.numUnits}
                    onChange={(e) => handleNumUnitsChange(Number(e.target.value))}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} Units</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-span-full">
                  <h5 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-1">
                    Individual Unit Rents:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {unitRents.map((rent, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-md shadow-sm">
                        <label className="text-sm font-medium text-gray-700 w-16">
                          Unit {index + 1}:
                        </label>
                        <input
                          type="number"
                          value={rent}
                          onChange={(e) => updateUnitRent(index, Number(e.target.value))}
                          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 1200"
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Price ($):
              </label>
              <input
                type="number"
                id="purchasePrice"
                value={formData.purchasePrice || ''}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="200000"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="arv" className="block text-sm font-medium text-gray-700 mb-1">
                After Repair Value (ARV) ($):
              </label>
              <input
                type="number"
                id="arv"
                value={formData.arv || ''}
                onChange={(e) => handleInputChange('arv', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="350000"
                min="0"
                required
              />
            </div>

            {formData.propertyType === 'SFH' && (
              <div className="col-span-full">
                <label htmlFor="estimatedTotalRent" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Monthly Rent ($):
                </label>
                <input
                  type="number"
                  id="estimatedTotalRent"
                  value={formData.estimatedTotalRent || ''}
                  onChange={(e) => handleInputChange('estimatedTotalRent', e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2500"
                  min="0"
                  required
                />
              </div>
            )}
          </div>
        </section>

        {/* Costs & Expenses Section */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-2xl font-semibold text-blue-700 mb-4 pb-2 border-b border-gray-300">
            Costs & Expenses
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="rehabCosts" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Rehab Costs ($):
              </label>
              <input
                type="number"
                id="rehabCosts"
                value={formData.rehabCosts || ''}
                onChange={(e) => handleInputChange('rehabCosts', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="50000"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="acquisitionCosts" className="block text-sm font-medium text-gray-700 mb-1">
                Acquisition Closing Costs (% of Loan):
              </label>
              <input
                type="number"
                id="acquisitionCosts"
                value={formData.acquisitionCosts || ''}
                onChange={(e) => handleInputChange('acquisitionCosts', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="3.0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="sellingCosts" className="block text-sm font-medium text-gray-700 mb-1">
                Selling Costs (% of ARV):
              </label>
              <input
                type="number"
                id="sellingCosts"
                value={formData.sellingCosts || ''}
                onChange={(e) => handleInputChange('sellingCosts', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="6.0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="holdingPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Holding Period (Months):
              </label>
              <input
                type="number"
                id="holdingPeriod"
                value={formData.holdingPeriod || ''}
                onChange={(e) => handleInputChange('holdingPeriod', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="4"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="monthlyTaxes" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Property Taxes ($):
              </label>
              <input
                type="number"
                id="monthlyTaxes"
                value={formData.monthlyTaxes || ''}
                onChange={(e) => handleInputChange('monthlyTaxes', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="300"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="monthlyInsurance" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Insurance ($):
              </label>
              <input
                type="number"
                id="monthlyInsurance"
                value={formData.monthlyInsurance || ''}
                onChange={(e) => handleInputChange('monthlyInsurance', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="100"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="propertyManagement" className="block text-sm font-medium text-gray-700 mb-1">
                Property Management (% of Rent):
              </label>
              <input
                type="number"
                id="propertyManagement"
                value={formData.propertyManagement || ''}
                onChange={(e) => handleInputChange('propertyManagement', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="8.0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="vacancyRate" className="block text-sm font-medium text-gray-700 mb-1">
                Vacancy Rate (% of Rent):
              </label>
              <input
                type="number"
                id="vacancyRate"
                value={formData.vacancyRate || ''}
                onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="5.0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="repairsCapEx" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Repairs & CapEx Reserve ($):
              </label>
              <input
                type="number"
                id="repairsCapEx"
                value={formData.repairsCapEx || ''}
                onChange={(e) => handleInputChange('repairsCapEx', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="200"
                min="0"
              />
            </div>
          </div>
        </section>

        {/* Financing Details Section */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-2xl font-semibold text-blue-700 mb-4 pb-2 border-b border-gray-300">
            Financing Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="acquisitionLTV" className="block text-sm font-medium text-gray-700 mb-1">
                Acquisition Loan LTV (%):
              </label>
              <input
                type="number"
                id="acquisitionLTV"
                value={formData.acquisitionLTV || ''}
                onChange={(e) => handleInputChange('acquisitionLTV', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="80"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label htmlFor="acquisitionInterestRate" className="block text-sm font-medium text-gray-700 mb-1">
                Acquisition Interest Rate (% Annual):
              </label>
              <input
                type="number"
                id="acquisitionInterestRate"
                value={formData.acquisitionInterestRate || ''}
                onChange={(e) => handleInputChange('acquisitionInterestRate', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="8.0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="refiLTV" className="block text-sm font-medium text-gray-700 mb-1">
                Refinance Loan LTV (% of ARV):
              </label>
              <input
                type="number"
                id="refiLTV"
                value={formData.refiLTV || ''}
                onChange={(e) => handleInputChange('refiLTV', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="75"
                min="0"
                max="100"
                required
              />
            </div>

            <div>
              <label htmlFor="refiInterestRate" className="block text-sm font-medium text-gray-700 mb-1">
                Refinance Interest Rate (% Annual):
              </label>
              <input
                type="number"
                id="refiInterestRate"
                value={formData.refiInterestRate || ''}
                onChange={(e) => handleInputChange('refiInterestRate', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="6.5"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="refiClosingCosts" className="block text-sm font-medium text-gray-700 mb-1">
                Refinance Closing Costs (% of Refi Loan):
              </label>
              <input
                type="number"
                id="refiClosingCosts"
                value={formData.refiClosingCosts || ''}
                onChange={(e) => handleInputChange('refiClosingCosts', e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="2.0"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
        </section>

        <div className="text-center mt-8">
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Analyze Property
          </button>
        </div>
      </form>

      {results && (
        <section className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-600">
          <h4 className="text-2xl font-semibold text-blue-700 mb-4 pb-2 border-b border-blue-600">
            Analysis Results
          </h4>

          {/* Overall Summary */}
          <div className="mb-8 p-4 bg-white rounded-md shadow-sm">
            <h5 className="text-xl font-bold text-gray-800 mb-3">Overall Investment Summary</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-100 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Flip ROI</p>
                <p className="text-2xl font-bold text-green-700">{formatNumber(results.flipROI)}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Rental CoC</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(results.rentalCoC)}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">BRRRR CoC</p>
                <p className="text-2xl font-bold text-purple-700">{formatNumber(results.brrrrPostRefiCoC)}%</p>
              </div>
            </div>
          </div>

          {/* Flip Analysis */}
          <div className="mb-6">
            <h5 className="text-xl font-semibold text-gray-800 mb-3">Flip Property Analysis</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Total Project Cost:</span>
                <strong className="text-red-600">${formatNumber(results.flipTotalCost)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Estimated Sale Price:</span>
                <strong className="text-red-600">${formatNumber(results.flipSalePrice)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Estimated Net Profit:</span>
                <strong className="text-red-600">${formatNumber(results.flipNetProfit)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Return on Investment (ROI):</span>
                <strong className="text-red-600">{formatNumber(results.flipROI)}%</strong>
              </div>
            </div>
            {flipChartData && (
              <div className="mt-6 h-64">
                <Bar data={flipChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            )}
          </div>

          {/* Rental Analysis */}
          <div className="mb-6">
            <h5 className="text-xl font-semibold text-gray-800 mb-3">Rental Property Analysis</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Monthly Gross Rent:</span>
                <strong className="text-red-600">${formatNumber(results.rentalGrossRent)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Monthly Operating Expenses:</span>
                <strong className="text-red-600">${formatNumber(results.rentalOperatingExpenses)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Net Operating Income (NOI):</span>
                <strong className="text-red-600">${formatNumber(results.rentalNOI)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Monthly Debt Service:</span>
                <strong className="text-red-600">${formatNumber(results.rentalDebtService)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Monthly Cash Flow:</span>
                <strong className="text-red-600">${formatNumber(results.rentalCashFlow)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Annual Cash Flow:</span>
                <strong className="text-red-600">${formatNumber(results.rentalAnnualCashFlow)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Cash-on-Cash Return:</span>
                <strong className="text-red-600">{formatNumber(results.rentalCoC)}%</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Cap Rate:</span>
                <strong className="text-red-600">{formatNumber(results.rentalCapRate)}%</strong>
              </div>
            </div>
            {rentalChartData && (
              <div className="mt-6 h-64">
                <Bar data={rentalChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            )}
          </div>

          {/* BRRRR Analysis */}
          <div>
            <h5 className="text-xl font-semibold text-gray-800 mb-3">BRRRR Strategy Analysis</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Initial Cash Invested:</span>
                <strong className="text-red-600">${formatNumber(results.brrrrInitialCash)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Refinance Loan Amount:</span>
                <strong className="text-red-600">${formatNumber(results.brrrrRefiLoan)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Cash Pulled Out:</span>
                <strong className="text-red-600">${formatNumber(results.brrrrCashOut)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Cash Left in Deal:</span>
                <strong className="text-red-600">${formatNumber(results.brrrrCashLeft)}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 col-span-full">
                <span className="font-medium">Post-Refi Cash-on-Cash Return:</span>
                <strong className="text-red-600">{formatNumber(results.brrrrPostRefiCoC)}%</strong>
              </div>
            </div>
            {brrrrChartData && (
              <div className="mt-6 h-64">
                <Pie data={brrrrChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            )}
          </div>
          
          {/* Share Analysis Component */}
          <div className="mt-8 text-center">
            <ShareAnalysis 
              results={results}
              propertyAddress={formData.propertyAddress}
              purchasePrice={formData.purchasePrice}
              arv={formData.arv}
              estimatedTotalRent={formData.estimatedTotalRent}
            />
          </div>
        </section>
      )}

      <footer className="text-center mt-10 pt-6 border-t border-gray-200 text-gray-600 text-sm">
        <p className="mb-2">
          Disclaimer: This analyzer is for informational purposes only. Not financial advice. 
          Consult professionals before making investment decisions.
        </p>
        <p>&copy; 2025 Remax - Capital District Real Estate</p>
      </footer>
    </div>
  );
};

export default RealEstateAnalyzer;