import React, { useState } from 'react';
import { Share2, Mail, Link, Download, Copy, Facebook, Twitter, MessageSquare } from 'lucide-react';
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
🏠 Property Investment Analysis - ${propertyAddress}

💰 Investment Summary:
• Purchase Price: $${formatNumber(purchasePrice)}
• After Repair Value: $${formatNumber(arv)}
• Monthly Rent: $${formatNumber(estimatedTotalRent)}

📊 Key Metrics:
• Flip ROI: ${formatNumber(results.flipROI)}%
• Rental Cash-on-Cash: ${formatNumber(results.rentalCoC)}%
• BRRRR Strategy CoC: ${formatNumber(results.brrrrPostRefiCoC)}%
• Monthly Cash Flow: $${formatNumber(results.rentalCashFlow)}
• Cap Rate: ${formatNumber(results.rentalCapRate)}%

💵 Financial Breakdown:
• Net Flip Profit: $${formatNumber(results.flipNetProfit)}
• Annual Cash Flow: $${formatNumber(results.rentalAnnualCashFlow)}
• Cash Left in BRRRR: $${formatNumber(results.brrrrCashLeft)}

📈 Analysis by Capital District Nest
Your Investment Property Specialists in Albany, Troy, Schenectady & Saratoga Springs NY
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

  const handleSocialShare = (platform: 'facebook' | 'twitter') => {
    const content = `Check out this property investment analysis for ${propertyAddress}! 
💰 Flip ROI: ${formatNumber(results.flipROI)}% 
📈 Rental CoC: ${formatNumber(results.rentalCoC)}% 
🏠 Monthly Cash Flow: $${formatNumber(results.rentalCashFlow)}`;
    
    const url = window.location.href;
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(content)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(url)}`;
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