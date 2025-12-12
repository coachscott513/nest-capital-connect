import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Privacy Policy | Capital District Nest</title>
        <meta 
          name="description" 
          content="Learn how Capital District Nest collects, uses and protects your information when you request reports or connect with our investment team." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/privacy-policy" />
      </Helmet>
      
      <div className="bg-background min-h-screen py-16 px-[5%]">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8"><strong>Last Updated: December 11, 2025</strong></p>
            
            <p className="text-foreground mb-6">
              Capital District Nest ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, submit a lead form, request an Intelligence Report, or communicate with us by phone, text, email, or social platforms.
            </p>
            
            <p className="text-foreground mb-8">
              By using our website or submitting your information, you agree to the terms of this Privacy Policy.
            </p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-foreground mb-4">We may collect the following information:</p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Information You Provide Directly</h3>
            <ul className="text-foreground space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property address submitted for analysis</li>
              <li>Any additional details you choose to share</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-foreground mb-2">When visiting our website, we may collect:</p>
            <ul className="text-foreground space-y-2 mb-6">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Cookies and analytics data</li>
            </ul>

            <p className="text-primary font-medium mb-8">
              We never collect financial account numbers, Social Security numbers, or sensitive personal data.
            </p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-foreground mb-4">We use your information for the following purposes:</p>
            <ul className="text-foreground space-y-2 mb-6">
              <li>To prepare and deliver your <strong>Intelligence Report</strong> or property analysis</li>
              <li>To communicate with you regarding real estate opportunities</li>
              <li>To respond to your questions or messages</li>
              <li>To send follow-up information related to your request</li>
              <li>To improve our website, services, and marketing performance</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>

            <p className="text-primary font-medium mb-2">We do <strong>not</strong> sell your data.</p>
            <p className="text-primary font-medium mb-8">We do <strong>not</strong> share your information with third parties for their own marketing purposes.</p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. How Your Information Is Shared</h2>
            <p className="text-foreground mb-4">We may share your information only in the following situations:</p>
            <ul className="text-foreground space-y-2 mb-6">
              <li><strong>With service providers</strong> who help us operate our website, CRM systems, or marketing tools</li>
              <li><strong>With real estate professionals</strong> within Capital District Nest or RE/MAX when necessary to assist you</li>
              <li><strong>When required by law</strong>, subpoena, or regulatory inquiry</li>
              <li><strong>With your permission</strong>, if you ask us to connect you to a lender, attorney, inspector, or vendor</li>
            </ul>

            <p className="text-primary font-medium mb-8">We never sell or rent your personal data.</p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Text Messaging (SMS) Policy</h2>
            <p className="text-foreground mb-2">By submitting your phone number, you agree that Capital District Nest may contact you by phone or text message regarding your inquiry.</p>
            <p className="text-foreground mb-2">Message frequency may vary.</p>
            <p className="text-foreground mb-2">Standard message and data rates may apply.</p>
            <p className="text-foreground mb-8">You may opt out at any time by replying <strong>STOP</strong>.</p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Data Security</h2>
            <p className="text-foreground mb-8">
              We take reasonable administrative and technical measures to protect your information, including encryption, access controls, and secure data storage. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute protection.
            </p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Your Privacy Choices</h2>
            <p className="text-foreground mb-4">You may:</p>
            <ul className="text-foreground space-y-2 mb-6">
              <li>Request access to your personal data</li>
              <li>Request corrections to your information</li>
              <li>Request deletion of your data (unless required for legal purposes)</li>
              <li>Opt out of text or email communications at any time</li>
            </ul>

            <p className="text-foreground mb-2">To make a request, contact:</p>
            <p className="text-foreground mb-1"><strong>Email:</strong> <a href="mailto:scott@capitaldistrictnest.com" className="text-primary hover:underline">scott@capitaldistrictnest.com</a></p>
            <p className="text-foreground mb-8"><strong>Phone:</strong> <a href="tel:+15186762347" className="text-primary hover:underline">518-676-2347</a></p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Children's Privacy</h2>
            <p className="text-foreground mb-8">
              We do not knowingly collect or market to individuals under the age of 18.
            </p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Updates to This Policy</h2>
            <p className="text-foreground mb-8">
              We may update this Privacy Policy periodically. Changes will be posted on this page with a revised "Last Updated" date.
            </p>

            <hr className="border-border my-8" />

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
            <p className="text-foreground mb-4">
              If you have questions about this Privacy Policy or our data practices, contact:
            </p>
            <div className="text-foreground space-y-1">
              <p><strong>Capital District Nest</strong></p>
              <p>Albany, NY</p>
              <p><strong>Email:</strong> <a href="mailto:scott@capitaldistrictnest.com" className="text-primary hover:underline">scott@capitaldistrictnest.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+15186762347" className="text-primary hover:underline">518-676-2347</a></p>
            </div>
          </article>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;
