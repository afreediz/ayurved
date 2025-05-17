import React, { useEffect, useState, useRef } from 'react';
import { FaRegPaperPlane, FaLeaf, FaEnvelope, FaUser, FaQuoteRight } from 'react-icons/fa';
import API from '../services/api';
import { toast } from 'react-toastify';

const OurStory = () => {
  const [activeSection, setActiveSection] = useState('journey');
  const sectionRefs = {
    journey: useRef(null),
    mission: useRef(null),
    team: useRef(null),
    contact: useRef(null)
  };
  
  const [isVisible, setIsVisible] = useState({
    journey: false,
    mission: false,
    team: false,
    contact: false
  });

  const [data, sendData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setIsVisible(prev => ({ ...prev, [sectionId]: true }));
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.4 }
    );
    
    Object.keys(sectionRefs).forEach(section => {
      if (sectionRefs[section].current) {
        observer.observe(sectionRefs[section].current);
      }
    });
    
    return () => {
      Object.keys(sectionRefs).forEach(section => {
        if (sectionRefs[section].current) {
          observer.unobserve(sectionRefs[section].current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    sendData((old_data) => {
      return {
        ...old_data,
        [name]: value
      }
    });
  };

  const sendMail = async () => {
    try {
      const { name, email, message } = data;
      if (!name || !email || !message) {
        throw new Error("Please fill all the fields");
      }
      await API.post('auth/sendmail', {
        email, message, name
      });
      toast.success("Message Sent Successfully");
      sendData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to send message");
      console.log(error);
    }
  };

  return (
    <div className="bg-white text-gray-800 relative overflow-hidden">
      {/* Fixed Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {Object.keys(sectionRefs).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full border-2 ${
                activeSection === section 
                  ? 'bg-green-500 border-green-600' 
                  : 'bg-transparent border-green-600 hover:bg-green-300'
              } transition-all duration-300`}
              aria-label={`Scroll to ${section} section`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section with Video and Overlay */}
      <section className="relative min-h-[80vh] text-white">
        <video
          src="/videos/aboutus/hero.mp4"
          className="absolute inset-0 object-cover object-center w-full h-full z-0"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-600/80 z-10" />
        
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center items-center">
          <div className="max-w-3xl text-center">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
              <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-lg md:text-xl mb-12 leading-relaxed">
                Welcome to Fortune Gate Biodynamic Farm. Since 2016, we've been committed to pure, 
                organic milk through sustainable practices that honor nature's wisdom.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button 
                  onClick={() => scrollToSection('journey')}
                  className="px-8 py-3 bg-white text-green-800 rounded-full hover:bg-green-100 transition duration-300 font-semibold tracking-wide"
                >
                  Explore Our Journey
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition duration-300 font-semibold tracking-wide"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg 
            className="w-6 h-10 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Journey Section */}
      <section 
        id="journey" 
        ref={sectionRefs.journey}
        className="py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-green-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20" />
        
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-1000 ${isVisible.journey ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-green-700 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">Our Journey</h2>
              <div className="w-12 h-1 bg-green-700 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 relative">
                <div className="absolute w-full h-full bg-gradient-to-r from-green-800 to-green-600 rounded-lg -rotate-3 scale-[0.97] opacity-20"></div>
                <img 
                  src="/images/price.jpg" 
                  alt="Our Farm" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20">
                  <p className="text-green-800 font-semibold">Est. 2016</p>
                </div>
              </div>
              
              <div className="md:col-span-7">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Founded in 2016, our journey began with a simple yet profound mission: to promote good health through 
                  pure and organic products. Drawing inspiration from the wisdom of our ancestors, we strive to revive 
                  the old culture of natural farming and sustainable living.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  At Fortune Gate Biodynamic Farm, we are committed to producing the finest quality milk by nurturing 
                  our cows with the utmost care and respect. Our A2A2 certified cows graze freely under the sun and moon, 
                  fed with a carefully curated diet of Dasha flowers and Nava grains.
                </p>
                <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-600 shadow-sm">
                  <div className="flex items-start">
                    <FaQuoteRight className="text-green-600 text-xl mr-4 mt-1" />
                    <p className="italic text-green-800">
                      "We believe in a holistic approach, where the health of our cows directly influences the purity of our milk.
                      This dedication to quality over quantity means we produce less milk but with unmatched purity and nutritional value."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        id="mission" 
        ref={sectionRefs.mission}
        className="py-24 px-4 bg-gradient-to-r from-green-800 to-green-600 text-white"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-white mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <div className="w-12 h-1 bg-white ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 md:order-2">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Our mission is to offer the purest and healthiest organic milk products, preserving the essence of natural 
                    farming for generations to come. We are deeply committed to biodynamic farming practices that respect and 
                    enhance the natural environment.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <FaLeaf className="mr-2" /> Natural Approach
                      </h3>
                      <p>
                        We stand firm against artificial enhancers and harmful chemicals. Our cows are fed 100% natural fodders, 
                        ensuring our ghee retains its natural benefits and purity.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-3">Traditional Methods</h3>
                      <p>
                        Our ghee, made from the milk of freely grazing cows, is a testament to our commitment to health and tradition, 
                        created through time-honored processes.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg leading-relaxed">
                    By focusing on quality and sustainability, we aim to combat the decline in food quality brought about by 
                    modern agricultural practices. At Navjeevana, we are dedicated to creating products that are not only good 
                    for you but also good for the planet.
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-5 md:order-1 relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <video 
                    src="/images/cows.mp4" 
                    className="w-full h-full object-cover" 
                    autoPlay={true} 
                    muted 
                    loop
                  />
                </div>
                <div className="absolute -bottom-5 right-5 bg-white p-3 rounded-full shadow-lg">
                  <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="font-bold">100%</span>
                  </div>
                </div>
                <div className="absolute -top-5 -left-5 bg-white p-3 rounded-full shadow-lg">
                  <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold">
                    ORGANIC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team" 
        ref={sectionRefs.team}
        className="py-24 px-4 bg-white"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-green-700 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">Meet Our Team</h2>
              <div className="w-12 h-1 bg-green-700 ml-4"></div>
            </div>
            
            <div className="relative mb-16">
              <div className="aspect-video rounded-lg shadow-xl overflow-hidden">
                <video 
                  src="/videos/gkumar.mp4" 
                  className="w-full h-full object-cover" 
                  autoPlay={true} 
                  loop 
                  controls
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-800 to-green-600 text-white px-8 py-3 rounded-full shadow-lg">
                  <span className="font-semibold">Our Vision for Sustainable Farming</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
              {[
                { name: "Shailaja Geegikumar", role: "", image: "/images/wife.jpeg" },
                { name: "Geegi Kumar", role: "Founder", image: "/images/jijikumar.jpeg" },
                { name: "Akash Geegikumar", role: "", image: "/images/son.jpeg" }
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="relative mb-6 transition-all duration-500 transform group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 rounded-lg rotate-3 scale-[0.97] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative overflow-hidden rounded-lg shadow-xl aspect-square">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-green-800 mb-1">{member.name}</h3>
                    {member.role && <p className="text-gray-600">{member.role}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={sectionRefs.contact}
        className="py-24 px-4 bg-gradient-to-r from-green-800 to-green-600 text-white"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-1 bg-white mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
              <div className="w-12 h-1 bg-white ml-4"></div>
            </div>
            
            <div className="max-w-lg mx-auto text-center mb-12">
              <p className="text-lg leading-relaxed">
                We'd love to hear from you! If you have any questions, feedback, or just want to say hello, 
                please reach out to us using the form below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <div className="relative rounded-lg overflow-hidden shadow-xl h-full">
                  <img 
                    src="/images/contact.avif" 
                    alt="Contact Us" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/80 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">Visit Our Farm</h3>
                      <p className="mb-4">Experience the natural beauty and sustainable practices firsthand.</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                        <span>Accepting visitors by appointment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7">
                <div className="bg-white rounded-lg shadow-xl p-8 text-gray-800">
                  <div className="mb-6">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600 block mb-2">Your Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-600">
                        <FaUser />
                      </div>
                      <input
                        id="name"
                        value={data.name}
                        onChange={onChange}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 pl-10 border-none rounded-lg bg-gray-100 focus:bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="text-sm font-medium text-gray-600 block mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-600">
                        <FaEnvelope />
                      </div>
                      <input
                        id="email"
                        value={data.email}
                        onChange={onChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 pl-10 border-none rounded-lg bg-gray-100 focus:bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="text-sm font-medium text-gray-600 block mb-2">Your Message</label>
                    <textarea
                      id="message"
                      value={data.message}
                      onChange={onChange}
                      placeholder="What would you like to tell us?"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-3 border-none rounded-lg bg-gray-100 focus:bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg hover:from-green-700 hover:to-green-500 transition duration-300 font-semibold flex items-center justify-center gap-3"
                    onClick={(e) => {
                      e.preventDefault();
                      sendMail();
                    }}
                  >
                    Send Message
                    <FaRegPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default OurStory;