import React, { useState } from 'react';
import { Share2, Mail, Link, Download, Copy, Facebook, Twitter, MessageSquare, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface ShareAnalysisProps {
  results: AnalysisResults;
  propertyAddress: string;
  purchasePrice: number;
  arv: number;
  estimatedTotalRent: number;
}

const ShareAnalysis: React.FC<ShareAnalysisProps> = ({
  results,
  propertyAddress,
  purchasePrice,
  arv,
  estimatedTotalRent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (typeof num !== 'number' || isNaN(num)) return 'N/A';
    if (!isFinite(num)) return 'Infinite';
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const generateShareableContent = () => {
    const summary = `
🏠 PROPERTY INVESTMENT ANALYSIS
${propertyAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 INVESTMENT OVERVIEW
• Purchase Price: $${formatNumber(purchasePrice)}
• After Repair Value (ARV): $${formatNumber(arv)}
• Monthly Rental Income: $${formatNumber(estimatedTotalRent)}

📊 INVESTMENT STRATEGIES - KEY METRICS

🔄 FIX & FLIP ANALYSIS
• Net Profit: $${formatNumber(results.flipNetProfit)}
• Return on Investment: ${formatNumber(results.flipROI)}%
• Project Total Cost: $${formatNumber(results.flipTotalCost)}

🏠 BUY & HOLD RENTAL
• Monthly Cash Flow: $${formatNumber(results.rentalCashFlow)}
• Annual Cash Flow: $${formatNumber(results.rentalAnnualCashFlow)}
• Cash-on-Cash Return: ${formatNumber(results.rentalCoC)}%
• Cap Rate: ${formatNumber(results.rentalCapRate)}%

🔁 BRRRR STRATEGY
• Post-Refi Cash-on-Cash: ${formatNumber(results.brrrrPostRefiCoC)}%
• Cash Left in Deal: $${formatNumber(results.brrrrCashLeft)}
• Cash Pulled Out: $${formatNumber(results.brrrrCashOut)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 CAPITAL DISTRICT NEST
Scott Alvarez - Investment Property Specialist
RE/MAX Solutions

📱 Call Now: (518) 522-7265
📧 Email: scottalvarez@remax.net
🌐 Serving Albany, Troy, Schenectady & Saratoga Springs

🔗 Social Media:
Facebook: @scottalvarez.remax
Instagram: @scottalvarez.remax
LinkedIn: /in/scottalvarez
YouTube: @scottalvarez

💼 SPECIALIZING IN:
✓ Multi-Unit Investment Properties
✓ Fix & Flip Projects with Proven Loan Programs
✓ Rental Property Management & APT Listings
✓ Investment Property Financing Solutions

📈 Expert Analysis | Proven Results | 7 Days a Week Service

*This analysis is for informational purposes only. Consult with qualified professionals before making investment decisions.*
    `.trim();

    return summary;
  };

  const handleCopyLink = async () => {
    const analysisData = {
      propertyAddress,
      purchasePrice,
      arv,
      estimatedTotalRent,
      results
    };
    
    const encodedData = btoa(JSON.stringify(analysisData));
    const shareableUrl = `${window.location.origin}/?analysis=${encodedData}`;
    
    try {
      await navigator.clipboard.writeText(shareableUrl);
      toast({
        title: "Link Copied!",
        description: "Shareable analysis link copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: "Copy Failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleCopyText = async () => {
    const content = generateShareableContent();
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Analysis Copied!",
        description: "Analysis summary copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy text:', err);
      toast({
        title: "Copy Failed",
        description: "Unable to copy analysis to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleEmailShare = () => {
    const subject = `Investment Analysis - ${propertyAddress}`;
    const body = generateShareableContent();
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram') => {
    const shortContent = `🏠 Investment Analysis: ${propertyAddress}
💰 Flip ROI: ${formatNumber(results.flipROI)}% | 📈 Rental CoC: ${formatNumber(results.rentalCoC)}%
🏠 Monthly Cash Flow: $${formatNumber(results.rentalCashFlow)}

Contact Scott Alvarez at (518) 522-7265
#RealEstate #Investment #CapitalDistrict #Albany`;
    
    const url = window.location.href;
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shortContent)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortContent)}&url=${encodeURIComponent(url)}&hashtags=RealEstate,Investment,CapitalDistrict`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shortContent)}`;
    } else if (platform === 'instagram') {
      // Instagram doesn't support direct sharing, so copy to clipboard
      navigator.clipboard.writeText(shortContent + '\n\n' + url).then(() => {
        toast({
          title: "Content Copied!",
          description: "Content copied to clipboard. Paste in Instagram story or post.",
        });
      });
      return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleDownloadPDF = () => {
    // Create a simple text version for download
    const content = generateShareableContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investment-analysis-${propertyAddress.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Analysis Downloaded!",
      description: "Analysis summary saved to your device",
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Analysis</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Share2 className="w-6 h-6 mr-2 text-blue-600" />
          Share Analysis
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Share */}
        <button
          onClick={handleEmailShare}
          className="flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Mail className="w-8 h-8 text-red-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Email</div>
            <div className="text-sm text-gray-600">Send via email</div>
          </div>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Link className="w-8 h-8 text-blue-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Copy Link</div>
            <div className="text-sm text-gray-600">Share shareable URL</div>
          </div>
        </button>

        {/* Copy Text */}
        <button
          onClick={handleCopyText}
          className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Copy className="w-8 h-8 text-green-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Copy Summary</div>
            <div className="text-sm text-gray-600">Copy analysis text</div>
          </div>
        </button>

        {/* Download */}
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <Download className="w-8 h-8 text-purple-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Download</div>
            <div className="text-sm text-gray-600">Save as text file</div>
          </div>
        </button>

        {/* Facebook Share */}
        <button
          onClick={() => handleSocialShare('facebook')}
          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Facebook className="w-8 h-8 text-blue-800" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Facebook</div>
            <div className="text-sm text-gray-600">Share on Facebook</div>
          </div>
        </button>

        {/* Twitter Share */}
        <button
          onClick={() => handleSocialShare('twitter')}
          className="flex items-center space-x-3 p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
        >
          <Twitter className="w-8 h-8 text-sky-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Twitter</div>
            <div className="text-sm text-gray-600">Share on Twitter</div>
          </div>
        </button>

        {/* LinkedIn Share */}
        <button
          onClick={() => handleSocialShare('linkedin')}
          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Linkedin className="w-8 h-8 text-blue-700" />
          <div className="text-left">
            <div className="font-medium text-gray-800">LinkedIn</div>
            <div className="text-sm text-gray-600">Share on LinkedIn</div>
          </div>
        </button>

        {/* Instagram Share */}
        <button
          onClick={() => handleSocialShare('instagram')}
          className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg transition-colors"
        >
          <Instagram className="w-8 h-8 text-purple-600" />
          <div className="text-left">
            <div className="font-medium text-gray-800">Instagram</div>
            <div className="text-sm text-gray-600">Copy for Instagram</div>
          </div>
        </button>
      </div>

      {/* Brand Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-lg p-4 text-white text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="bg-white rounded px-3 py-1">
              <span className="text-red-600 font-bold">RE/MAX</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Capital District Nest</h4>
              <p className="text-sm opacity-90">Scott Alvarez - Investment Property Specialist</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-1">📱 (518) 522-7265 | 📧 scottalvarez@remax.net</p>
            <p className="opacity-90">Serving Albany, Troy, Schenectady & Saratoga Springs</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Preview:</h4>
          <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans">{generateShareableContent()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAnalysis;