
import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const FinancingSection = () => {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);
  const [principalInterest, setPrincipalInterest] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<Array<{
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }>>([]);
  
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const createOrUpdateChart = (p_i: number, tax: number, insurance: number) => {
    // Only proceed if canvas element is available
    if (!chartRef.current) {
      console.log('Canvas ref not available yet');
      return;
    }

    const chartData = {
      labels: ['Principal & Interest', 'Property Tax', 'Home Insurance'],
      datasets: [{
        data: [p_i, tax, insurance],
        backgroundColor: ['#4299E1', '#63B3ED', '#90CDF4'],
        hoverBackgroundColor: ['#3182CE', '#4299E1', '#63B3ED'],
        borderWidth: 0,
      }]
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      chartInstanceRef.current.update();
    } else {
      try {
        chartInstanceRef.current = new Chart(chartRef.current, {
          type: 'doughnut',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label += formatCurrency(context.parsed);
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    }
  };

  const generateAmortizationSchedule = (principal: number, monthlyRate: number, numPayments: number, monthlyPayment: number) => {
    const schedule = [];
    let remainingBalance = principal;
    
    for (let i = 1; i <= numPayments; i++) {
      const interestForMonth = remainingBalance * monthlyRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      remainingBalance -= principalForMonth;
      
      if (remainingBalance < 0) remainingBalance = 0;

      schedule.push({
        month: i,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: remainingBalance
      });
    }
    
    setAmortizationSchedule(schedule);
  };

  const calculateMortgage = () => {
    if (homePrice <= 0 || downPayment < 0 || loanTerm <= 0 || interestRate <= 0 || downPayment >= homePrice) {
      setTotalMonthlyPayment(0);
      setPrincipalInterest(0);
      setPropertyTax(0);
      setHomeInsurance(0);
      setAmortizationSchedule([]);
      // Use setTimeout to ensure DOM is ready before chart operations
      setTimeout(() => createOrUpdateChart(0, 0, 0), 100);
      return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const monthlyPropertyTax = (homePrice * 0.012) / 12;
    const monthlyHomeInsurance = (homePrice * 0.004) / 12;

    const totalPayment = principalAndInterest + monthlyPropertyTax + monthlyHomeInsurance;
    
    setTotalMonthlyPayment(totalPayment);
    setPrincipalInterest(principalAndInterest);
    setPropertyTax(monthlyPropertyTax);
    setHomeInsurance(monthlyHomeInsurance);
    
    // Use setTimeout to ensure DOM is ready before chart operations
    setTimeout(() => createOrUpdateChart(principalAndInterest, monthlyPropertyTax, monthlyHomeInsurance), 100);
    generateAmortizationSchedule(loanAmount, monthlyInterestRate, numberOfPayments, principalAndInterest);
  };

  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    if (homePrice > 0) {
      const percent = Math.round((value / homePrice) * 100);
      setDownPaymentPercent(percent);
    }
  };

  const handleDownPaymentSliderChange = (percent: number) => {
    setDownPaymentPercent(percent);
    const downPaymentAmount = (homePrice * percent) / 100;
    setDownPayment(Math.round(downPaymentAmount));
  };

  const handleHomePriceChange = (value: number) => {
    setHomePrice(value);
    const downPaymentAmount = (value * downPaymentPercent) / 100;
    setDownPayment(Math.round(downPaymentAmount));
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <section id="financing" className="py-16 relative">
        <div className="relative min-h-[450px] overflow-hidden rounded-lg mx-4 max-w-7xl lg:mx-auto">
          <img 
            src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://dtzulyujzhqiu.cloudfront.net/kvcoredemo14/images/1594658722_YXYBlolB3pNcEOuHmf8KJPPpzrQZtnk99VIhIXq0.jpeg" 
            alt="picture of calculator"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-6">
              <h3 className="text-4xl font-semibold mb-4">Financing Solutions</h3>
              <p className="text-lg">Our partners offer competitive rates and expert guidance to help you navigate your financing options with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Mortgage Calculator</h2>
            <p className="text-lg text-gray-600 mt-2">Estimate your monthly payments for your new home.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side: Input Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                {/* Home Price */}
                <div>
                  <label htmlFor="home-price" className="block text-sm font-medium mb-1 text-gray-700">Home Price</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                    <input 
                      type="number" 
                      id="home-price" 
                      value={homePrice} 
                      onChange={(e) => handleHomePriceChange(parseInt(e.target.value) || 0)}
                      className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all" 
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700">Down Payment</label>
                    <span className="text-sm font-medium text-blue-600">{downPaymentPercent}%</span>
                  </div>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                    <input 
                      type="number" 
                      id="down-payment" 
                      value={downPayment} 
                      onChange={(e) => handleDownPaymentChange(parseInt(e.target.value) || 0)}
                      className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={downPaymentPercent} 
                    onChange={(e) => handleDownPaymentSliderChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <label htmlFor="loan-term" className="block text-sm font-medium mb-1 text-gray-700">Loan Term (Years)</label>
                  <select 
                    id="loan-term" 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="30">30-Year Fixed</option>
                    <option value="20">20-Year Fixed</option>
                    <option value="15">15-Year Fixed</option>
                    <option value="10">10-Year Fixed</option>
                  </select>
                </div>
                
                {/* Interest Rate */}
                <div>
                  <label htmlFor="interest-rate" className="block text-sm font-medium mb-1 text-gray-700">Interest Rate</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
                    <input 
                      type="number" 
                      id="interest-rate" 
                      value={interestRate} 
                      onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                      step="0.01" 
                      className="w-full pr-8 pl-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Results */}
            <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Estimated Payment</h3>
              <div className="text-center mb-6">
                <p className="text-xl text-gray-600">Total Monthly Payment</p>
                <p className="text-5xl font-bold text-blue-600 my-2">{formatCurrency(totalMonthlyPayment)}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & Interest</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(principalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax (Est.)</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(propertyTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Insurance (Est.)</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(homeInsurance)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-48 md:h-full flex items-center justify-center">
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Amortization Schedule</h4>
                <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50">
                      <tr>
                        <th className="p-2 text-left font-semibold text-gray-600">Month</th>
                        <th className="p-2 text-right font-semibold text-gray-600">Principal</th>
                        <th className="p-2 text-right font-semibold text-gray-600">Interest</th>
                        <th className="p-2 text-right font-semibold text-gray-600">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row, index) => (
                        <tr key={row.month} className={`text-right ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                          <td className="p-2 text-center">{row.month}</td>
                          <td className="p-2">{formatCurrency(row.principal)}</td>
                          <td className="p-2">{formatCurrency(row.interest)}</td>
                          <td className="p-2 font-medium">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                      {amortizationSchedule.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center p-4">Enter valid numbers to see amortization schedule.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinancingSection;
