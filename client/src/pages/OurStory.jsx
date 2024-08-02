import React, { useEffect, useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa'
import API from '../services/api';
import { toast } from 'react-toastify';

const OurStory = () => {
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  },[])
  const [data, sendData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const onChange = (e) => {
    const {name, value} = e.target;
    sendData((old_data)=>{
      return {
        ...old_data,
        [name]:value
      }
    })
  }
  const sendMail = async() => {
    try{
      const {name, email, message} = data
      if(!name || !email || !message){
        throw new Error("Please fill all the fields")
      }
      await API.post('auth/sendmail', {
        email, message, name
      })
      toast.success("Message Sent Successfully")
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
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
            <p className="text-xl text-white">Welcome to Fortune Gate Biodynamic Farm. Since 2016, we’ve been committed to pure, organic milk through sustainable practices.</p>
        </div>
        </section>
                  {/* Introduction Section */}
      <section className="px-4 py-16 mx-auto">
        <div className="container mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-5 gap-4">
        <img src="https://via.placeholder.com/600x400" alt="Mission Image" className="mx-auto rounded-lg shadow-lg  md:col-span-2" />

            <div className=" md:col-span-3">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg mb-4">
          Founded in 2016, our journey began with a simple yet profound mission: to promote good health through pure and organic products. Drawing inspiration from the wisdom of our ancestors, we strive to revive the old culture of natural farming and sustainable living. At Fortune Gate Biodynamic Farm, we are committed to producing the finest quality milk by nurturing our cows with the utmost care and respect.

Our A2A2 certified cows graze freely under the sun and moon, fed with a carefully curated diet of Dasha flowers and Nava grains. We believe in a holistic approach, where the health of our cows directly influences the purity of our milk. After the calves have had their fill, we collect the remaining milk, ensuring it is of the highest quality. Our farming practices are not about mass production but about providing the best products for future generations. This dedication to quality over quantity means we produce less milk but with unmatched purity and nutritional value.
          </p>
            </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="px-4 bg-green-100 py-16 mx-auto">
        <div className="container mx-auto text-center md:text-right grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className=" md:col-span-3">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
          Our mission is to offer the purest and healthiest organic milk products, preserving the essence of natural farming for generations to come. We are deeply committed to biodynamic farming practices that respect and enhance the natural environment. Our farm is not driven by profit but by a passion for promoting health and well-being in our community.

We stand firm against the use of artificial enhancers and harmful chemicals that have become prevalent in modern agriculture. Our cows are fed 100% natural fodders, and our ghee is produced through traditional methods, ensuring it retains its natural benefits and purity. By focusing on quality and sustainability, we aim to combat the decline in food quality brought about by the White and Green Revolutions.

At Navajeevana, we are dedicated to creating products that are not only good for you but also good for the planet. Our ghee, made from the milk of freely grazing cows, is a testament to our commitment to health and tradition. We believe in the power of pure, unadulterated food to nourish the body and soul, and we are proud to bring these exceptional products to your table.
          </p>
            </div>
          <img src="https://via.placeholder.com/600x400" alt="Mission Image" className="mx-auto rounded-lg shadow-lg  md:col-span-2" />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/100x100" alt="Quality Icon" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p>
                  We ensure that all our products meet the highest standards of quality and purity.
                </p>
              </div>
            </div>
            <div className="w-full mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <img src="https://via.placeholder.com/100x100" alt="Sustainability Icon" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p>
                  We are committed to sustainable farming practices that protect the environment.
                </p>
              </div>
            </div>
            <div className="w-full mb-8">
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
      <section className="bg-green-100 py-16">
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
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-6 ">
            We'd love to hear from you! If you have any questions, feedback, or just want to say hello, please reach out to us.
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="">
              <img src="https://via.placeholder.com/500x300" alt="" />
            </div>
            <form className="">
              <div className="mb-4">
                <input
                  value={data.name}
                  onChange={onChange}
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-2 border-none rounded-lg outline outline-gray-200 focus:outline-green-500"
                />
              </div>
              <div className="mb-4">
                <input
                  value={data.email}
                  onChange={onChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border-none rounded-lg outline outline-gray-200 focus:outline-green-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={data.message}
                  onChange={onChange}
                  placeholder="Message"
                  name="message"
                  rows="8"
                  cols="30"
                  className="w-full px-4 py-2 border-none rounded-lg outline outline-gray-200 focus:outline-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white w-full py-3 rounded-lg flex justify-center  font-semibold gap-3"
                onClick={(e) => {
                  e.preventDefault()
                  sendMail()
                }}
              >
                Send 
                <FaRegPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;