import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Filter, ChevronDown, X, Map, List, Calendar } from 'lucide-react';

// Mock data for search results
const destinations = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 799,
    rating: 4.8,
    duration: '7-10 days',
    category: 'Beach',
    region: 'Asia'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1099,
    rating: 4.7,
    duration: '5-7 days',
    category: 'City',
    region: 'Europe'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1299,
    rating: 4.9,
    duration: '7-10 days',
    category: 'City',
    region: 'Asia'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    country: 'Costa Rica',
    image: 'https://images.pexels.com/photos/1451076/pexels-photo-1451076.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 899,
    rating: 4.8,
    duration: '7-14 days',
    category: 'Adventure',
    region: 'Americas'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1199,
    rating: 4.9,
    duration: '5-8 days',
    category: 'Beach',
    region: 'Europe'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 999,
    rating: 4.7,
    duration: '5-7 days',
    category: 'City',
    region: 'Europe'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1499,
    rating: 4.9,
    duration: '8-12 days',
    category: 'Adventure',
    region: 'Americas'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1600',
    price: 1899,
    rating: 4.9,
    duration: '7-10 days',
    category: 'Beach',
    region: 'Asia'
  },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Get search parameters
  const destinationParam = searchParams.get('destination') || '';
  const regionParam = searchParams.get('region') || '';
  const typeParam = searchParams.get('type') || '';
  
  // States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState(destinations);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(regionParam ? [regionParam] : []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(typeParam === 'package' ? ['City', 'Beach'] : typeParam === 'experience' ? ['Adventure'] : []);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  
  // Effect to filter results based on URL params
  useEffect(() => {
    let filtered = destinations;
    
    // Filter by destination name
    if (destinationParam) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(destinationParam.toLowerCase()) ||
        d.country.toLowerCase().includes(destinationParam.toLowerCase())
      );
    }
    
    // Filter by region
    if (regionParam) {
      filtered = filtered.filter(d => d.region.toLowerCase() === regionParam.toLowerCase());
    }
    
    // Filter by type/category
    if (typeParam === 'package') {
      filtered = filtered.filter(d => d.category === 'City' || d.category === 'Beach');
    } else if (typeParam === 'experience') {
      filtered = filtered.filter(d => d.category === 'Adventure');
    }
    
    setResults(filtered);
    
    // Update page title
    document.title = 'Search Results | Horizon Voyages';
  }, [destinationParam, regionParam, typeParam]);
  
  // Effect to apply selected filters
  useEffect(() => {
    let filtered = destinations;
    
    // Apply price range filter
    filtered = filtered.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1]);
    
    // Apply region filter
    if (selectedRegions.length > 0) {
      filtered = filtered.filter(d => selectedRegions.includes(d.region));
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(d => selectedCategories.includes(d.category));
    }
    
    // Apply rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(d => d.rating >= selectedRating);
    }
    
    setResults(filtered);
  }, [priceRange, selectedRegions, selectedCategories, selectedRating]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSelectedRating(0);
  };
  
  const regions = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];
  const categories = ['Beach', 'City', 'Adventure', 'Cultural', 'Wildlife'];
  
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 bg-primary-600 text-white">
        <div className="container">
          <h1 className="mb-6">
            {destinationParam 
              ? `Search Results for "${destinationParam}"` 
              : regionParam 
                ? `Exploring ${regionParam}` 
                : typeParam === 'package'
                  ? 'Travel Packages'
                  : typeParam === 'experience'
                    ? 'Travel Experiences'
                    : 'All Destinations'}
          </h1>
          <p className="text-primary-100 mb-4 max-w-2xl">
            {results.length} destinations found. Discover your perfect journey and start planning your next adventure.
          </p>
        </div>
      </section>
      
      {/* Search Results */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="lg:hidden mb-4">
              <button 
                className="w-full bg-neutral-100 hover:bg-neutral-200 px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span className="flex items-center font-medium">
                  <Filter size={18} className="mr-2" /> 
                  Filters
                </span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
            
            {/* Filters Sidebar */}
            <div 
              className={`${
                showFilters ? 'block' : 'hidden lg:block'
              } lg:w-1/4 space-y-6`}
            >
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-heading text-sm mb-3">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-600 text-sm">${priceRange[0]}</span>
                    <span className="text-neutral-600 text-sm">${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                {/* Regions */}
                <div className="mb-6">
                  <h4 className="font-heading text-sm mb-3">Regions</h4>
                  <div className="space-y-2">
                    {regions.map(region => (
                      <label key={region} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedRegions.includes(region)}
                          onChange={() => toggleRegion(region)}
                          className="mr-2"
                        />
                        <span>{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Trip Type */}
                <div className="mb-6">
                  <h4 className="font-heading text-sm mb-3">Trip Type</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-2"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Rating */}
                <div>
                  <h4 className="font-heading text-sm mb-3">Minimum Rating</h4>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4, 5].map(rating => (
                      <button 
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`flex items-center justify-center w-10 h-10 mr-1 rounded-full ${
                          selectedRating === rating ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                        aria-label={`Set rating filter to ${rating} stars`}
                      >
                        {rating === 0 ? 'All' : <Star size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Popular Search Card */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="font-heading text-sm mb-3">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  <Link to="/search?destination=beach" className="text-xs bg-white px-3 py-1 rounded-full border border-neutral-200 hover:border-primary-500 transition-colors">
                    Beach Destinations
                  </Link>
                  <Link to="/search?type=package" className="text-xs bg-white px-3 py-1 rounded-full border border-neutral-200 hover:border-primary-500 transition-colors">
                    Family Packages
                  </Link>
                  <Link to="/search?region=europe" className="text-xs bg-white px-3 py-1 rounded-full border border-neutral-200 hover:border-primary-500 transition-colors">
                    European Tours
                  </Link>
                  <Link to="/search?type=experience" className="text-xs bg-white px-3 py-1 rounded-full border border-neutral-200 hover:border-primary-500 transition-colors">
                    Adventure Trips
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Results Area */}
            <div className="lg:w-3/4">
              {/* Controls */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-neutral-600">
                    {results.length} results found
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center">
                    <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
                    <select className="bg-white border border-neutral-300 rounded-lg text-sm px-3 py-2">
                      <option>Popular</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Rating</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button 
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-500' : 'text-neutral-500'}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <List size={18} />
                    </button>
                    <button 
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-500' : 'text-neutral-500'}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      <Map size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Results Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map(destination => (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="card card-hover overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={destination.image} 
                            alt={destination.name} 
                            className="w-full h-48 object-cover"
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
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-heading">{destination.name}</h3>
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
                          
                          <div className="flex items-center mt-4 text-sm text-neutral-600">
                            <Calendar size={14} className="mr-1" />
                            <span>{destination.duration}</span>
                          </div>
                          
                          <div className="border-t border-neutral-200 pt-4 mt-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm text-neutral-600">Starting from</span>
                                <div className="text-xl font-heading font-bold text-primary-600">
                                  ${destination.price}
                                </div>
                              </div>
                              <Link to={`/destinations/${destination.id}`} className="btn btn-outline">
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Results List */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {results.map(destination => (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="card card-hover overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img 
                              src={destination.image} 
                              alt={destination.name} 
                              className="w-full h-48 md:h-full object-cover"
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
                          
                          <div className="md:w-2/3 p-4 md:p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-heading">{destination.name}</h3>
                                <div className="flex items-center text-neutral-600">
                                  <MapPin size={14} className="mr-1" />
                                  <span>{destination.country}</span>
                                </div>
                              </div>
                              <div className="flex items-center bg-primary-50 px-2 py-1 rounded-lg">
                                <Star size={16} className="text-primary-500 mr-1" />
                                <span className="font-medium">{destination.rating}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center text-sm text-neutral-600">
                              <Calendar size={14} className="mr-1" />
                              <span>{destination.duration}</span>
                            </div>
                            
                            <p className="text-neutral-600 my-4">
                              Experience the beauty and culture of {destination.name} with our carefully crafted travel packages. Enjoy stunning landscapes, local cuisine, and unforgettable experiences.
                            </p>
                            
                            <div className="border-t border-neutral-200 pt-4 mt-auto flex justify-between items-center">
                              <div>
                                <span className="text-sm text-neutral-600">Starting from</span>
                                <div className="text-xl font-heading font-bold text-primary-600">
                                  ${destination.price}
                                </div>
                              </div>
                              <Link to={`/destinations/${destination.id}`} className="btn btn-primary">
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* No Results */}
              {results.length === 0 && (
                <div className="bg-neutral-50 rounded-lg p-8 text-center">
                  <X size={48} className="text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-xl font-heading mb-2">No Results Found</h3>
                  <p className="text-neutral-600 mb-6">
                    We couldn't find any destinations matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Clear All Filters
                  </button>
                </div>
              )}
              
              {/* Pagination */}
              {results.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-neutral-300 text-neutral-700 flex items-center justify-center hover:border-primary-500">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-neutral-300 text-neutral-700 flex items-center justify-center hover:border-primary-500">
                      3
                    </button>
                    <span className="text-neutral-600">...</span>
                    <button className="w-10 h-10 rounded-full bg-white border border-neutral-300 text-neutral-700 flex items-center justify-center hover:border-primary-500">
                      8
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;