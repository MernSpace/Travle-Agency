import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'Our trip to Japan was absolutely incredible! Horizon Voyages took care of every detail, from the beautiful ryokan stays to the private tea ceremony. Our guide was knowledgeable and friendly. It was truly the trip of a lifetime.',
    rating: 5,
    trip: 'Cultural Tour of Japan'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Toronto, Canada',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'I was nervous about planning an African safari, but Horizon Voyages made it seamless. The accommodations were luxurious yet authentic, and seeing the wildlife up close was breathtaking. I\'ve already booked my next adventure with them!',
    rating: 5,
    trip: 'South African Safari'
  },
  {
    id: 3,
    name: 'Emma Watson',
    location: 'London, UK',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'The Greek Island hopping tour exceeded all my expectations. From the whitewashed buildings of Santorini to the crystal clear waters of Milos, every moment was picture perfect. The personalized itinerary Horizon Voyages created for us struck the perfect balance between activities and relaxation.',
    rating: 5,
    trip: 'Greek Island Hopping'
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="section bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-accent italic text-secondary-400 mb-2 block">Testimonials</span>
          <h2 className="mb-4">What Our Travelers Say</h2>
          <p className="text-primary-100">
            Don't just take our word for it - hear from our satisfied travelers about their unforgettable experiences.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-10 left-0 opacity-10">
            <Quote size={80} />
          </div>
          
          {/* Carousel */}
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-card"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name} 
                      className="w-20 h-20 object-cover rounded-full border-4 border-secondary-500"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonials[currentTestimonial].rating ? "text-secondary-400 fill-secondary-400" : "text-neutral-400"} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-primary-100">
                        Trip: {testimonials[currentTestimonial].trip}
                      </span>
                    </div>
                    
                    <p className="text-lg mb-6">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    
                    <div>
                      <p className="font-heading font-semibold text-lg">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-primary-200 text-sm">
                        {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-4 px-4">
              <button 
                onClick={prevTestimonial} 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transform -translate-y-1/2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial} 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transform -translate-y-1/2"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;