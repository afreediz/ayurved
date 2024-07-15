import React from 'react';

const VideoCard = ({ videoSrc, title, price }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative pb-96"> {/* Increase the height to 75% of the width */}
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
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">Starting from ₹{price}</p>
          <button className="mt-2 w-full bg-green-700 text-white py-2 rounded">Shop Now</button>
        </div>
      </div>
    );
  };
  
  

const ProductVideos = () => {
  const videos = [
    { src: "/videos/vid1.mp4", title: "Bringadi thailam intense", price: 595 },
    { src: "/videos/vid2.mp4", title: "Bringadi thailam intense", price: 595 },
    { src: "/videos/vid3.mp4", title: "Bringadi thailam intense", price: 595 },
    { src: "/videos/vid1.mp4", title: "Bringadi Intensive Repair", price: 995 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Explore & Shop</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={index} videoSrc={video.src} title={video.title} price={video.price} />
        ))}
      </div>
    </div>
  );
};

export default ProductVideos;
