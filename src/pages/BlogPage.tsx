import {useState} from 'react';
import { Calendar, User, ChevronRight, Mail,Tag } from 'lucide-react';

const BlogPage = () => {

      const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Sample blog data
  const featuredPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Southeast Asia You Need to Visit",
      excerpt: "Discover lesser-known destinations across Thailand, Vietnam, and Cambodia that offer authentic experiences away from the tourist crowds.",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
      author: "Maria Rodriguez",
      date: "May 15, 2025",
      category: "Destinations",
      readTime: "8 min read"
    }
  ];

  const recentPosts = [
    {
      id: 2,
      title: "The Ultimate Guide to Safari Photography",
      excerpt: "Expert tips for capturing wildlife moments and breathtaking landscapes on your next African adventure.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=968&q=80",
      author: "James Wilson",
      date: "May 10, 2025",
      category: "Photography",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Sustainable Travel: Eco-Friendly Hotels Around the World",
      excerpt: "Discover accommodations that are leading the way in environmental conservation while offering luxurious experiences.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      author: "Sarah Johnson",
      date: "May 5, 2025",
      category: "Sustainable Travel",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Top Culinary Destinations for Food Lovers",
      excerpt: "From street food markets to Michelin-starred restaurants, these destinations will satisfy every foodie's appetite.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "David Chen",
      date: "April 28, 2025",
      category: "Food & Drink",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "How to Plan a Multi-Generation Family Vacation",
      excerpt: "Tips for creating travel experiences that cater to family members of all ages, from toddlers to grandparents.",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "Maria Rodriguez",
      date: "April 22, 2025",
      category: "Family Travel",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "The Best Travel Apps for 2025",
      excerpt: "Essential mobile applications that will make your travels smoother, safer, and more enjoyable.",
      image: "https://images.unsplash.com/photo-1485395037613-e83d5c1f5290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "James Wilson",
      date: "April 15, 2025",
      category: "Travel Tips",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "Adventure Travel: Conquering the World's Greatest Treks",
      excerpt: "From the Inca Trail to the Everest Base Camp, these epic hiking adventures will challenge and inspire you.",
      image: "https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      author: "Sarah Johnson",
      date: "April 8, 2025",
      category: "Adventure",
      readTime: "11 min read"
    }
  ];

  const categories = [
    "Destinations", 
    "Adventure", 
    "Food & Drink", 
    "Photography", 
    "Family Travel", 
    "Sustainable Travel", 
    "Travel Tips", 
    "Budget Travel", 
    "Luxury Travel"
  ];


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Thank you for subscribing!');
    }, 1000);
  };


  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
      <section className="pt-40 pb-20 bg-primary-600 text-white">
        <div className="container">
          <h1 className="mb-6">
            <span className="text-4xl md:text-5xl font-bold">Explore the World of Travel</span>
          </h1>
          <p className="text-primary-100 mb-4 max-w-2xl">
          destinations found. Discover your perfect journey and start planning your next adventure.
          </p>
        </div>
      </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Story</h2>
            {featuredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="overflow-hidden h-64 lg:h-full">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-horizon-blue/10 text-horizon-blue text-sm font-medium py-1 px-2 rounded">
                          {post.category}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        <a href={`/blog/${post.id}`} className="hover:text-horizon-blue transition-colors">
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recent Articles</h2>
              <div className="hidden md:flex items-center space-x-2">
                <button className="bg-white text-gray-600 hover:text-horizon-blue px-3 py-1 rounded border">
                  Newest
                </button>
                <button className="bg-white text-gray-600 hover:text-horizon-blue px-3 py-1 rounded border">
                  Popular
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="overflow-hidden h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-horizon-blue/10 text-horizon-blue text-xs font-medium py-1 px-2 rounded">
                        {post.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      <a href={`/blog/${post.id}`} className="hover:text-horizon-blue transition-colors">
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-600">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-600">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="btn-primary">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

     {/* Categories and Newsletter */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Categories */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-6 text-horizon-dark flex items-center">
                  <Tag className="h-6 w-6 mr-2 text-horizon-blue" />
                  Categories
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <ul className="divide-y divide-gray-100">
                    {categories.map((category, index) => (
                      <li key={index} className="hover-scale">
                        <a 
                          href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center justify-between py-3 px-6 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                        >
                          <span className="text-gray-700 group-hover:text-horizon-blue transition-colors font-medium">
                            {category}
                          </span>
                          <div className="bg-white group-hover:bg-horizon-blue/10 p-1.5 rounded-full transition-colors">
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-horizon-blue transition-colors" />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl bg-blue-600">
                <div className="bg-gradient-to-r from-horizon-blue to-horizon-teal text-white p-8 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold">Subscribe to Our Newsletter</h3>
                    </div>
                    
                    <p className="mb-8 text-white/90 text-lg max-w-xl">
                      Get our latest travel stories, tips, and exclusive offers delivered directly to your inbox. Join our community of adventurous travelers!
                    </p>
                    
                    <form onSubmit={handleSubmit} className="relative">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full px-5 py-6 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-horizon-orange border-transparent text-base"
                            required
                          />
                        </div>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="bg-white hover:bg-opacity-90 text-black font-semibold py-6 px-8 rounded-lg transition-all duration-200 text-base whitespace-nowrap"
                        >
                          {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-white/70">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;