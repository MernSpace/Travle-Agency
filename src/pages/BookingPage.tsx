import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, CreditCard, Lock, ChevronDown, ChevronUp, Calendar, Users, Globe, Phone, Mail } from 'lucide-react';

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
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    // Add more packages as needed
    'new': {
      id: 'new',
      name: 'Custom Package',
      destination: '',
      country: '',
      duration: '',
      price: 0,
      image: '',
    }
  };
  
  return packages[id as keyof typeof packages] || null;
};

// Define available dates
const availableDates = [
  { value: '2025-01-15', label: 'Jan 15, 2025 - Jan 21, 2025' },
  { value: '2025-02-12', label: 'Feb 12, 2025 - Feb 18, 2025' },
  { value: '2025-03-10', label: 'Mar 10, 2025 - Mar 16, 2025' },
  { value: '2025-04-05', label: 'Apr 05, 2025 - Apr 11, 2025' },
];

// Form steps
const formSteps = [
  'Package Selection',
  'Traveler Details',
  'Additional Options',
  'Payment',
  'Confirmation'
];

const BookingPage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    departureDate: '',
    travelers: 2,
    rooms: 1,
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
    travelers: [
      {
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        nationality: '',
        dietaryRequirements: '',
      },
      {
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        nationality: '',
        dietaryRequirements: '',
      }
    ],
    addons: {
      insurance: false,
      airportTransfer: false,
      cityTour: false,
      premiumAccommodation: false,
    },
    paymentMethod: 'credit',
    cardDetails: {
      name: '',
      number: '',
      expiry: '',
      cvv: '',
    },
    terms: false,
  });
  
  // Get package data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const data = getPackage(id);
        setPackageData(data);
        setLoading(false);
        
        // Update page title
        if (data) {
          document.title = `Book ${data.name} | Horizon Voyages`;
        } else {
          document.title = 'Booking | Horizon Voyages';
        }
      }
    }, 500);
  }, [id]);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  // Handle traveler details changes
  const handleTravelerChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedTravelers = [...prev.travelers];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [field]: value
      };
      
      return {
        ...prev,
        travelers: updatedTravelers
      };
    });
  };
  
  // Update travelers count
  const updateTravelersCount = (count: number) => {
    const newCount = Math.max(1, Math.min(10, count));
    
    setFormData(prev => {
      let updatedTravelers = [...prev.travelers];
      
      // Add or remove travelers as needed
      if (newCount > updatedTravelers.length) {
        // Add more travelers
        for (let i = updatedTravelers.length; i < newCount; i++) {
          updatedTravelers.push({
            firstName: '',
            lastName: '',
            dob: '',
            passport: '',
            nationality: '',
            dietaryRequirements: '',
          });
        }
      } else if (newCount < updatedTravelers.length) {
        // Remove excess travelers
        updatedTravelers = updatedTravelers.slice(0, newCount);
      }
      
      return {
        ...prev,
        travelers: newCount,
        travelers: updatedTravelers
      };
    });
  };
  
  // Calculate total price
  const calculateTotal = () => {
    if (!packageData) return 0;
    
    let total = packageData.price * formData.travelers.length;
    
    // Add addons
    if (formData.addons.insurance) total += 49 * formData.travelers.length;
    if (formData.addons.airportTransfer) total += 30;
    if (formData.addons.cityTour) total += 89 * formData.travelers.length;
    if (formData.addons.premiumAccommodation) total += 199 * formData.travelers.length;
    
    // Add taxes (8%)
    total = total * 1.08;
    
    return total.toFixed(2);
  };
  
  // Form validation for current step
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Package Selection
        return !!formData.departureDate;
        
      case 1: // Traveler Details
        const contactInfo = formData.contactInfo;
        const mainTravelerValid = contactInfo.firstName && 
                                contactInfo.lastName && 
                                contactInfo.email && 
                                contactInfo.phone;
                                
        // Check if all travelers have first and last name
        const allTravelersValid = formData.travelers.every(
          t => t.firstName && t.lastName
        );
        
        return mainTravelerValid && allTravelersValid;
        
      case 2: // Additional Options
        return true; // Always valid as these are optional
        
      case 3: // Payment
        if (formData.paymentMethod === 'credit') {
          return formData.cardDetails.name && 
                 formData.cardDetails.number && 
                 formData.cardDetails.expiry && 
                 formData.cardDetails.cvv &&
                 formData.terms;
        }
        return formData.terms;
        
      default:
        return false;
    }
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    if (isCurrentStepValid() && currentStep < formSteps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Navigate to previous step
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Submit the booking
  const submitBooking = () => {
    // In a real application, this would send the data to the server
    console.log('Booking submitted:', formData);
    
    // Move to confirmation step
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary-500 text-lg">
          Loading booking form...
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
        </div>
      </div>
    );
  }
  
  return (
    <section className="pt-32 pb-20 bg-neutral-50">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-heading mb-8">
          {currentStep === 4 ? 'Booking Confirmed!' : 'Book Your Trip'}
        </h1>
        
        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="flex justify-between">
              {formSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex-1 text-center ${
                    index === formSteps.length - 1 ? '' : 'after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-neutral-200 after:top-3.5 after:left-1/2'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-7 h-7 rounded-full z-10 flex items-center justify-center text-sm ${
                        index < currentStep 
                          ? 'bg-primary-500 text-white' 
                          : index === currentStep 
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {index < currentStep ? <Check size={16} /> : index + 1}
                    </div>
                    <span className={`text-xs mt-2 hidden md:block ${
                      index <= currentStep ? 'text-primary-600 font-medium' : 'text-neutral-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 block md:hidden text-center">
              <span className="text-primary-600 font-medium">{formSteps[currentStep]}</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Selection */}
            {currentStep === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-heading mb-6">Select Your Travel Details</h2>
                
                {/* Package Info */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-neutral-50 rounded-lg">
                  {packageData.id !== 'new' && (
                    <div className="md:w-1/4">
                      <img 
                        src={packageData.image} 
                        alt={packageData.name} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className={packageData.id !== 'new' ? 'md:w-3/4' : 'w-full'}>
                    <h3 className="text-xl font-heading">{packageData.name}</h3>
                    
                    {packageData.id !== 'new' ? (
                      <>
                        <p className="text-neutral-600 mb-2">
                          {packageData.destination}, {packageData.country} • {packageData.duration}
                        </p>
                        <div className="text-lg font-heading text-primary-600">
                          ${packageData.price} <span className="text-sm font-normal text-neutral-600">per person</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-neutral-600 mb-2">
                        Select your preferred destination and travel details below
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Departure Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Departure Date*
                  </label>
                  <div className="relative">
                    <select 
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      className="input appearance-none"
                      required
                    >
                      <option value="" disabled>Select your preferred departure date</option>
                      {availableDates.map(date => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                    <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  </div>
                </div>
                
                {/* Travelers & Rooms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Number of Travelers*
                    </label>
                    <div className="flex items-center border border-neutral-300 rounded-lg">
                      <button 
                        type="button" 
                        className="p-3 text-neutral-600 hover:bg-neutral-100" 
                        onClick={() => updateTravelersCount(formData.travelers.length - 1)}
                      >
                        -
                      </button>
                      <div className="flex-1 text-center flex items-center justify-center">
                        <Users size={16} className="text-neutral-500 mr-2" />
                        <span>{formData.travelers.length} {formData.travelers.length === 1 ? 'traveler' : 'travelers'}</span>
                      </div>
                      <button 
                        type="button" 
                        className="p-3 text-neutral-600 hover:bg-neutral-100" 
                        onClick={() => updateTravelersCount(formData.travelers.length + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Number of Rooms
                    </label>
                    <div className="flex items-center border border-neutral-300 rounded-lg">
                      <button 
                        type="button" 
                        className="p-3 text-neutral-600 hover:bg-neutral-100" 
                        onClick={() => setFormData(prev => ({...prev, rooms: Math.max(1, prev.rooms - 1)}))}
                      >
                        -
                      </button>
                      <div className="flex-1 text-center">
                        <span>{formData.rooms} {formData.rooms === 1 ? 'room' : 'rooms'}</span>
                      </div>
                      <button 
                        type="button" 
                        className="p-3 text-neutral-600 hover:bg-neutral-100" 
                        onClick={() => setFormData(prev => ({...prev, rooms: prev.rooms + 1}))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Custom Package Fields (only for new bookings) */}
                {packageData.id === 'new' && (
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <h3 className="text-lg font-heading mb-4">Custom Travel Preferences</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Destination
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g., Paris, Tokyo, Bali"
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Trip Type
                        </label>
                        <select className="input">
                          <option value="">Select trip type</option>
                          <option value="beach">Beach Vacation</option>
                          <option value="city">City Break</option>
                          <option value="adventure">Adventure</option>
                          <option value="cultural">Cultural Tour</option>
                          <option value="wellness">Wellness Retreat</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Additional Requests
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Tell us about any specific requirements or preferences for your trip"
                        className="input"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Traveler Details */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-heading mb-6">Traveler Information</h2>
                
                {/* Contact Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-heading mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name*
                      </label>
                      <input 
                        type="text" 
                        name="contactInfo.firstName"
                        value={formData.contactInfo.firstName}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name*
                      </label>
                      <input 
                        type="text" 
                        name="contactInfo.lastName"
                        value={formData.contactInfo.lastName}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address*
                      </label>
                      <div className="relative">
                        <input 
                          type="email" 
                          name="contactInfo.email"
                          value={formData.contactInfo.email}
                          onChange={handleChange}
                          className="input pl-10"
                          required
                        />
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number*
                      </label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          name="contactInfo.phone"
                          value={formData.contactInfo.phone}
                          onChange={handleChange}
                          className="input pl-10"
                          required
                        />
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address
                    </label>
                    <input 
                      type="text" 
                      name="contactInfo.address"
                      value={formData.contactInfo.address}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        City
                      </label>
                      <input 
                        type="text" 
                        name="contactInfo.city"
                        value={formData.contactInfo.city}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Postal Code
                      </label>
                      <input 
                        type="text" 
                        name="contactInfo.postalCode"
                        value={formData.contactInfo.postalCode}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Country
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="contactInfo.country"
                          value={formData.contactInfo.country}
                          onChange={handleChange}
                          className="input pl-10"
                        />
                        <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Traveler Details */}
                {formData.travelers.map((traveler, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-neutral-50">
                    <h3 className="text-lg font-heading mb-4">
                      {index === 0 ? 'Lead Traveler' : `Traveler ${index + 1}`}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          First Name*
                        </label>
                        <input 
                          type="text" 
                          value={traveler.firstName}
                          onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Last Name*
                        </label>
                        <input 
                          type="text" 
                          value={traveler.lastName}
                          onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Date of Birth
                        </label>
                        <input 
                          type="date" 
                          value={traveler.dob}
                          onChange={(e) => handleTravelerChange(index, 'dob', e.target.value)}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Passport Number
                        </label>
                        <input 
                          type="text" 
                          value={traveler.passport}
                          onChange={(e) => handleTravelerChange(index, 'passport', e.target.value)}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Nationality
                        </label>
                        <input 
                          type="text" 
                          value={traveler.nationality}
                          onChange={(e) => handleTravelerChange(index, 'nationality', e.target.value)}
                          className="input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Dietary Requirements or Special Needs
                      </label>
                      <input 
                        type="text" 
                        value={traveler.dietaryRequirements}
                        onChange={(e) => handleTravelerChange(index, 'dietaryRequirements', e.target.value)}
                        className="input"
                        placeholder="e.g., vegetarian, food allergies, mobility assistance"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Additional Options */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-heading mb-6">Additional Options</h2>
                
                <div className="space-y-6">
                  {/* Travel Insurance */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 cursor-pointer bg-neutral-50" onClick={() => setFormData(prev => ({...prev, addons: {...prev.addons, insurance: !prev.addons.insurance}}))}>
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="addons.insurance"
                          checked={formData.addons.insurance}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <h3 className="font-heading font-medium">Travel Insurance</h3>
                          <p className="text-sm text-neutral-600">Comprehensive coverage for trip cancellation, medical emergencies, and more</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary-600">$49</div>
                        <div className="text-xs text-neutral-500">per person</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Airport Transfer */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 cursor-pointer bg-neutral-50" onClick={() => setFormData(prev => ({...prev, addons: {...prev.addons, airportTransfer: !prev.addons.airportTransfer}}))}>
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="addons.airportTransfer"
                          checked={formData.addons.airportTransfer}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <h3 className="font-heading font-medium">Airport Transfers</h3>
                          <p className="text-sm text-neutral-600">Private transportation between airport and your accommodation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary-600">$30</div>
                        <div className="text-xs text-neutral-500">per booking</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* City Tour */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 cursor-pointer bg-neutral-50" onClick={() => setFormData(prev => ({...prev, addons: {...prev.addons, cityTour: !prev.addons.cityTour}}))}>
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="addons.cityTour"
                          checked={formData.addons.cityTour}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <h3 className="font-heading font-medium">City Tour</h3>
                          <p className="text-sm text-neutral-600">Half-day guided tour of main attractions with local expert</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary-600">$89</div>
                        <div className="text-xs text-neutral-500">per person</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Accommodation */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 cursor-pointer bg-neutral-50" onClick={() => setFormData(prev => ({...prev, addons: {...prev.addons, premiumAccommodation: !prev.addons.premiumAccommodation}}))}>
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          name="addons.premiumAccommodation"
                          checked={formData.addons.premiumAccommodation}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <h3 className="font-heading font-medium">Premium Accommodation Upgrade</h3>
                          <p className="text-sm text-neutral-600">Upgrade to luxury hotels and resorts for your entire stay</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary-600">$199</div>
                        <div className="text-xs text-neutral-500">per person</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Special Requests */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Special Requests
                  </label>
                  <textarea 
                    rows={4}
                    className="input"
                    placeholder="Any other requests or information we should know about?"
                  ></textarea>
                  <p className="mt-1 text-xs text-neutral-500">
                    We'll do our best to accommodate your requests, though they cannot be guaranteed.
                  </p>
                </div>
              </div>
            )}
            
            {/* Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-heading mb-6">Payment Information</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Payment Method
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`border rounded-lg p-4 flex items-center cursor-pointer ${formData.paymentMethod === 'credit' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-primary-500 mr-2" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </label>
                    
                    <label className={`border rounded-lg p-4 flex items-center cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" className="mr-2 text-blue-600">
                          <path fill="currentColor" d="M9.5 15.5h-4a.5.5 0 0 1-.5-.5l1-8a.5.5 0 0 1 .5-.5h5.5c2.2 0 3.5 1.5 3.5 3.5 0 2.5-2 4-4.5 4H9.5v1.5zm0-3h1c1.5 0 2-1 2-2s-.5-1.5-1.5-1.5H9l-.5 3.5h1zm5-3.5h2.5c.3 0 .5.2.5.5L16 17h-2l1.5-8z" />
                        </svg>
                        <span>PayPal</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Credit Card Details */}
                {formData.paymentMethod === 'credit' && (
                  <div className="border rounded-lg p-4 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading">Card Details</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded">Visa</span>
                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded">Mastercard</span>
                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded">Amex</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Name on Card*
                      </label>
                      <input 
                        type="text" 
                        name="cardDetails.name"
                        value={formData.cardDetails.name}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Card Number*
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="cardDetails.number"
                          value={formData.cardDetails.number}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className="input"
                          required
                        />
                        <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Expiry Date*
                        </label>
                        <input 
                          type="text" 
                          name="cardDetails.expiry"
                          value={formData.cardDetails.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Security Code (CVV)*
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="cardDetails.cvv"
                            value={formData.cardDetails.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="input"
                            required
                          />
                          <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* PayPal Instructions */}
                {formData.paymentMethod === 'paypal' && (
                  <div className="border rounded-lg p-4 mb-8 bg-neutral-50 text-center">
                    <p className="mb-4">
                      You will be redirected to PayPal to complete your payment after confirming your booking.
                    </p>
                    <svg width="80" height="24" viewBox="0 0 24 24" className="mx-auto text-blue-600">
                      <path fill="currentColor" d="M9.5 15.5h-4a.5.5 0 0 1-.5-.5l1-8a.5.5 0 0 1 .5-.5h5.5c2.2 0 3.5 1.5 3.5 3.5 0 2.5-2 4-4.5 4H9.5v1.5zm0-3h1c1.5 0 2-1 2-2s-.5-1.5-1.5-1.5H9l-.5 3.5h1zm5-3.5h2.5c.3 0 .5.2.5.5L16 17h-2l1.5-8z" />
                    </svg>
                  </div>
                )}
                
                {/* Terms & Conditions */}
                <div className="mb-6">
                  <label className="flex items-start cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                      required
                    />
                    <span className="text-sm text-neutral-700">
                      I agree to the <a href="#" className="text-primary-600 underline">Terms and Conditions</a>, <a href="#" className="text-primary-600 underline">Cancellation Policy</a>, and <a href="#" className="text-primary-600 underline">Privacy Policy</a>. I confirm that all traveler information is correct.
                    </span>
                  </label>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <div className="flex items-start">
                    <Lock size={18} className="text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-primary-700">
                      Your payment information is encrypted and securely processed. We do not store your full credit card details on our servers.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Confirmation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-success-500" />
                  </div>
                  <h2 className="text-2xl font-heading mb-2">Booking Confirmed!</h2>
                  <p className="text-neutral-600">
                    Thank you for booking with Horizon Voyages. Your adventure awaits!
                  </p>
                </div>
                
                <div className="border-t border-neutral-200 pt-6 mb-6">
                  <h3 className="font-heading mb-4">Booking Details</h3>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Booking Reference:</span>
                      <span className="font-mono bg-white px-2 py-1 rounded border">HV-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Trip:</span>
                      <span>{packageData.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Departure Date:</span>
                      <span>{availableDates.find(d => d.value === formData.departureDate)?.label || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Travelers:</span>
                      <span>{formData.travelers.length} {formData.travelers.length === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                  
                  <p className="mb-6">
                    We've sent a confirmation email to <span className="font-medium">{formData.contactInfo.email}</span> with all the details of your booking.
                  </p>
                  
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                    <h3 className="font-heading mb-2 text-primary-700">What happens next?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                        <span>Within 24 hours, one of our travel specialists will contact you to introduce themselves and answer any questions.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                        <span>30 days before departure, you'll receive detailed trip information and final preparations.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary-200 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                        <span>7 days before your trip, we'll send emergency contacts and a trip checklist to ensure you're ready.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <a href="/" className="btn btn-primary flex-1">
                    Return to Homepage
                  </a>
                  <a href="/account" className="btn btn-outline flex-1">
                    View My Bookings
                  </a>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between">
                {currentStep > 0 ? (
                  <button 
                    onClick={goToPrevStep} 
                    className="btn btn-outline mt-4 sm:mt-0"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <button 
                    onClick={goToNextStep} 
                    className={`btn btn-primary ${isCurrentStepValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isCurrentStepValid()}
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={submitBooking} 
                    className={`btn btn-primary ${isCurrentStepValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isCurrentStepValid()}
                  >
                    Confirm & Pay
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 sticky top-24">
                <div className="p-6 border-b border-neutral-200">
                  <h3 className="text-xl font-heading mb-1">Order Summary</h3>
                  <p className="text-sm text-neutral-600">
                    {packageData.name}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Package Price</span>
                      <span>${packageData.price} x {formData.travelers.length}</span>
                    </div>
                    
                    {formData.addons.insurance && (
                      <div className="flex justify-between">
                        <span>Travel Insurance</span>
                        <span>$49 x {formData.travelers.length}</span>
                      </div>
                    )}
                    
                    {formData.addons.airportTransfer && (
                      <div className="flex justify-between">
                        <span>Airport Transfers</span>
                        <span>$30</span>
                      </div>
                    )}
                    
                    {formData.addons.cityTour && (
                      <div className="flex justify-between">
                        <span>City Tour</span>
                        <span>$89 x {formData.travelers.length}</span>
                      </div>
                    )}
                    
                    {formData.addons.premiumAccommodation && (
                      <div className="flex justify-between">
                        <span>Accommodation Upgrade</span>
                        <span>$199 x {formData.travelers.length}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees (8%)</span>
                      <span>Included</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-4 mb-6">
                    <div className="flex justify-between font-heading text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      All prices are in USD
                    </p>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg text-sm">
                    <h4 className="font-medium mb-2">Cancellation Policy</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Free cancellation up to 30 days before departure</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>50% refund if cancelled 15-29 days before departure</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>No refund if cancelled less than 15 days before departure</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 border-t border-neutral-200 flex items-center text-sm">
                  <Lock size={16} className="text-primary-500 mr-2" />
                  <span>Secure booking with encrypted payment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingPage;