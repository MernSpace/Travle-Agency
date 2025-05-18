import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Award, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <Heart className="text-white" size={24} />,
    title: 'Personalized Experience',
    description: 'We craft customized itineraries tailored to your preferences and travel style.'
  },
  {
    icon: <Shield className="text-white" size={24} />,
    title: 'Safe & Secure',
    description: 'Your safety is our priority with 24/7 support and trusted local partners worldwide.'
  },
  {
    icon: <Clock className="text-white" size={24} />,
    title: 'Time Saving',
    description: 'We handle all the planning and logistics, so you can focus on enjoying your vacation.'
  },
  {
    icon: <Award className="text-white" size={24} />,
    title: 'Best Price Guarantee',
    description: 'We promise competitive pricing and transparency with no hidden fees.'
  },
  {
    icon: <Headphones className="text-white" size={24} />,
    title: '24/7 Customer Support',
    description: 'Our travel experts are always available to assist you before, during, and after your trip.'
  },
  {
    icon: <CreditCard className="text-white" size={24} />,
    title: 'Flexible Payment Options',
    description: 'Pay your way with installment plans, multiple currencies, and secure transactions.'
  }
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50 rounded-l-3xl transform translate-x-1/4"></div>
      
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="heading-accent mb-2 block">Why Travel With Us</span>
          <h2 className="mb-4">The Horizon Voyages Difference</h2>
          <p className="text-neutral-600">
            We're more than just a travel agency - we're your partners in creating unforgettable journeys tailored to your dreams.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="bg-white rounded-card shadow-card p-6 h-full flex flex-col hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-heading">{feature.title}</h3>
                </div>
                <p className="text-neutral-600 mt-2">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;