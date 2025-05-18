import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg md:max-w-xl md:mx-auto md:mb-6 md:rounded-lg overflow-hidden z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-lg">Cookie Consent</h3>
              <button 
                onClick={() => setShowConsent(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept," you consent to our use of cookies.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button onClick={acceptCookies} className="btn btn-primary">
                Accept All Cookies
              </button>
              <button 
                onClick={() => setShowConsent(false)} 
                className="btn btn-outline"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;