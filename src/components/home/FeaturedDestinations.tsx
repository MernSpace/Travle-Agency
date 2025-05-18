import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin } from 'lucide-react';

// Featured destinations data
const destinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 799,
    rating: 4.8,
    duration: '7-10 days',
    category: 'Beach'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1099,
    rating: 4.7,
    duration: '5-7 days',
    category: 'City'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1299,
    rating: 4.9,
    duration: '7-10 days',
    category: 'City'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    country: 'Costa Rica',
    image: 'https://images.pexels.com/photos/1451076/pexels-photo-1451076.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 899,
    rating: 4.8,
    duration: '7-14 days',
    category: 'Adventure'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1199,
    rating: 4.9,
    duration: '5-8 days',
    category: 'Beach'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 999,
    rating: 4.7,
    duration: '5-7 days',
    category: 'City'
  },
];

// Filter categories
const categories = [
  { id: 'all', name: 'All Destinations' },
  { id: 'beach', name: 'Beach Getaways' },
  { id: 'city', name: 'City Breaks' },
  { id: 'adventure', name: 'Adventure' },
];

const FeaturedDestinations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(d => d.category.toLowerCase() === activeCategory);
  
  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="heading-accent mb-2 block">Explore Amazing Places</span>
          <h2 className="mb-4">Featured Destinations</h2>
          <p className="text-neutral-600">
            Discover our hand-picked selection of popular destinations, perfect for your next unforgettable journey.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="card card-hover overflow-hidden h-full">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-60 object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    onClick={() => toggleFavorite(destination.id)}
                    aria-label={favorites.includes(destination.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      size={20} 
                      className={favorites.includes(destination.id) ? "fill-secondary-500 text-secondary-500" : "text-neutral-500"}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="tag tag-secondary">{destination.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-heading">{destination.name}</h3>
                      <div className="flex items-center text-neutral-600">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-primary-50 px-2 py-1 rounded-lg">
                      <Star size={16} className="text-primary-500 mr-1" />
                      <span className="font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-neutral-600">Starting from</span>
                        <div className="text-xl font-heading font-bold text-primary-600">
                          ${destination.price}
                        </div>
                        <span className="text-xs text-neutral-500">{destination.duration}</span>
                      </div>
                      <Link to={`/destinations/${destination.id}`} className="btn btn-outline">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/search" className="btn btn-primary">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;