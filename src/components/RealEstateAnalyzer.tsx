import React, { useState, useEffect, useRef } from 'react';

const RealEstateAnalyzer = () => {
  const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);
  const [localProperties, setLocalProperties] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [numUnits, setNumUnits] = useState(2);
  const formRef = useRef<HTMLFormElement>(null);

  const getVal = (id: string, isString = false): any => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (!el) return isString ? '' : 0;
    return isString ? el.value : parseFloat(el.value) || 0;
  };

  const setVal = (id: string, value: any) => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) el.value = value === undefined ? '' : value;
  };

  const formatCurrency = (num: number) => {
    const val = Number(num);
    if (isNaN(val)) return '$0.00';
    const style = val < 0 ? 'text-red-600' : 'text-green-600';
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    return <span className={style}>{formatted}</span>;
  };

  const formatCurrencySimple = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

  // New helper function for HTML content
  const formatCurrencyForHTML = (num: number): string => {
    const val = Number(num);
    if (isNaN(val)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const generateRentInputs = () => {
    const container = document.getElementById('rentInputs');
    if (!container) return;
    
    const existingRents: { [key: number]: number } = {};
    for (let i = 1; i <= 4; i++) {
      const input = document.getElementById(`rentUnit${i}`) as HTMLInputElement;
      if (input) {
        existingRents[i] = getVal(`rentUnit${i}`);
      }
    }
    
    container.innerHTML = '';
    for (let i = 1; i <= numUnits; i++) {
      const div = document.createElement('div');
      div.className = 'input-group';
      const rentValue = existingRents[i] || 1100;
      div.innerHTML = `
        <label for="rentUnit${i}" class="block text-sm font-medium text-gray-700 mb-2">Rent for Unit ${i}</label>
        <input type="number" id="rentUnit${i}" value="${rentValue}" 
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               oninput="window.calculateAnalysis && window.calculateAnalysis()">
      `;
      container.appendChild(div);
    }
  };

  const calculate = () => {
    // Core Financial Inputs
    const purchasePrice = getVal('purchasePrice');
    const downPaymentPerc = getVal('downPayment') / 100;
    const purchaseClosingCostsPerc = getVal('purchaseClosingCosts') / 100;
    const rehabCosts = getVal('rehabCosts');
    const arv = getVal('arv');
    const loanToARVPerc = getVal('loanToARV') / 100;
    const purchaseClosingCostsVal = purchasePrice * purchaseClosingCostsPerc;
    const downPaymentAmount = purchasePrice * downPaymentPerc;
    const totalProjectCost = purchasePrice + purchaseClosingCostsVal + rehabCosts;
    const loanAmount = arv * loanToARVPerc;
    const initialCash = totalProjectCost - loanAmount;

    // Update funding breakdown
    const totalProjectCostEl = document.getElementById('totalProjectCost');
    const downPaymentAmountEl = document.getElementById('downPaymentAmount');
    const loanAmountEl = document.getElementById('loanAmount');
    const initialCashEl = document.getElementById('initialCash');
    
    if (totalProjectCostEl) totalProjectCostEl.textContent = formatCurrencySimple(totalProjectCost);
    if (downPaymentAmountEl) downPaymentAmountEl.textContent = formatCurrencySimple(downPaymentAmount);
    if (loanAmountEl) loanAmountEl.textContent = formatCurrencySimple(loanAmount);
    if (initialCashEl) initialCashEl.textContent = formatCurrencyForHTML(initialCash);

    // Flip Scenario Calculations
    const holdingPeriod = getVal('holdingPeriod');
    const rehabLoanInterestPerc = getVal('rehabLoanInterest') / 100;
    const saleClosingCostsPerc = getVal('saleClosingCosts') / 100;
    const totalLoanInterest = (loanAmount * rehabLoanInterestPerc / 12) * holdingPeriod;
    const saleClosingCostsVal = arv * saleClosingCostsPerc;
    const totalFlipCosts = totalProjectCost + totalLoanInterest + saleClosingCostsVal;
    const flipProfit = arv - totalFlipCosts;
    
    let denominatorForReturns = initialCash;
    if (denominatorForReturns <= 0) {
      denominatorForReturns = downPaymentAmount + purchaseClosingCostsVal;
    }

    let flipROI = 0;
    if (denominatorForReturns > 0) {
      flipROI = (flipProfit / denominatorForReturns) * 100;
    } else if (flipProfit > 0) {
      flipROI = Infinity;
    }
    
    // Update flip analysis
    const totalFlipCostsEl = document.getElementById('totalFlipCosts');
    const flipProfitEl = document.getElementById('flipProfit');
    const flipROIEl = document.getElementById('flipROI');
    
    if (totalFlipCostsEl) totalFlipCostsEl.textContent = formatCurrencySimple(totalFlipCosts);
    if (flipProfitEl) flipProfitEl.textContent = formatCurrencyForHTML(flipProfit);
    if (flipROIEl) {
      flipROIEl.innerHTML = (isFinite(flipROI) ? flipROI.toFixed(2) : '∞') + '%';
      flipROIEl.className = `font-semibold text-lg ${flipROI >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }

    // Rental Scenario Calculations
    const annualTaxes = getVal('annualTaxes');
    const annualInsurance = getVal('annualInsurance');
    let totalMonthlyRent = 0;
    for (let i = 1; i <= numUnits; i++) {
      totalMonthlyRent += getVal(`rentUnit${i}`);
    }
    const grossRent = totalMonthlyRent * 12;

    const vacancyRate = getVal('vacancyRate') / 100;
    const repairsRate = getVal('repairsRate') / 100;
    const managementFee = getVal('managementFee') / 100;

    const vacancyCost = grossRent * vacancyRate;
    const effectiveGrossIncome = grossRent - vacancyCost;
    const managementCost = effectiveGrossIncome * managementFee;
    const repairsCost = grossRent * repairsRate;

    const totalOperatingExpenses = repairsCost + managementCost + annualTaxes + annualInsurance;
    const noi = effectiveGrossIncome - totalOperatingExpenses;
    
    // Mortgage Calculation
    const refiLoanRate = getVal('refiLoanRate') / 100 / 12;
    const refiLoanTerm = getVal('refiLoanTerm') * 12;
    let monthlyMortgagePayment = 0;
    if(refiLoanRate > 0 && loanAmount > 0) { 
      monthlyMortgagePayment = loanAmount * refiLoanRate * (Math.pow(1 + refiLoanRate, refiLoanTerm)) / (Math.pow(1 + refiLoanRate, refiLoanTerm) - 1);
    }
    const annualMortgagePayment = monthlyMortgagePayment * 12;
    const annualCashFlow = noi - annualMortgagePayment;
    const monthlyCashFlow = annualCashFlow / 12;

    // Calculate cash left in deal after refinance (BRRRR calculation)
    const cashLeftInDeal = Math.max(0, totalProjectCost - loanAmount);
    
    let cocReturn = 0;
    if (cashLeftInDeal > 0) {
      cocReturn = (annualCashFlow / cashLeftInDeal) * 100;
    } else if (annualCashFlow > 0) {
      cocReturn = Infinity; // Infinite returns if no cash left in deal
    }

    // Calculate 5-Year Total Return based on cash left in deal
    let fiveYearTotalReturn = 0;
    if (cashLeftInDeal > 0) {
      // 5 years of cash flow + potential appreciation (assuming 3% annual appreciation)
      const fiveYearCashFlow = annualCashFlow * 5;
      const appreciationRate = 0.03; // 3% annual appreciation
      const propertyAppreciation = arv * Math.pow(1 + appreciationRate, 5) - arv;
      const totalReturn = fiveYearCashFlow + propertyAppreciation;
      fiveYearTotalReturn = (totalReturn / cashLeftInDeal) * 100;
    } else if (annualCashFlow > 0) {
      fiveYearTotalReturn = Infinity;
    }
    
    let capRate = 0;
    if (purchasePrice > 0) {
      capRate = (noi / purchasePrice) * 100;
    }

    // Update rental analysis
    const grossRentEl = document.getElementById('grossRent');
    const noiEl = document.getElementById('noi');
    const mortgagePaymentEl = document.getElementById('mortgagePayment');
    const annualCashFlowEl = document.getElementById('annualCashFlow');
    const monthlyCashFlowEl = document.getElementById('monthlyCashFlow');
    const cocReturnEl = document.getElementById('cocReturn');
    const fiveYearReturnEl = document.getElementById('fiveYearReturn');
    const capRateEl = document.getElementById('capRate');
    
    if (grossRentEl) grossRentEl.textContent = formatCurrencySimple(grossRent);
    if (noiEl) noiEl.textContent = formatCurrencySimple(noi);
    if (mortgagePaymentEl) mortgagePaymentEl.textContent = formatCurrencySimple(annualMortgagePayment);
    if (annualCashFlowEl) {
      const annualCashFlowPercent = cashLeftInDeal > 0 ? ((annualCashFlow / cashLeftInDeal) * 100).toFixed(2) : '∞';
      // Debug info to show calculation
      const debugInfo = `Cash Left: ${formatCurrencySimple(cashLeftInDeal)}`;
      annualCashFlowEl.innerHTML = `${formatCurrencyForHTML(annualCashFlow)} <span class="text-sm font-medium text-gray-600">(${annualCashFlowPercent}%) <br/><span class="text-xs text-gray-500">${debugInfo}</span></span>`;
    }
    if (monthlyCashFlowEl) {
      const annualCashFlowPercent = cashLeftInDeal > 0 ? ((annualCashFlow / cashLeftInDeal) * 100) : 0;
      const monthlyCashFlowPercent = (annualCashFlowPercent / 12).toFixed(2);
      monthlyCashFlowEl.innerHTML = `${formatCurrencyForHTML(monthlyCashFlow)} <span class="text-sm font-medium text-gray-600">(${monthlyCashFlowPercent}%)</span>`;
    }
    if (cocReturnEl) {
      cocReturnEl.innerHTML = (isFinite(cocReturn) ? cocReturn.toFixed(2) : '∞') + '%';
      cocReturnEl.className = `font-semibold text-lg ${cocReturn >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }
    if (fiveYearReturnEl) {
      const fiveYearCashFlow = annualCashFlow * 5;
      const appreciationRate = 0.03;
      const propertyAppreciation = arv * Math.pow(1 + appreciationRate, 5) - arv;
      const totalFiveYearProfit = fiveYearCashFlow + propertyAppreciation;
      
      const totalReturnPercentage = (isFinite(fiveYearTotalReturn) ? fiveYearTotalReturn.toFixed(2) : '∞');
      fiveYearReturnEl.innerHTML = `${formatCurrencyForHTML(totalFiveYearProfit)} <span class="text-sm font-medium text-gray-600">(Total Return: ${totalReturnPercentage}%)</span>`;
      fiveYearReturnEl.className = `font-semibold text-lg ${fiveYearTotalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }
    if (capRateEl) capRateEl.textContent = capRate.toFixed(2) + '%';
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setVal('purchasePrice', '60000');
    setVal('downPayment', '20');
    setVal('purchaseClosingCosts', '3');
    setVal('rehabCosts', '45000');
    setVal('arv', '180000');
    setVal('loanToARV', '70');
    setVal('annualTaxes', '2400');
    setVal('annualInsurance', '1200');
    setVal('holdingPeriod', '6');
    setVal('rehabLoanInterest', '10');
    setVal('saleClosingCosts', '8');
    setVal('numUnits', '2');
    setVal('vacancyRate', '5');
    setVal('repairsRate', '5');
    setVal('managementFee', '10');
    setVal('refiLoanRate', '7.5');
    setVal('refiLoanTerm', '30');
    setCurrentPropertyId(null);
    setNumUnits(2);
    setTimeout(() => {
      generateRentInputs();
      calculate();
    }, 100);
  };

  useEffect(() => {
    // Expose calculate function globally for inline handlers
    (window as any).calculateAnalysis = calculate;
    
    // Initialize form
    setTimeout(() => {
      generateRentInputs();
      calculate();
    }, 100);

    return () => {
      delete (window as any).calculateAnalysis;
    };
  }, []);

  useEffect(() => {
    generateRentInputs();
  }, [numUnits]);

  const handleNumUnitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNumUnits = parseInt(e.target.value);
    setNumUnits(newNumUnits);
    setTimeout(calculate, 100);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Real Estate Deal Analyzer</h3>
        <p className="text-gray-600">Evaluate Your Fix & Flip or Buy & Hold Scenarios</p>
      </div>

      <form ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h4 className="text-xl font-bold text-gray-700">Property & Financial Inputs</h4>
            <button 
              type="button"
              onClick={resetForm}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Form
            </button>
          </div>
          
          <div className="input-group mb-4">
            <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-2">
              Property Name (e.g., 123 Main St)
            </label>
            <input 
              type="text" 
              id="propertyName" 
              placeholder="Enter a name for this deal"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <hr className="my-4"/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
              <input 
                type="number" 
                id="purchasePrice" 
                defaultValue="60000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-2">Down Payment (%)</label>
              <input 
                type="number" 
                id="downPayment" 
                defaultValue="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="purchaseClosingCosts" className="block text-sm font-medium text-gray-700 mb-2">Purchase Closing Costs (%)</label>
              <input 
                type="number" 
                id="purchaseClosingCosts" 
                defaultValue="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rehabCosts" className="block text-sm font-medium text-gray-700 mb-2">Estimated Rehab Costs</label>
              <input 
                type="number" 
                id="rehabCosts" 
                defaultValue="45000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group md:col-span-2">
              <label htmlFor="arv" className="block text-sm font-medium text-gray-700 mb-2">After Repair Value (ARV)</label>
              <input 
                type="number" 
                id="arv" 
                defaultValue="180000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
          </div>
          
          <hr className="my-6"/>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="input-group">
              <label htmlFor="loanToARV" className="block text-sm font-medium text-gray-700 mb-2">Loan to ARV (%)</label>
              <input 
                type="number" 
                id="loanToARV" 
                defaultValue="70"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="annualTaxes" className="block text-sm font-medium text-gray-700 mb-2">Annual Property Taxes</label>
              <input 
                type="number" 
                id="annualTaxes" 
                defaultValue="2400"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="annualInsurance" className="block text-sm font-medium text-gray-700 mb-2">Annual Insurance</label>
              <input 
                type="number" 
                id="annualInsurance" 
                defaultValue="1200"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
          </div>
          
          <hr className="my-6"/>
          
          <h5 className="text-lg font-semibold text-gray-700 mb-4">Flip Scenario Inputs</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="input-group">
              <label htmlFor="holdingPeriod" className="block text-sm font-medium text-gray-700 mb-2">Holding Period (Months)</label>
              <input 
                type="number" 
                id="holdingPeriod" 
                defaultValue="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rehabLoanInterest" className="block text-sm font-medium text-gray-700 mb-2">Loan Interest Rate (%)</label>
              <input 
                type="number" 
                id="rehabLoanInterest" 
                defaultValue="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="saleClosingCosts" className="block text-sm font-medium text-gray-700 mb-2">Sale Closing Costs (%)</label>
              <input 
                type="number" 
                id="saleClosingCosts" 
                defaultValue="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
          </div>
          
          <hr className="my-6"/>
          
          <h5 className="text-lg font-semibold text-gray-700 mb-4">Rental Scenario Inputs</h5>
          <div className="input-group mb-4">
            <label htmlFor="numUnits" className="block text-sm font-medium text-gray-700 mb-2">Number of Units</label>
            <select 
              id="numUnits" 
              value={numUnits}
              onChange={handleNumUnitsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          
          <div id="rentInputs" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="input-group">
              <label htmlFor="vacancyRate" className="block text-sm font-medium text-gray-700 mb-2">Vacancy Rate (%)</label>
              <input 
                type="number" 
                id="vacancyRate" 
                defaultValue="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="repairsRate" className="block text-sm font-medium text-gray-700 mb-2">Repairs & Maint. (%)</label>
              <input 
                type="number" 
                id="repairsRate" 
                defaultValue="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="managementFee" className="block text-sm font-medium text-gray-700 mb-2">Property Mgmt. Fee (%)</label>
              <input 
                type="number" 
                id="managementFee" 
                defaultValue="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label htmlFor="refiLoanRate" className="block text-sm font-medium text-gray-700 mb-2">Refinance Interest Rate (%)</label>
              <input 
                type="number" 
                id="refiLoanRate" 
                defaultValue="7.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="refiLoanTerm" className="block text-sm font-medium text-gray-700 mb-2">Refinance Term (Years)</label>
              <input 
                type="number" 
                id="refiLoanTerm" 
                defaultValue="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={calculate}
              />
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Funding Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Funding Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Total Project Cost</span>
                <span className="font-semibold text-lg text-gray-900" id="totalProjectCost">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Down Payment</span>
                <span className="font-semibold text-lg text-gray-900" id="downPaymentAmount">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Rehab Loan Amount</span>
                <span className="font-semibold text-lg text-gray-900" id="loanAmount">$0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-blue-600">Total Cash to/from Client</span>
                <span className="font-bold text-lg text-blue-600" id="initialCash">$0</span>
              </div>
            </div>
          </div>

          {/* Flip Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-green-700 border-b pb-2">Flip Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Total Costs for Flip</span>
                <span className="font-semibold text-lg text-gray-900" id="totalFlipCosts">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-bold text-green-600">Estimated Profit</span>
                <span className="font-bold text-lg" id="flipProfit">$0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Return on Investment (ROI)</span>
                <span className="font-semibold text-lg" id="flipROI">0%</span>
              </div>
            </div>
          </div>

          {/* Rental Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-purple-700 border-b pb-2">Rental (Buy & Hold) Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Gross Potential Rent (Annual)</span>
                <span className="font-semibold text-lg text-gray-900" id="grossRent">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Net Operating Income (NOI)</span>
                <span className="font-semibold text-lg text-gray-900" id="noi">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Annual Mortgage Payment</span>
                <span className="font-semibold text-lg text-gray-900" id="mortgagePayment">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-bold text-green-600">Annual Cash Flow</span>
                <span className="font-bold text-lg" id="annualCashFlow">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Monthly Cash Flow</span>
                <span className="font-semibold text-lg" id="monthlyCashFlow">$0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Cash on Cash Return (CoC)</span>
                <span className="font-semibold text-lg" id="cocReturn">0%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">5-Year Total Profit</span>
                <span className="font-semibold text-lg" id="fiveYearReturn">$0 (0%)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Capitalization (Cap) Rate</span>
                <span className="font-semibold text-lg text-gray-900" id="capRate">0%</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RealEstateAnalyzer;
