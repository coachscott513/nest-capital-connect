
const Footer = () => {
  const capitalDistrictTowns = [
    // Albany County
    "Albany", "Altamont", "Berne", "Bethlehem", "Cohoes", "Colonie", "Green Island", "Guilderland", "Knox", "Menands", "New Scotland", "Rensselaerville", "Watervliet", "Westerlo",
    // Rensselaer County  
    "Troy", "Berlin", "Brunswick", "East Greenbush", "Grafton", "Hoosick", "Lansingburgh", "Nassau", "North Greenbush", "Petersburgh", "Pittstown", "Poestenkill", "Rensselaer", "Sand Lake", "Schaghticoke", "Schodack", "Stephentown",
    // Saratoga County
    "Saratoga Springs", "Ballston", "Ballston Spa", "Charlton", "Clifton Park", "Corinth", "Day", "Edinburgh", "Galway", "Greenfield", "Hadley", "Halfmoon", "Malta", "Mechanicville", "Milton", "Moreau", "Northumberland", "Providence", "Saratoga", "Stillwater", "Waterford", "Wilton",
    // Schenectady County
    "Schenectady", "Duanesburg", "Glenville", "Niskayuna", "Princetown", "Rotterdam", "Scotia"
  ];

  return (
    <footer className="bg-slate-800 text-white py-8 px-4 text-center">
      <div className="max-w-7xl mx-auto">
        <p>&copy; 2025 Capital District Nest. All rights reserved.</p>
        <div className="mt-4 text-sm space-x-4">
          <a href="/privacy-policy" className="hover:underline transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:underline transition-colors">Terms of Service</a>
          <a href="/investment-properties" className="hover:underline transition-colors">Investment Properties</a>
          <a href="/rentals" className="hover:underline transition-colors">Rentals</a>
          <a href="/financing" className="hover:underline transition-colors">Financing</a>
        </div>
        
        <div className="mt-6 border-t border-slate-700 pt-4">
          <p className="text-xs text-slate-400 mb-2">Serving the Capital District Area:</p>
          <div className="text-xs text-slate-500 leading-relaxed max-w-5xl mx-auto">
            {capitalDistrictTowns.join(" • ")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
