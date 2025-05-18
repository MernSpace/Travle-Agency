import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,  Calendar, Heart, Settings, LogOut, Map, Bell, 
   Phone, Mail, MapPin, Shield, CreditCard, Gift, Award, HelpCircle
} from 'lucide-react';

// Mock user data
const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Traveler St, San Francisco, CA 94110',
  profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
  memberSince: 'March 2023',
  loyaltyPoints: 450,
  loyaltyTier: 'Silver',
  upcomingTrips: [
    {
      id: 'trip-1',
      destination: 'Bali, Indonesia',
      package: 'Bali Cultural Immersion',
      dates: 'May 10-17, 2025',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Confirmed',
      price: 899
    }
  ],
  pastTrips: [
    {
      id: 'trip-2',
      destination: 'Paris, France',
      package: 'Paris City Break',
      dates: 'October 5-10, 2023',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Completed',
      price: 1099
    }
  ],
  savedDestinations: [
    {
      id: 'rome',
      name: 'Rome',
      country: 'Italy',
      image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    }
  ],
  notifications: [
    {
      id: 1,
      type: 'info',
      message: 'Your upcoming trip to Bali is in 30 days',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'promo',
      message: 'Early bird discount: 20% off on European packages',
      date: '1 day ago'
    }
  ]
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={userData.profileImage} 
            alt={userData.name} 
            className="w-16 h-16 rounded-full border-4 border-white/20"
          />
          <div>
            <h1 className="text-2xl font-heading">Welcome back, {userData.name.split(' ')[0]}!</h1>
            <p className="text-primary-100">Member since {userData.memberSince}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold">{userData.upcomingTrips.length}</div>
            <div className="text-sm text-primary-100">Upcoming Trips</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold">{userData.loyaltyPoints}</div>
            <div className="text-sm text-primary-100">Loyalty Points</div>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold">{userData.savedDestinations.length}</div>
            <div className="text-sm text-primary-100">Saved Places</div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/booking/new" className="card p-4 hover:shadow-lg transition-shadow">
          <Calendar className="w-8 h-8 text-primary-500 mb-3" />
          <h3 className="font-heading">Book a Trip</h3>
          <p className="text-sm text-neutral-600">Start planning your next adventure</p>
        </Link>
        
        <Link to="/account/loyalty" className="card p-4 hover:shadow-lg transition-shadow">
          <Award className="w-8 h-8 text-secondary-500 mb-3" />
          <h3 className="font-heading">Loyalty Program</h3>
          <p className="text-sm text-neutral-600">View your rewards and benefits</p>
        </Link>
        
        <Link to="/account/settings" className="card p-4 hover:shadow-lg transition-shadow">
          <Settings className="w-8 h-8 text-accent-500 mb-3" />
          <h3 className="font-heading">Account Settings</h3>
          <p className="text-sm text-neutral-600">Manage your preferences</p>
        </Link>
        
        <Link to="/help" className="card p-4 hover:shadow-lg transition-shadow">
          <HelpCircle className="w-8 h-8 text-neutral-500 mb-3" />
          <h3 className="font-heading">Help Center</h3>
          <p className="text-sm text-neutral-600">Get support and FAQs</p>
        </Link>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Trip */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading">Upcoming Trip</h2>
            <Link to="/account/trips" className="text-primary-500 hover:text-primary-600">
              View All Trips
            </Link>
          </div>
          
          {userData.upcomingTrips.length > 0 ? (
            <div className="card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={userData.upcomingTrips[0].image} 
                  alt={userData.upcomingTrips[0].destination} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-heading">{userData.upcomingTrips[0].package}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin size={14} className="mr-1" />
                    <span>{userData.upcomingTrips[0].destination}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-primary-500 mr-2" />
                    <span>{userData.upcomingTrips[0].dates}</span>
                  </div>
                  <span className="tag tag-success">{userData.upcomingTrips[0].status}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/account/trips/${userData.upcomingTrips[0].id}`} 
                    className="btn btn-primary"
                  >
                    Trip Details
                  </Link>
                  <div className="text-right">
                    <div className="text-sm text-neutral-600">Trip Total</div>
                    <div className="text-xl font-heading font-bold text-primary-600">
                      ${userData.upcomingTrips[0].price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-neutral-400" />
              <h3 className="font-heading mb-2">No Upcoming Trips</h3>
              <p className="text-neutral-600 mb-4">
                Start planning your next adventure today!
              </p>
              <Link to="/search" className="btn btn-primary">
                Browse Destinations
              </Link>
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading">Notifications</h2>
            <button className="text-primary-500 hover:text-primary-600">
              Mark All Read
            </button>
          </div>
          
          <div className="card divide-y">
            {userData.notifications.map(notification => (
              <div key={notification.id} className="p-4 hover:bg-neutral-50">
                <div className="flex items-start">
                  {notification.type === 'info' ? (
                    <Bell size={16} className="text-primary-500 mt-1 mr-3" />
                  ) : (
                    <Gift size={16} className="text-secondary-500 mt-1 mr-3" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-neutral-500">{notification.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Saved Destinations */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading">Saved Destinations</h2>
          <Link to="/account/favorites" className="text-primary-500 hover:text-primary-600">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.savedDestinations.map(destination => (
            <Link 
              key={destination.id} 
              to={`/destinations/${destination.id}`}
              className="card overflow-hidden group"
            >
              <div className="relative h-40">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-heading">{destination.name}</h3>
                  <div className="flex items-center text-white/90">
                    <MapPin size={14} className="mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Trips Component
const Trips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">My Trips</h1>
      
      <div className="mb-8">
        <div className="flex border-b border-neutral-200">
          <button 
            className={`px-6 py-2 font-medium ${activeTab === 'upcoming' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-neutral-600'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`px-6 py-2 font-medium ${activeTab === 'past' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-neutral-600'}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
      </div>
      
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {userData.upcomingTrips.map(trip => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading mb-2">{trip.package}</h3>
                      <div className="flex items-center text-neutral-600">
                        <MapPin size={16} className="mr-1" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center text-neutral-600 mt-1">
                        <Calendar size={16} className="mr-1" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>
                    <span className="tag tag-success">{trip.status}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div>
                      <span className="text-sm text-neutral-600">Trip Total</span>
                      <div className="text-2xl font-heading font-bold text-primary-600">
                        ${trip.price}
                      </div>
                    </div>
                    <div className="space-x-3">
                      <Link 
                        to={`/account/trips/${trip.id}`}
                        className="btn btn-outline"
                      >
                        View Details
                      </Link>
                      <Link 
                        to="/contact"
                        className="btn btn-primary"
                      >
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {userData.upcomingTrips.length === 0 && (
            <div className="card p-8 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-neutral-400" />
              <h3 className="text-xl font-heading mb-2">No Upcoming Trips</h3>
              <p className="text-neutral-600 mb-6">
                Time to plan your next adventure! Browse our destinations and find your perfect getaway.
              </p>
              <Link to="/search" className="btn btn-primary">
                Browse Destinations
              </Link>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'past' && (
        <div className="space-y-6">
          {userData.pastTrips.map(trip => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading mb-2">{trip.package}</h3>
                      <div className="flex items-center text-neutral-600">
                        <MapPin size={16} className="mr-1" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center text-neutral-600 mt-1">
                        <Calendar size={16} className="mr-1" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>
                    <span className="tag tag-neutral">{trip.status}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div>
                      <span className="text-sm text-neutral-600">Trip Total</span>
                      <div className="text-2xl font-heading font-bold text-primary-600">
                        ${trip.price}
                      </div>
                    </div>
                    <div className="space-x-3">
                      <Link 
                        to={`/account/trips/${trip.id}`}
                        className="btn btn-outline"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-primary">
                        Leave Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {userData.pastTrips.length === 0 && (
            <div className="card p-8 text-center">
              <Map size={48} className="mx-auto mb-4 text-neutral-400" />
              <h3 className="text-xl font-heading mb-2">No Past Trips</h3>
              <p className="text-neutral-600 mb-6">
                You haven't completed any trips with us yet. Start your journey today!
              </p>
              <Link to="/search" className="btn btn-primary">
                Browse Destinations
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Settings Component
const SettingsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-heading mb-8">Account Settings</h1>
      
      {/* Profile Information */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">Profile Information</h2>
          <button className="btn btn-outline">Edit Profile</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              className="input bg-neutral-50" 
              value={userData.name} 
              disabled 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                className="input bg-neutral-50 pl-10" 
                value={userData.email} 
                disabled 
              />
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input 
                type="tel" 
                className="input bg-neutral-50 pl-10" 
                value={userData.phone} 
                disabled 
              />
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Address
            </label>
            <div className="relative">
              <input 
                type="text" 
                className="input bg-neutral-50 pl-10" 
                value={userData.address} 
                disabled 
              />
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">Security</h2>
          <Shield size={24} className="text-primary-500" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Current Password
            </label>
            <input 
              type="password" 
              className="input" 
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              New Password
            </label>
            <input 
              type="password" 
              className="input" 
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Confirm New Password
            </label>
            <input 
              type="password" 
              className="input" 
              placeholder="Confirm new password"
            />
          </div>
          
          <button className="btn btn-primary">
            Update Password
          </button>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">Payment Methods</h2>
          <CreditCard size={24} className="text-primary-500" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-neutral-800 rounded-md flex items-center justify-center text-white mr-4">
                <span className="text-xs">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-neutral-600">Expires 12/25</p>
              </div>
            </div>
            <button className="text-neutral-600 hover:text-neutral-800">
              Edit
            </button>
          </div>
          
          <button className="btn btn-outline w-full">
            Add New Payment Method
          </button>
        </div>
      </div>
      
      {/* Notification Preferences */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">Notification Preferences</h2>
          <Bell size={24} className="text-primary-500" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-neutral-600">Receive booking confirmations and updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-t">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-neutral-600">Get text updates about your trips</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-t">
            <div>
              <h3 className="font-medium">Marketing Communications</h3>
              <p className="text-sm text-neutral-600">Receive travel deals and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* Travel Preferences */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading">Travel Preferences</h2>
          <Map size={24} className="text-primary-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Preferred Travel Style
            </label>
            <select className="input">
              <option>Luxury</option>
              <option>Adventure</option>
              <option>Cultural</option>
              <option>Beach</option>
              <option>Urban</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Accommodation Preference
            </label>
            <select className="input">
              <option>Hotels</option>
              <option>Resorts</option>
              <option>Boutique Hotels</option>
              <option>Vacation Rentals</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dietary Requirements
            </label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g., Vegetarian, Gluten-free"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Special Assistance
            </label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g., Wheelchair access"
            />
          </div>
        </div>
        
        <button className="btn btn-primary mt-6">
          Save Preferences
        </button>
      </div>
      
      {/* Delete Account */}
      <div className="card p-6 border-error-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-heading text-error-600">Delete Account</h2>
            <p className="text-neutral-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
          <button className="btn bg-error-500 hover:bg-error-600 text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Account Page Component
const AccountPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Navigation items
  const navItems = [
    { path: '/account', icon: Home, label: 'Dashboard' },
    { path: '/account/trips', icon: Calendar, label: 'My Trips' },
    { path: '/account/favorites', icon: Heart, label: 'Saved Places' },
    { path: '/account/settings', icon: Settings, label: 'Settings' },
  ];
  
  // Set title
  useEffect(() => {
    document.title = 'My Account | Horizon Voyages';
  }, []);
  
  return (
    <section className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24">
              <div className="flex items-center p-4 mb-6">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-heading">{userData.name}</h3>
                  <p className="text-sm text-neutral-600">{userData.loyaltyTier} Member</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      currentPath === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                ))}
                
                <hr className="my-4" />
                
                <button className="flex items-center px-4 py-3 rounded-lg w-full text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <LogOut size={20} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/settings" element={<SettingsSection />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;