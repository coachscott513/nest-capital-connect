import React from 'react';
import { Shield, Eye, Cookie, Database, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="w-8 h-8 mr-3 text-blue-600" />
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          Last updated: January 10, 2025
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-2 text-blue-600" />
            Information We Collect
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Personal Information</h3>
            <ul className="space-y-2">
              <li>• Name, email address, and phone number</li>
              <li>• Property preferences and investment criteria</li>
              <li>• Location and geographic preferences</li>
              <li>• Communication history and inquiries</li>
            </ul>
            
            <h3 className="font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <ul className="space-y-2">
              <li>• IP address and browser information</li>
              <li>• Pages visited and time spent on site</li>
              <li>• Device type and operating system</li>
              <li>• Referral sources and search terms</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2 text-blue-600" />
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Service Delivery</h3>
              <ul className="space-y-2 text-sm">
                <li>• Matching you with suitable properties</li>
                <li>• Providing investment analysis and consultation</li>
                <li>• Scheduling property viewings and meetings</li>
                <li>• Sending property alerts and market updates</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Marketing & Analytics</h3>
              <ul className="space-y-2 text-sm">
                <li>• Improving our website and services</li>
                <li>• Personalizing your experience</li>
                <li>• Sending relevant marketing communications</li>
                <li>• Analyzing market trends and user behavior</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Cookie className="w-6 h-6 mr-2 text-blue-600" />
            Cookies and Tracking Technologies
          </h2>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">We Use Cookies For:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Essential Cookies</h4>
                <p className="text-sm text-gray-600">Required for basic site functionality and security</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analytics Cookies</h4>
                <p className="text-sm text-gray-600">Help us understand how visitors use our site</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Marketing Cookies</h4>
                <p className="text-sm text-gray-600">Used to deliver relevant ads and track campaigns</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded border-l-4 border-blue-500">
              <h4 className="font-semibold mb-2">Facebook Pixel and Advertising</h4>
              <p className="text-sm text-gray-700">
                This website uses the Facebook Pixel, a tracking code that allows us to measure the effectiveness of our advertising by understanding the actions people take on our website. The Facebook Pixel collects information about your visit, including:
              </p>
              <ul className="text-sm text-gray-700 mt-2 ml-4 list-disc">
                <li>Pages you visit on our site</li>
                <li>Actions you take (such as form submissions or button clicks)</li>
                <li>Device information and IP address</li>
                <li>Browser and operating system details</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2">
                Facebook uses this information to:
              </p>
              <ul className="text-sm text-gray-700 mt-2 ml-4 list-disc">
                <li>Show you personalized ads on Facebook and Instagram based on your interests</li>
                <li>Measure and optimize our advertising campaigns</li>
                <li>Build custom audiences for targeted marketing</li>
                <li>Track conversions and attribution from our ads</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2">
                You can opt out of personalized Facebook ads by adjusting your <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook Ad Preferences</a> or by using the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Digital Advertising Alliance opt-out tool</a>.
              </p>
            </div>

            <div className="mt-4 p-4 bg-white rounded border-l-4 border-green-500">
              <h4 className="font-semibold mb-2">Google AdSense and Analytics</h4>
              <p className="text-sm text-gray-700">
                This website uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to this site and other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                We also use Google Analytics to analyze website traffic and improve user experience. Google Analytics may collect information about your use of this website.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-semibold">Meta (Facebook) Platforms</h3>
              <p className="text-sm text-gray-600 mt-2">
                Facebook Pixel, Facebook Ads, Instagram Ads - for advertising, remarketing, and conversion tracking. 
                Meta may use cookies and similar technologies to track your activity across websites and apps for advertising purposes.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Learn more about <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Meta's Privacy Policy</a>.
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-semibold">Google Services</h3>
              <p className="text-sm text-gray-600 mt-2">
                Google Analytics, Google AdSense, Google Tag Manager - for website analytics and advertising
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-semibold">Supabase</h3>
              <p className="text-sm text-gray-600 mt-2">
                Database and authentication services - for secure data storage and user management
              </p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="font-semibold">Email Services</h3>
              <p className="text-sm text-gray-600 mt-2">
                For sending communications, property alerts, and marketing emails
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights and Choices</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Data Rights</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Delete your information</li>
                  <li>• Port your data to another service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Marketing Preferences</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Unsubscribe from emails</li>
                  <li>• Opt out of personalized ads</li>
                  <li>• Disable non-essential cookies</li>
                  <li>• Control notification settings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-medium">Encryption</h4>
                <p className="text-sm text-gray-600">Data encrypted in transit and at rest</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-medium">Secure Storage</h4>
                <p className="text-sm text-gray-600">Industry-standard data centers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-medium">Access Control</h4>
                <p className="text-sm text-gray-600">Limited access on need-to-know basis</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Mail className="w-6 h-6 mr-2 text-blue-600" />
            Contact Information
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Capital District Nest</strong></p>
              <p>Email: privacy@capitaldistrict.com</p>
              <p>Phone: +1-518-522-7265</p>
              <p>Address: Capital District, Albany, NY</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </section>

        <footer className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            This Privacy Policy is compliant with GDPR, CCPA, Google AdSense, and Meta advertising requirements. 
            By using our website, you consent to the collection and use of information as described in this policy, including the use of Facebook Pixel for advertising and analytics purposes.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;