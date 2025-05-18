import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Clock, Languages, Sun, Cloud, ThumbsUp, Star, ExternalLink } from 'lucide-react';

// Mock data for the destination
const getDestination = (id: string) => {
  const destinations = {
    'bali': {
      name: 'Bali',
      title: 'Island of the Gods',
      country: 'Indonesia',
      heroImage: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=1600',
      galleryImages: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5005989/pexels-photo-5005989.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3610828/pexels-photo-3610828.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      description: 'Bali, the famed Island of the Gods, with its varied landscape of hills and mountains, rugged coastlines and sandy beaches, lush rice terraces and barren volcanic hillsides all providing a picturesque backdrop to its colorful, deeply spiritual and unique culture.',
      quickFacts: {
        bestTime: 'April to October',
        language: 'Indonesian, Balinese',
        currency: 'Indonesian Rupiah (IDR)',
        timeToVisit: '5-14 days',
        timeZone: 'GMT+8',
        visaRequired: 'Visa-free for many countries',
      },
      attractions: [
        {
          name: 'Ubud Monkey Forest',
          description: 'Sacred sanctuary home to over 700 monkeys and 186 species of plants.',
          image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          name: 'Tegallalang Rice Terraces',
          description: 'Stunning stepped rice paddies using the traditional Balinese cooperative irrigation system.',
          image: 'https://images.pexels.com/photos/6476373/pexels-photo-6476373.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        {
          name: 'Uluwatu Temple',
          description: 'Ancient sea temple perched on a steep cliff 70 meters above the Indian Ocean.',
          image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      ],
      packages: [
        {
          id: 'bali-1',
          name: 'Bali Cultural Immersion',
          duration: '7 days',
          price: 899,
          highlights: ['Ubud artisan villages', 'Traditional dance performance', 'Cooking class', 'Temple visits'],
        },
        {
          id: 'bali-2',
          name: 'Bali Beach Paradise',
          duration: '10 days',
          price: 1299,
          highlights: ['Luxury beachfront resorts', 'Snorkeling excursion', 'Sunset dinner cruise', 'Spa treatments'],
        },
        {
          id: 'bali-3',
          name: 'Bali Adventure Package',
          duration: '8 days',
          price: 1099,
          highlights: ['White water rafting', 'Mount Batur sunrise trek', 'Cycling through villages', 'Waterfall hikes'],
        },
      ],
      weather: {
        dry: 'April to October - warm and dry with average temperatures of 26-30°C',
        wet: 'November to March - hot and humid with frequent rainfall, especially in December and January',
      },
      reviews: [
        {
          name: 'Emma Thompson',
          date: 'March 2023',
          rating: 5,
          comment: 'Bali was everything I dreamed of and more. The beaches are pristine, the food is incredible, and the locals are so welcoming.',
          image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          name: 'Michael Chen',
          date: 'January 2023',
          rating: 4,
          comment: 'Great experience overall. The only downside was the rain as we visited during wet season, but the cultural experiences made up for it.',
          image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
      ],
    },
    // Add more destinations as needed
  };
  
  return destinations[id as keyof typeof destinations] || null;
};

const DestinationPage = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const data = getDestination(id);
        setDestination(data);
        setLoading(false);
        
        // Update page title
        if (data) {
          document.title = `${data.name}, ${data.country} | Horizon Voyages`;
        } else {
          document.title = 'Destination Not Found | Horizon Voyages';
        }
      }
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-500 text-lg">
          Loading destination...
        </div>
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h1>Destination Not Found</h1>
          <p className="mb-6">The destination you're looking for doesn't exist or has been removed.</p>
          <Link to="/search" className="btn btn-primary">
            Browse All Destinations
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <section 
        className="pt-40 pb-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${destination.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
        
        <div className="container relative z-10 text-white">
          <div className="flex items-center text-secondary-400 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{destination.country}</span>
          </div>
          
          <h1 className="mb-2">{destination.name}</h1>
          <p className="text-xl font-accent italic text-white/90 mb-6">{destination.title}</p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to={`/search?destination=${destination.name}`} className="btn btn-secondary">
              View Packages
            </Link>
            <Link to="/booking/new" className="btn btn-outline border-white text-white hover:bg-white/20">
              Start Planning
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
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
                    onClick={() => setActiveTab('attractions')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'attractions' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Attractions
                  </button>
                  <button 
                    onClick={() => setActiveTab('packages')} 
                    className={`px-4 py-2 font-heading font-medium whitespace-nowrap ${
                      activeTab === 'packages' 
                        ? 'border-b-2 border-primary-500 text-primary-500' 
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    Packages
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
              <div className="pb-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="animate-fadeIn">
                    <p className="text-lg mb-6">{destination.description}</p>
                    
                    {/* Gallery */}
                    <h3 className="text-xl font-heading mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {destination.galleryImages.map((image: string, index: number) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`${destination.name} - Gallery image ${index + 1}`} 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    
                    {/* Weather */}
                    <h3 className="text-xl font-heading mb-4">Weather</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Sun size={20} className="text-secondary-500 mr-2" />
                          <h4 className="font-heading">Dry Season</h4>
                        </div>
                        <p className="text-neutral-600">{destination.weather.dry}</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Cloud size={20} className="text-primary-500 mr-2" />
                          <h4 className="font-heading">Wet Season</h4>
                        </div>
                        <p className="text-neutral-600">{destination.weather.wet}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Attractions Tab */}
                {activeTab === 'attractions' && (
                  <div className="animate-fadeIn">
                    <div className="space-y-8">
                      {destination.attractions.map((attraction: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3">
                            <img 
                              src={attraction.image} 
                              alt={attraction.name} 
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <h3 className="text-xl font-heading mb-2">{attraction.name}</h3>
                            <p className="text-neutral-600">{attraction.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div className="animate-fadeIn">
                    <div className="space-y-6">
                      {destination.packages.map((pkg: any) => (
                        <div key={pkg.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                          <div className="bg-neutral-50 p-4 border-b border-neutral-200">
                            <h3 className="text-xl font-heading">{pkg.name}</h3>
                            <div className="flex items-center text-neutral-600 mt-1">
                              <Clock size={16} className="mr-1" />
                              <span>{pkg.duration}</span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="mb-4">
                              <h4 className="font-heading text-sm text-neutral-600 mb-2">Highlights:</h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {pkg.highlights.map((highlight: string, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <ThumbsUp size={14} className="text-primary-500 mr-2" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-200">
                              <div>
                                <span className="text-sm text-neutral-600">From</span>
                                <div className="text-2xl font-heading font-bold text-primary-600">
                                  ${pkg.price}
                                </div>
                                <span className="text-xs text-neutral-500">per person</span>
                              </div>
                              
                              <Link 
                                to={`/package/${pkg.id}`} 
                                className="btn btn-primary"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="animate-fadeIn">
                    <div className="mb-8">
                      <Link to="/review/new" className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600">
                        <ExternalLink size={16} className="mr-1" />
                        Write a Review
                      </Link>
                    </div>
                    
                    <div className="space-y-6">
                      {destination.reviews.map((review: any, index: number) => (
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
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Quick Facts */}
              <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-heading mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar size={20} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm">Best Time to Visit</h4>
                      <p className="text-neutral-600">{destination.quickFacts.bestTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Languages size={20} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm">Language</h4>
                      <p className="text-neutral-600">{destination.quickFacts.language}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign size={20} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm">Currency</h4>
                      <p className="text-neutral-600">{destination.quickFacts.currency}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={20} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm">Time to Visit</h4>
                      <p className="text-neutral-600">{destination.quickFacts.timeToVisit}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-6 text-white">
                <h3 className="text-xl font-heading mb-4">Ready to Explore {destination.name}?</h3>
                <p className="mb-6">
                  Our travel experts can help you plan the perfect trip to {destination.name} tailored to your preferences.
                </p>
                <Link to="/booking/new" className="btn bg-white text-primary-600 hover:bg-neutral-100 w-full">
                  Start Planning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationPage;