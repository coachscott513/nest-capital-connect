
import React from 'react';
import { Link } from 'react-router-dom';

const MissionSection = () => {
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-slate-800">
          Our Mission: Building Relationships, Building Futures
        </h2>
        <div className="text-lg leading-relaxed space-y-6">
          <p>
            At Capital District Nest, we believe the rental market is more than just transactions; it's about building lasting relationships. With extensive experience in real estate and property management, our mission is to empower both renters and property owners in the Capital District.
          </p>
          <p>
            For <strong>renters</strong>, we offer a streamlined, transparent path to finding quality <Link to="/rentals" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">multi-unit homes</Link>, coupled with invaluable guidance and resources for when they're ready to make the leap into <Link to="/#investment-properties" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">homeownership and investment opportunities</Link>.
          </p>
          <p>
            For <strong>property owners</strong>, we provide a cost-effective, technology-driven solution for <Link to="/#investment-properties" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">listing investment properties</Link> and vetting ideal tenants, with the added benefit of a trusted partner ready to facilitate <Link to="/#rehab-properties" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">rehab projects</Link> and future property sales. Whether you're exploring <Link to="/albany-rentals" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Albany</Link>, <Link to="/troy-rentals" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Troy</Link>, <Link to="/schenectady-rentals" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Schenectady</Link>, or <Link to="/saratoga-rentals" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">Saratoga Springs</Link>, we're here to dominate the market by creating a win-win ecosystem where trust, technology, and transparency lead the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
