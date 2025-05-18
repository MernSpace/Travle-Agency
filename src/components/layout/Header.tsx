import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Logo from '../ui/Logo';
import SearchBar from '../search/SearchBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = classNames(
    'fixed top-0 left-0 w-full z-50 transition-all duration-300',
    {
      'bg-white shadow-md py-3': isScrolled || mobileMenuOpen || searchOpen,
      'bg-transparent py-5': !isScrolled && !mobileMenuOpen && !searchOpen,
    }
  );

  const navLinkClasses = classNames(
    'text-sm font-heading font-semibold transition-colors duration-200',
    {
      'text-white hover:text-secondary-400': !isScrolled && !mobileMenuOpen && !searchOpen,
      'text-neutral-800 hover:text-primary-500': isScrolled || mobileMenuOpen || searchOpen,
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="relative z-10">
          <Logo isLight={!isScrolled && !mobileMenuOpen && !searchOpen} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <button className={`${navLinkClasses} flex items-center`}>
              Destinations <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block">
              <div className="bg-white rounded-card shadow-card p-4 grid gap-2">
                <Link to="/search?region=europe" className="hover:text-primary-500 transition-colors">Europe</Link>
                <Link to="/search?region=asia" className="hover:text-primary-500 transition-colors">Asia</Link>
                <Link to="/search?region=americas" className="hover:text-primary-500 transition-colors">Americas</Link>
                <Link to="/search?region=africa" className="hover:text-primary-500 transition-colors">Africa</Link>
                <Link to="/search?region=oceania" className="hover:text-primary-500 transition-colors">Oceania</Link>
                <div className="border-t border-neutral-200 mt-2 pt-2">
                  <Link to="/search" className="text-primary-500 font-semibold">View All Destinations</Link>
                </div>
              </div>
            </div>
          </div>
          <Link to="/search?type=package" className={navLinkClasses}>Travel Packages</Link>
          <Link to="/search?type=experience" className={navLinkClasses}>Experiences</Link>
          <Link to="/about" className={navLinkClasses}>About Us</Link>
          <Link to="/blog" className={navLinkClasses}>Travel Blog</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className={`${navLinkClasses} flex items-center`}>
            <Search size={20} />
          </button>
          
          <button className={`${navLinkClasses} flex items-center`}>
            <Globe size={20} />
          </button>
          
          <Link to="/account" className={navLinkClasses}>
            <User size={20} />
          </Link>
          
          <Link to="/booking/new" className="btn btn-primary">Book Now</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button onClick={() => setSearchOpen(!searchOpen)} className={`${navLinkClasses} flex items-center`}>
            <Search size={20} />
          </button>
          
          <button 
            className={navLinkClasses}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full Screen Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full bg-white shadow-md p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SearchBar onClose={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container py-6 flex flex-col space-y-4">
              <div className="border-b border-neutral-200 pb-2">
                <button className="flex items-center justify-between w-full py-2 text-neutral-800 font-heading font-semibold">
                  Destinations <ChevronDown size={16} />
                </button>
                <div className="pl-4 pt-2 pb-4 grid gap-2">
                  <Link to="/search?region=europe" className="text-neutral-600 hover:text-primary-500">Europe</Link>
                  <Link to="/search?region=asia" className="text-neutral-600 hover:text-primary-500">Asia</Link>
                  <Link to="/search?region=americas" className="text-neutral-600 hover:text-primary-500">Americas</Link>
                  <Link to="/search?region=africa" className="text-neutral-600 hover:text-primary-500">Africa</Link>
                  <Link to="/search?region=oceania" className="text-neutral-600 hover:text-primary-500">Oceania</Link>
                </div>
              </div>
              <Link to="/search?type=package" className="py-2 text-neutral-800 font-heading font-semibold">Travel Packages</Link>
              <Link to="/search?type=experience" className="py-2 text-neutral-800 font-heading font-semibold">Experiences</Link>
              <Link to="/about" className="py-2 text-neutral-800 font-heading font-semibold">About Us</Link>
              <Link to="/blog" className="py-2 text-neutral-800 font-heading font-semibold">Travel Blog</Link>
              <div className="border-t border-neutral-200 pt-4 flex flex-col space-y-4">
                <Link to="/account" className="flex items-center text-neutral-800 font-heading font-semibold">
                  <User size={18} className="mr-2" /> My Account
                </Link>
                <Link to="/booking/new" className="btn btn-primary w-full">Book Now</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;