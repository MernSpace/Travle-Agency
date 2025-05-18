import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo isLight={true} />
            <p className="mt-4 text-neutral-300">
              Journeys Beyond Boundaries - creating unforgettable travel experiences since 2015. We specialize in crafting personalized adventures that turn your travel dreams into reality.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a href="https://facebook.com" className="text-neutral-300 hover:text-secondary-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-neutral-300 hover:text-secondary-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-neutral-300 hover:text-secondary-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-neutral-300 hover:text-secondary-500 transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li><Link to="/search?region=europe" className="text-neutral-300 hover:text-white transition-colors">Europe</Link></li>
              <li><Link to="/search?region=asia" className="text-neutral-300 hover:text-white transition-colors">Asia</Link></li>
              <li><Link to="/search?region=americas" className="text-neutral-300 hover:text-white transition-colors">Americas</Link></li>
              <li><Link to="/search?region=africa" className="text-neutral-300 hover:text-white transition-colors">Africa</Link></li>
              <li><Link to="/search?region=oceania" className="text-neutral-300 hover:text-white transition-colors">Oceania</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/blog" className="text-neutral-300 hover:text-white transition-colors">Travel Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mt-1 mr-2 flex-shrink-0 text-secondary-500" />
                <span className="text-neutral-300">contact@horizonvoyages.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mt-1 mr-2 flex-shrink-0 text-secondary-500" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-heading mb-2">Newsletter</h5>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 bg-neutral-800 text-white placeholder-neutral-500 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-secondary-500 w-full" />
                <button className="bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Horizon Voyages. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link to="/payment" className="text-sm text-neutral-400 hover:text-white transition-colors">Payment Methods</Link>
            <span className="text-neutral-600">|</span>
            <Link to="/sitemap" className="text-sm text-neutral-400 hover:text-white transition-colors">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;