import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../search/SearchBar';

// Featured destinations for hero carousel
const heroSlides = [
  {
    id: 1,
    title: 'Santorini',
    subtitle: 'Greece',
    description: 'Experience the breathtaking views of the Aegean Sea from the iconic white buildings of Santorini.',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 2,
    title: 'Kyoto',
    subtitle: 'Japan',
    description: 'Immerse yourself in traditional Japanese culture in the ancient temples and gardens of Kyoto.',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 3,
    title: 'Machu Picchu',
    subtitle: 'Peru',
    description: 'Discover the ancient Incan citadel set against a backdrop of breathtaking Andean peaks.',
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-screen min-h-[600px] max-h-[800px]">
      {/* Hero Slider */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <motion.span 
            className="text-sm md:text-base text-secondary-400 font-heading uppercase tracking-wider mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Journeys Beyond Boundaries
          </motion.span>
          
          <motion.h1 
            className="text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="heading-accent">Discover</span> the World's <br />
            Hidden Treasures
          </motion.h1>
          
          <motion.p 
            className="text-neutral-200 text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Create unforgettable memories with our expertly crafted travel experiences to the world's most captivating destinations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-card bg-white bg-opacity-95 backdrop-blur-md shadow-card hidden sm:block"
          >
            <SearchBar isHero={true} />
          </motion.div>
        </div>
        
        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container flex justify-center">
            <div className="flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Current Destination Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute bottom-0 md:bottom-20 right-4 md:right-12 lg:right-24 bg-black/30 backdrop-blur-sm p-4 md:p-6 rounded-card text-white max-w-xs m-5 md:m-0 "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-heading">{heroSlides[currentSlide].title}</h3>
            <p className="text-sm text-neutral-300">{heroSlides[currentSlide].subtitle}</p>
            <p className="mt-2 text-neutral-100 text-sm">{heroSlides[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;