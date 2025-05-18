import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would send this to your backend
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };
  
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary-100 rounded-full transform translate-x-1/3 translate-y-1/3 z-0"></div>
      <div className="absolute left-0 top-0 w-32 h-32 bg-secondary-100 rounded-full transform -translate-x-1/3 -translate-y-1/3 z-0"></div>
      
      <div className="container relative z-10">
        <div className="bg-neutral-50 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="grid md:grid-cols-1">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-heading mb-4">Get Travel Inspiration</h2>
              <p className="text-neutral-600 mb-6">
                Subscribe to our newsletter for exclusive deals, travel tips, and destination guides delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitted}
                    />
                    {isSubmitted && (
                      <motion.div 
                        className="absolute inset-0 bg-success-500 bg-opacity-10 flex items-center justify-center rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex items-center text-success-700">
                          <CheckCircle size={20} className="mr-2" />
                          <span>Thank you for subscribing!</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} className="mr-2" />
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-xs text-neutral-500 mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive travel updates and promotions.
                </p>
              </form>
            </div>
            
            <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/7182415/pexels-photo-7182415.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;