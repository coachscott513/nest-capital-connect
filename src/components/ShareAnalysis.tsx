import React, { useState } from 'react';
import { Share2, Mail, Link, Download, Copy, Facebook, Twitter, MessageSquare, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

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

📱 Call Now: (518) 676-2347
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

Contact Scott Alvarez at (518) 676-2347
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
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;

    // Helper function to add text with wrapping
    const addText = (text: string, fontSize = 10, isBold = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont(undefined, 'bold');
      } else {
        pdf.setFont(undefined, 'normal');
      }
      
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      if (currentY + lines.length * lineHeight > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        currentY = margin;
      }
      
      pdf.text(lines, margin, currentY);
      currentY += lines.length * lineHeight + 2;
    };

    // Title
    addText('PROPERTY INVESTMENT ANALYSIS', 16, true);
    addText(propertyAddress, 14, true);
    currentY += 5;

    // Investment Overview
    addText('INVESTMENT OVERVIEW', 12, true);
    addText(`Purchase Price: $${formatNumber(purchasePrice)}`);
    addText(`After Repair Value (ARV): $${formatNumber(arv)}`);
    addText(`Monthly Rental Income: $${formatNumber(estimatedTotalRent)}`);
    currentY += 5;

    // Fix & Flip Analysis
    addText('FIX & FLIP ANALYSIS', 12, true);
    addText(`Net Profit: $${formatNumber(results.flipNetProfit)}`);
    addText(`Return on Investment: ${formatNumber(results.flipROI)}%`);
    addText(`Project Total Cost: $${formatNumber(results.flipTotalCost)}`);
    currentY += 5;

    // Buy & Hold Rental
    addText('BUY & HOLD RENTAL', 12, true);
    addText(`Monthly Cash Flow: $${formatNumber(results.rentalCashFlow)}`);
    addText(`Annual Cash Flow: $${formatNumber(results.rentalAnnualCashFlow)}`);
    addText(`Cash-on-Cash Return: ${formatNumber(results.rentalCoC)}%`);
    addText(`Cap Rate: ${formatNumber(results.rentalCapRate)}%`);
    currentY += 5;

    // BRRRR Strategy
    addText('BRRRR STRATEGY', 12, true);
    addText(`Post-Refi Cash-on-Cash: ${formatNumber(results.brrrrPostRefiCoC)}%`);
    addText(`Cash Left in Deal: $${formatNumber(results.brrrrCashLeft)}`);
    addText(`Cash Pulled Out: $${formatNumber(results.brrrrCashOut)}`);
    currentY += 10;

    // Contact Information
    addText('CAPITAL DISTRICT NEST', 14, true);
    addText('Scott Alvarez - Investment Property Specialist', 12, true);
    addText('RE/MAX Solutions', 12);
    currentY += 5;
    
    addText('Contact Information:', 11, true);
    addText('Phone: (518) 676-2347');
    addText('Email: scottalvarez@remax.net');
    addText('Serving Albany, Troy, Schenectady & Saratoga Springs');
    currentY += 5;

    addText('Social Media:', 11, true);
    addText('Facebook: @scottalvarez.remax');
    addText('Instagram: @scottalvarez.remax');
    addText('LinkedIn: /in/scottalvarez');
    addText('YouTube: @scottalvarez');
    currentY += 5;

    addText('SPECIALIZING IN:', 11, true);
    addText('✓ Multi-Unit Investment Properties');
    addText('✓ Fix & Flip Projects with Proven Loan Programs');
    addText('✓ Rental Property Management & APT Listings');
    addText('✓ Investment Property Financing Solutions');
    currentY += 5;

    addText('Expert Analysis | Proven Results | 7 Days a Week Service', 10, true);
    currentY += 5;
    
    addText('*This analysis is for informational purposes only. Consult with qualified professionals before making investment decisions.', 8);

    // Save the PDF
    const fileName = `investment-analysis-${propertyAddress.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    pdf.save(fileName);
    
    toast({
      title: "PDF Downloaded!",
      description: "Investment analysis saved as PDF",
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
            <div className="text-sm text-gray-600">Save as PDF file</div>
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
            <p className="mb-1">📱 (518) 676-2347 | 📧 scottalvarez@remax.net</p>
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