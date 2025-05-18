import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onClose?: () => void;
  isHero?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, isHero = false }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination) {
      navigate(`/search?destination=${encodeURIComponent(destination)}`);
      if (onClose) onClose();
    }
  };
  
  const containerClasses = isHero 
    ? 'bg-white bg-opacity-95 backdrop-blur-md rounded-card shadow-card'
    : '';
    
  return (
    <form onSubmit={handleSearch} className={containerClasses}>
      <div className="relative ">
        <input
          type="text"
          placeholder="Where would you like to go?"
          className="input pl-12 pr-4 py-4 w-full text-lg"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search size={20} className="text-neutral-400" />
        </div>
        
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;