import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Star, DollarSign, Check, X, Users, ChevronRight, ChevronLeft } from 'lucide-react';

// Mock package data
const getPackage = (id: string) => {
  const packages = {
    'bali-1': {
      id: 'bali-1',
      name: 'Bali Cultural Immersion',
      destination: 'Bali',
      country: 'Indonesia',
      duration: '7 days',
      price: 899,
      rating: 4.8,
      reviewCount: 126,
      description: 'Immerse yourself in the rich cultural tapestry of Bali with this 7-day journey through the island\'s artistic heart. Visit traditional villages, participate in authentic ceremonies, and learn about the island\'s unique Hindu traditions.',
      mainImage: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1600',
      gallery: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5005989/pexels-photo-5005989.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3610828/pexels-photo-3610828.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      highlights: [
        'Traditional dance performances in Ubud',
        'Handcrafting session with local artisans',
        'Visit to sacred temples with a local guide',
        'Authentic cooking class featuring Balinese cuisine',
        'Rice terrace walk and agricultural experience',
        'Purification ceremony at a holy spring'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome',
          description: 'Airport pickup and transfer to your accommodation in Ubud. Evening welcome dinner with traditional dance performance.',
          accommodation: 'Alila Ubud'
        },
        {
          day: 2,
          title: 'Arts & Crafts of Ubud',
          description: 'Full day exploring the artistic side of Ubud with visits to galleries, craft villages, and hands-on art workshops.',
          accommodation: 'Alila Ubud'
        },
        {
          day: 3,
          title: 'Sacred Temples Tour',
          description: 'Visit Bali\'s most important temples including Tirta Empul, Gunung Kawi, and Goa Gajah with an expert cultural guide.',
          accommodation: 'Alila Ubud'
        },
        {
          day: 4,
          title: 'Culinary Traditions',
          description: 'Morning market visit followed by a traditional cooking class. Afternoon free for optional spa treatments.',
          accommodation: 'Alila Ubud'
        },
        {
          day: 5,
          title: 'Rice Terraces & Rural Life',
          description: 'Excursion to Tegallalang rice terraces with local farming experience. Visit to a traditional Balinese compound home.',
          accommodation: 'Beachfront resort in Jimbaran'
        },
        {
          day: 6,
          title: 'Coastal Culture & Ceremonies',
          description: 'Visit to clifftop Uluwatu Temple for Kecak dance at sunset. Seafood dinner on the beach.',
          accommodation: 'Beachfront resort in Jimbaran'
        },
        {
          day: 7,
          title: 'Departure Day',
          description: 'Free morning for last-minute shopping or beach time. Airport transfer for departure.',
          accommodation: '-'
        },
      ],
      inclusions: [
        'All accommodations (3★ or 4★ options available)',
        'Daily breakfast, 3 lunches, and 4 dinners',
        'Airport transfers and all transportation',
        'English-speaking cultural guide',
        'All activity and entrance fees as per itinerary',
        'Cooking class with market visit',
        'Craft workshop materials',
        'Bottled water during tours'
      ],
      exclusions: [
        'International airfare',
        'Visa fees (if applicable)',
        'Travel insurance',
        'Personal expenses and souvenirs',
        'Alcoholic beverages',
        'Optional activities not in the itinerary',
        'Tips for guides and drivers'
      ],
      reviews: [
        {
          name: 'Sarah Johnson',
          date: 'March 2023',
          rating: 5,
          comment: 'This tour was the perfect introduction to Balinese culture! Our guide was knowledgeable and passionate, and each activity gave us genuine insight into local traditions.',
          image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          name: 'Michael Chen',
          date: 'January 2023',
          rating: 4,
          comment: 'Excellent cultural immersion. The cooking class and craft workshops were highlights. Would have liked more free time, but overall a wonderful experience.',
          image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
      ],
    },
    // Add more packages as needed
  };
  
  return packages[id as keyof typeof packages] || null;
};

