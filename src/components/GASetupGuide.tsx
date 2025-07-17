import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Target, Phone, Mail, FileDown, Calendar, MousePointer } from 'lucide-react';

const GASetupGuide = () => {
  const keyEvents = [
    {
      name: 'generate_lead',
      icon: <Target className="w-5 h-5" />,
      description: 'Lead form submissions (Contact, Investment, Rental forms)',
      value: '$100',
      priority: 'High',
      color: 'bg-green-100 text-green-800',
    },
    {
      name: 'phone_call_intent',
      icon: <Phone className="w-5 h-5" />,
      description: 'Phone number clicks (mobile & desktop)',
      value: '$50',
      priority: 'High',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'email_intent',
      icon: <Mail className="w-5 h-5" />,
      description: 'Email address clicks',
      value: '$25',
      priority: 'Medium',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      name: 'property_inquiry',
      icon: <MousePointer className="w-5 h-5" />,
      description: 'Property-specific inquiries and interest',
      value: '$75',
      priority: 'High',
      color: 'bg-orange-100 text-orange-800',
    },
    {
      name: 'schedule_consultation',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Calendar bookings and consultation requests',
      value: '$150',
      priority: 'Very High',
      color: 'bg-red-100 text-red-800',
    },
    {
      name: 'document_download',
      icon: <FileDown className="w-5 h-5" />,
      description: 'Market analysis, guides, and report downloads',
      value: '$20',
      priority: 'Medium',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      name: 'high_engagement',
      icon: <Target className="w-5 h-5" />,
      description: 'Users spending 60+ seconds on key pages',
      value: '$10',
      priority: 'Medium',
      color: 'bg-gray-100 text-gray-800',
    },
  ];

  const setupSteps = [
    {
      title: 'Install Google Analytics 4',
      description: 'Add GA4 tracking code to your website',
      details: [
        'Go to Google Analytics and create a GA4 property',
        'Copy your GA4 Measurement ID (G-XXXXXXXXXX)',
        'Add the gtag code to your website head section',
        'Replace "GA_TRACKING_ID" in AnalyticsTracker.tsx with your actual ID'
      ]
    },
    {
      title: 'Configure Key Events',
      description: 'Set up conversion tracking for lead generation',
      details: [
        'Go to Admin > Events in your GA4 property',
        'Click "Create Event" for each key event below',
        'Mark important events as "Key Events" (conversions)',
        'Assign monetary values to track ROI effectively'
      ]
    },
    {
      title: 'Set Up Enhanced Tracking',
      description: 'Enable detailed user interaction tracking',
      details: [
        'Enable Enhanced Ecommerce (for lead value tracking)',
        'Set up custom dimensions for property types and locations',
        'Configure audience segments for high-value users',
        'Set up goal funnels to track user journey to conversion'
      ]
    },
    {
      title: 'Create Conversion Reports',
      description: 'Build dashboards to monitor performance',
      details: [
        'Create custom reports for lead generation metrics',
        'Set up automated email reports for key stakeholders',
        'Configure alerts for conversion drops or spikes',
        'Link GA4 to Google Data Studio for advanced reporting'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Google Analytics 4 Conversion Tracking Setup
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete guide to set up comprehensive conversion tracking for your real estate website. 
          Track every lead, phone call, and high-value interaction.
        </p>
      </div>

      {/* Key Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Key Events to Track (Conversions)
          </CardTitle>
          <CardDescription>
            These events are automatically tracked by your website. Configure them as "Key Events" in GA4.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {keyEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-primary">{event.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={event.color}>{event.priority}</Badge>
                  <span className="font-semibold text-green-600">{event.value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold text-gray-900">Setup Instructions</h2>
        {setupSteps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {step.title}
              </CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>GA4 Tracking Code Template</CardTitle>
          <CardDescription>Add this code to your website's head section</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
          </pre>
          <p className="text-sm text-gray-600 mt-2">
            Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
          </p>
        </CardContent>
      </Card>

      {/* Current Implementation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">✅ Already Implemented</CardTitle>
          <CardDescription>Your website already includes these tracking features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Automatic Event Tracking</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lead form submissions</li>
                <li>• Phone and email clicks</li>
                <li>• Document downloads</li>
                <li>• High engagement tracking</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Enhanced Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Property inquiry tracking</li>
                <li>• Location-based segmentation</li>
                <li>• User engagement metrics</li>
                <li>• Conversion value assignment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="text-primary">🚀 Next Steps</CardTitle>
          <CardDescription>What to do after setting up GA4 tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Immediate (0-7 days)</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>1. Install GA4 tracking code</li>
                <li>2. Configure the 7 key events as conversions</li>
                <li>3. Test tracking with Google Tag Assistant</li>
                <li>4. Set up basic conversion reports</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Short-term (1-4 weeks)</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Create custom audiences for remarketing</li>
                <li>• Set up automated alerts for conversion changes</li>
                <li>• Build comprehensive lead tracking dashboard</li>
                <li>• Integrate with Google Ads for enhanced attribution</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Long-term (1+ months)</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Analyze conversion patterns and optimize high-performing pages</li>
                <li>• A/B test lead forms and call-to-action elements</li>
                <li>• Create predictive audiences based on engagement patterns</li>
                <li>• Implement advanced attribution modeling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GASetupGuide;