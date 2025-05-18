import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <section className="section min-h-[80vh] flex items-center justify-center">
      <div className="container">
        <div className="text-center max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin size={60} className="mx-auto text-secondary-500 mb-6" />
            
            <h1 className="mb-4">Page Not Found</h1>
            
            <p className="text-neutral-600 mb-8">
              It seems you've ventured off the beaten path. The destination you're looking for doesn't exist or has been moved to a new location.
            </p>
            
            <Link to="/" className="btn btn-primary">
              <Home size={18} className="mr-2" />
              Back to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;