const PackageDetailPage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const data = getPackage(id);
        setPackageData(data);
        setLoading(false);
        
        // Update page title
        if (data) {
          document.title = `${data.name} | Horizon Voyages`;
        } else {
          document.title = 'Package Not Found | Horizon Voyages';
        }
      }
    }, 500);
  }, [id]);
  
  const nextImage = () => {
    setActiveImage(prev => (prev === packageData.gallery.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    setActiveImage(prev => (prev === 0 ? packageData.gallery.length - 1 : prev - 1));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-500 text-lg">
          Loading package details...
        </div>
      </div>
    );
  }
  
  if (!packageData) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h1>Package Not Found</h1>
          <p className="mb-6">The travel package you're looking for doesn't exist or has been removed.</p>
          <Link to="/search" className="btn btn-primary">
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Header Section */}
      <section className="pt-40 pb-20 bg-primary-600 text-white">
        <div className="container">
          <div className="flex items-center text-secondary-400 mb-2">
            <MapPin size={16} className="mr-1" />
            <Link to={`/destinations/bali`} className="hover:text-secondary-300 transition-colors">
              {packageData.destination}, {packageData.country}
            </Link>
          </div>
          
          <h1 className="mb-4">{packageData.name}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90">
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{packageData.duration}</span>
            </div>
            
            <div className="flex items-center">
              <Star size={18} className="mr-2 text-secondary-400" />
              <span>
                {packageData.rating} ({packageData.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>Ages 8+</span>
            </div>
            
            <div className="flex items-center">
              <DollarSign size={18} className="mr-2" />
              <span>From ${packageData.price} per person</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="mb-8 relative overflow-hidden rounded-lg shadow-md">
                <div className="relative aspect-w-16 aspect-h-9">
                  <img 
                    src={packageData.gallery[activeImage]} 
                    alt={packageData.name} 
                    className="w-full h-[400px] object-cover"
                  />
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {/* Thumbnails */}
                <div className="flex p-2 bg-neutral-100">
                  {packageData.gallery.map((image: string, index: number) => (
                    <button 
                      key={index}
                      className={`w-1/4 p-1 transition-opacity ${activeImage === index ? 'opacity-100' : 'opacity-60'}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="h-16 w-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-neutral-200 mb-8">
                <div className="flex overflow-x-auto pb-2 -mb-px">
                  <button 
                    onClick={() => setActiveTab('overview')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'overview' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('itinerary')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'itinerary' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Itinerary
                  </button>
                  <button 
                    onClick={() => setActiveTab('inclusions')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'inclusions' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Inclusions & Exclusions
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'reviews' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="mb-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-fadeIn"
                  >
                    <h2 className="text-2xl font-heading mb-4">Package Overview</h2>
                    <p className="mb-6 text-neutral-700">{packageData.description}</p>
                    
                    <h3 className="text-xl font-heading mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {packageData.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-3 bg-primary-100 text-primary-600 p-1 rounded-full">
                            <Check size={16} />
                          </div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-fadeIn"
                  >
                    <h2 className="text-2xl font-heading mb-6">Detailed Itinerary</h2>
                    
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-primary-100"></div>
                      
                      {/* Itinerary days */}
                      <div className="space-y-6">
                        {packageData.itinerary.map((day: any) => (
                          <div key={day.day} className="flex">
                            <div className="flex-shrink-0 relative z-10">
                              <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-heading">
                                {day.day}
                              </div>
                            </div>
                            
                            <div className="ml-6">
                              <h3 className="font-heading text-lg mb-2">
                                Day {day.day}: {day.title}
                              </h3>
                              <p className="text-neutral-700 mb-2">{day.description}</p>
                              
                              {day.accommodation !== '-' && (
                                <div className="text-sm text-neutral-600">
                                  <span className="font-medium">Accommodation:</span> {day.accommodation}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Inclusions Tab */}
                {activeTab === 'inclusions' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-fadeIn"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-2xl font-heading mb-4">What's Included</h2>
                        <ul className="space-y-3">
                          {packageData.inclusions.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="mt-1 mr-3 bg-success-100 text-success-700 p-1 rounded-full">
                                <Check size={16} />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-heading mb-4">What's Not Included</h2>
                        <ul className="space-y-3">
                          {packageData.exclusions.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="mt-1 mr-3 bg-error-100 text-error-700 p-1 rounded-full">
                                <X size={16} />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-fadeIn"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-heading">Traveler Reviews</h2>
                      <div className="flex items-center">
                        <div className="bg-primary-50 px-3 py-1 rounded-lg flex items-center mr-3">
                          <Star size={18} className="text-primary-500 fill-primary-500 mr-1" />
                          <span className="font-medium">{packageData.rating}</span>
                        </div>
                        <span className="text-neutral-600">{packageData.reviewCount} reviews</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {packageData.reviews.map((review: any, index: number) => (
                        <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <img 
                              src={review.image} 
                              alt={review.name} 
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <div className="flex items-center mb-1">
                                <h4 className="font-heading mr-2">{review.name}</h4>
                                <span className="text-xs text-neutral-500">{review.date}</span>
                              </div>
                              
                              <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < review.rating ? "text-secondary-500 fill-secondary-500" : "text-neutral-300"} 
                                  />
                                ))}
                              </div>
                              
                              <p className="text-neutral-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <button className="btn btn-outline">
                        Load More Reviews
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Booking Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-card border border-neutral-200 sticky top-24">
                <div className="p-6 border-b border-neutral-200">
                  <h3 className="text-xl font-heading mb-2">Book This Package</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-heading font-bold text-primary-600">
                      ${packageData.price}
                    </span>
                    <span className="text-neutral-600 ml-2">per person</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <form>
                    {/* Date Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Select a departure date
                      </label>
                      <div className="relative">
                        <select 
                          className="input appearance-none"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="" disabled>Choose a date</option>
                          <option value="2025-01-15">Jan 15, 2025 - Jan 21, 2025</option>
                          <option value="2025-02-12">Feb 12, 2025 - Feb 18, 2025</option>
                          <option value="2025-03-10">Mar 10, 2025 - Mar 16, 2025</option>
                          <option value="2025-04-05">Apr 05, 2025 - Apr 11, 2025</option>
                        </select>
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Travelers */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Number of travelers
                      </label>
                      <div className="flex items-center border border-neutral-300 rounded-lg">
                        <button 
                          type="button" 
                          className="p-3 text-neutral-600 hover:bg-neutral-100" 
                          onClick={() => setTravelers(prev => Math.max(1, prev - 1))}
                        >
                          -
                        </button>
                        <div className="flex-1 text-center flex items-center justify-center">
                          <Users size={16} className="text-neutral-500 mr-2" />
                          <span>{travelers} {travelers === 1 ? 'traveler' : 'travelers'}</span>
                        </div>
                        <button 
                          type="button" 
                          className="p-3 text-neutral-600 hover:bg-neutral-100" 
                          onClick={() => setTravelers(prev => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Price Summary */}
                    {selectedDate && (
                      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                        <h4 className="font-heading mb-3">Price Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Package Price</span>
                            <span>${packageData.price} x {travelers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxes & Fees</span>
                            <span>${(packageData.price * travelers * 0.08).toFixed(2)}</span>
                          </div>
                          <div className="border-t border-neutral-200 pt-2 mt-2 font-medium flex justify-between">
                            <span>Total</span>
                            <span>
                              ${(packageData.price * travelers * 1.08).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Book Now Button */}
                    <Link 
                      to={`/booking/${id}`} 
                      className={`btn w-full ${
                        selectedDate ? 'btn-primary' : 'bg-neutral-300 cursor-not-allowed'
                      }`}
                      onClick={(e) => !selectedDate && e.preventDefault()}
                    >
                      Book Now
                    </Link>
                    
                    <p className="text-center text-xs text-neutral-500 mt-4">
                      No payment required now. Reserve your spot now and pay later.
                    </p>
                  </form>
                </div>
                
                {/* Additional Info */}
                <div className="p-6 border-t border-neutral-200">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Check size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">Free cancellation up to 30 days before departure</span>
                    </div>
                    <div className="flex items-start">
                      <Check size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">Flexible payment options</span>
                    </div>
                    <div className="flex items-start">
                      <Check size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">24/7 support during your trip</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Packages */}
      <section className="bg-neutral-50 py-12">
        <div className="container">
          <h2 className="text-2xl font-heading mb-8">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card card-hover overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bali Adventure" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="tag tag-secondary">Adventure</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-heading">Bali Adventure Package</h3>
                <div className="flex items-center text-neutral-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">Bali, Indonesia</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-sm text-neutral-600">From</span>
                    <div className="text-xl font-heading font-bold text-primary-600">$1,099</div>
                  </div>
                  <Link to="/package/bali-2" className="btn btn-outline text-sm px-4 py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card card-hover overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bali Beach Paradise" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="tag tag-secondary">Beach</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-heading">Bali Beach Paradise</h3>
                <div className="flex items-center text-neutral-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">Bali, Indonesia</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-sm text-neutral-600">From</span>
                    <div className="text-xl font-heading font-bold text-primary-600">$1,299</div>
                  </div>
                  <Link to="/package/bali-3" className="btn btn-outline text-sm px-4 py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card card-hover overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/6476373/pexels-photo-6476373.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bali Wellness Retreat" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="tag tag-secondary">Wellness</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-heading">Bali Wellness Retreat</h3>
                <div className="flex items-center text-neutral-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">Bali, Indonesia</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-sm text-neutral-600">From</span>
                    <div className="text-xl font-heading font-bold text-primary-600">$1,499</div>
                  </div>
                  <Link to="/package/bali-4" className="btn btn-outline text-sm px-4 py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageDetailPage;