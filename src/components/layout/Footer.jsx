import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">HealthConnect</h3>
            <p className="text-gray-600 text-sm">
              Connecting patients with healthcare professionals for home visits and telehealth services.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-primary text-sm">Services</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-primary text-sm">How It Works</Link></li>
              <li><Link to="/find-hospitals" className="text-gray-600 hover:text-primary text-sm">Find Hospitals</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Patients
            </h3>
            <ul className="space-y-2">
              <li><Link to="/request-appointment" className="text-gray-600 hover:text-primary text-sm">Request Appointment</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-primary text-sm">Login</Link></li>
              <li><Link to="/signup" className="text-gray-600 hover:text-primary text-sm">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Doctors
            </h3>
            <ul className="space-y-2">
              <li><Link to="/doctor/login" className="text-gray-600 hover:text-primary text-sm">Doctor Login</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Join Our Network</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {/* Add social links if you want */}
          </div>
          <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
            &copy; {currentYear} HealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
