import React from 'react';
import Center from '../components/utilities/Center';

const OurStory = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] text-black">
        <video
            src="/videos/aboutus/hero.mp4"
            className="absolute inset-0 object-cover object-center w-full h-full z-0"
            autoPlay
            loop
            muted
        />
        <div className="absolute inset-0 bg-black bg-opacity-60  mx-auto text-center z-20 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-4 text-white">About Us</h1>
            <p className="text-xl text-white">Discover the purity of our ghee and milk products, directly from the farm to your home.</p>
        </div>
        </section>
                  {/* Introduction Section */}
      <section className="py-16 px-4 grid grid-cols-1 gap-4 md:grid-cols-5 container mx-auto">

        <div className="md:col-span-2 mb-8 lg:mb-0">
            <img src="https://via.placeholder.com/600x400" alt="Farm Image" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-3">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:space-x-10">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg mb-4">
              We are dedicated to providing the highest quality ghee and milk products, sourced directly from our farm.
              Our journey began with a passion for purity and a commitment to sustainable farming practices.
            </p>
            <p className="text-lg">
              Our products are made with love and care, ensuring that you get the best nature has to offer. Experience the
              difference with our 100% pure ghee and milk.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 bg-green-100 py-16 mx-auto">
        <div className="container mx-auto text-center md:text-right grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className=" md:col-span-3">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            Our mission is to bring you the purest, most delicious ghee and milk products while supporting sustainable farming
            practices. We believe in transparency, quality, and care for the environment.
          </p>
            </div>
          <img src="https://via.placeholder.com/600x400" alt="Mission Image" className="mx-auto rounded-lg shadow-lg  md:col-span-2" />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Values</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/100x100" alt="Quality Icon" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p>
                  We ensure that all our products meet the highest standards of quality and purity.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/100x100" alt="Sustainability Icon" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p>
                  We are committed to sustainable farming practices that protect the environment.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/100x100" alt="Purity Icon" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Purity</h3>
                <p>
                  Our products are 100% pure, with no additives or preservatives, ensuring you get the best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/150x150" alt="Team Member" className="mx-auto rounded-full mb-4" />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p>Founder & CEO</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/150x150" alt="Team Member" className="mx-auto rounded-full mb-4" />
                <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                <p>Head of Operations</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/150x150" alt="Team Member" className="mx-auto rounded-full mb-4" />
                <h3 className="text-xl font-semibold mb-2">Michael Brown</h3>
                <p>Chief Marketing Officer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Get in Touch</h2>
          <p className="text-lg mb-4">
            We'd love to hear from you! If you have any questions, feedback, or just want to say hello, please reach out to us.
          </p>
          <img src="https://via.placeholder.com/600x400" alt="Contact Image" className="mx-auto rounded-lg shadow-lg" />
        </div>
      </section>
    </div>
  );
};

export default OurStory;