import {  Globe, Users, Compass } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative bg-horizon-dark text-white py-20">
          <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Horizon Voyages</h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl accent-text">
              Creating extraordinary travel experiences since 2010
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg mb-6">
                  Horizon Voyages was born from a passion for exploration and a belief that travel has the power to transform lives. Founded in 2010 by a group of experienced travelers and industry professionals, we set out to create a travel agency that offered more than just bookings—we wanted to create journeys that inspire, educate, and leave lasting impressions.
                </p>
                <p className="text-lg mb-6">
                  What began as a small team working from a tiny office has grown into a respected name in the travel industry, with a global network of partners and a dedicated team of travel specialists. Through every stage of our growth, we've remained committed to our core values: authenticity, sustainability, and exceptional service.
                </p>
                <p className="text-lg">
                  Today, we're proud to help thousands of travelers each year discover new destinations, cultures, and experiences. Our journey continues as we explore new horizons and create opportunities for our clients to do the same.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1513920360676-df044ebc18c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1567&q=80" 
                  alt="Horizon Voyages team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-horizon-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Compass className="text-horizon-blue h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Authentic Experiences</h3>
                <p className="text-gray-700">
                  We believe in creating travel experiences that go beyond the tourist attractions. We work with local guides and communities to offer authentic insights into destinations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-horizon-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Globe className="text-horizon-orange h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainable Travel</h3>
                <p className="text-gray-700">
                  We are committed to promoting responsible tourism that respects local cultures and environments. We partner with eco-friendly accommodations and support conservation efforts.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-horizon-teal bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="text-horizon-teal h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personal Service</h3>
                <p className="text-gray-700">
                  Every traveler is unique, and we pride ourselves on offering personalized service. Our travel specialists take the time to understand your preferences and create tailor-made itineraries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-horizon-blue font-medium">Founder & CEO</p>
                <p className="mt-2 text-gray-600">
                  A passionate explorer who has visited over 70 countries.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80" 
                    alt="David Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">David Chen</h3>
                <p className="text-horizon-blue font-medium">Head of Operations</p>
                <p className="mt-2 text-gray-600">
                  An efficiency expert with 15 years in luxury travel planning.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=964&q=80" 
                    alt="Maria Rodriguez" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Maria Rodriguez</h3>
                <p className="text-horizon-blue font-medium">Destination Specialist</p>
                <p className="mt-2 text-gray-600">
                  A cultural enthusiast specializing in Latin America and Mediterranean destinations.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="James Wilson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">James Wilson</h3>
                <p className="text-horizon-blue font-medium">Adventure Coordinator</p>
                <p className="mt-2 text-gray-600">
                  An adrenaline junkie who specializes in creating unforgettable adventure experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gradient-to-r from-horizon-blue to-horizon-teal text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">15+</div>
                <p className="text-xl">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">10k+</div>
                <p className="text-xl">Happy Travelers</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">120+</div>
                <p className="text-xl">Destinations</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">30+</div>
                <p className="text-xl">Industry Awards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of expert travel advisors is ready to help you plan your next unforgettable adventure.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap">
              <a href="/contact" className="btn-primary my-2">
                Contact Us
              </a>
              <a href="/destinations" className="btn-secondary my-2">
                Explore Destinations
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
