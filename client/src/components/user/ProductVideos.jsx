import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ videoSrc, title, price }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div data-aos="fade-up" className="relative pb-96"> {/* Increase the height to 75% of the width */}
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSrc}
            title={title}
            controls
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
    );
  };
  
  

const ProductVideos = () => {
  const videos = [
    { src: "/videos/grinding.mp4", title: "Bringadi thailam intense", price: 595 },
    // { src: "/videos/vid2.mp4", title: "Bringadi thailam intense", price: 595 },
    { src: "/videos/vid3.mp4", title: "Bringadi thailam intense", price: 595 },
    { src: "/videos/vid1.mp4", title: "Bringadi Intensive Repair", price: 995 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-medium mb-6 text-center">Explore & Shop</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {videos.map((video, index) => (
          <VideoCard  key={index} videoSrc={video.src} title={video.title} price={video.price} />
        ))}
      </div>
    </div>
  );
};

export default ProductVideos;
