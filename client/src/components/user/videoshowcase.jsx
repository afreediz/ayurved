import React, { useState } from 'react';
import { Play, Zap, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const allContent = [
    {
      id: 'bFKM5XryJ1w',
      title: 'Premium A2A2 Milk Bilona Ghee - Traditional Process',
      thumbnail: `https://img.youtube.com/vi/bFKM5XryJ1w/maxresdefault.jpg`,
      duration: '5:32',
      views: '12.5K',
      type: 'video',
      featured: true
    },
    {
      id: '3f0k6_O0SL8',
      title: 'Quick Ghee Benefits',
      thumbnail: `https://img.youtube.com/vi/3f0k6_O0SL8/maxresdefault.jpg`,
      views: '25.6K',
      type: 'short'
    },
    {
      id: 'VXwQl0RM8sY',
      title: 'Health Benefits of Pure Bilona Ghee',
      thumbnail: `https://img.youtube.com/vi/VXwQl0RM8sY/maxresdefault.jpg`,
      duration: '8:15',
      views: '9.8K',
      type: 'video'
    },
    {
      id: 'BU3iyu7yh0s',
      title: 'Pure A2 Milk Process',
      thumbnail: `https://img.youtube.com/vi/BU3iyu7yh0s/maxresdefault.jpg`,
      views: '32.1K',
      type: 'short'
    },
    {
      id: 'm9h7Xg7JXfc',
      title: 'From Cow to Kitchen - Our Authentic Process',
      thumbnail: `https://img.youtube.com/vi/m9h7Xg7JXfc/maxresdefault.jpg`,
      duration: '6:45',
      views: '15.2K',
      type: 'video'
    },
    {
      id: 'DkFjUorHB78',
      title: 'Traditional Churning',
      thumbnail: `https://img.youtube.com/vi/DkFjUorHB78/maxresdefault.jpg`,
      views: '18.9K',
      type: 'short'
    },
    {
      id: 'kyvZ3Anv9bA',
      title: 'Why Choose A2A2 Milk for Your Family',
      thumbnail: `https://img.youtube.com/vi/kyvZ3Anv9bA/maxresdefault.jpg`,
      duration: '4:28',
      views: '8.7K',
      type: 'video'
    },
    {
      id: 'iIj0jZ-ajqA',
      title: 'Traditional Bilona Method Explained',
      thumbnail: `https://img.youtube.com/vi/iIj0jZ-ajqA/maxresdefault.jpg`,
      duration: '7:12',
      views: '11.3K',
      type: 'video'
    }
  ];

  const VideoCard = ({ item, className = "" }) => {
    const isShort = item.type === 'short';
    const isFeatured = item.featured;
    
    return (
      <div
        className={`
          ${className}
          bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
          transition-all duration-300 cursor-pointer group relative
          hover:scale-[1.02] hover:-translate-y-1
          ${isFeatured ? 'ring-2 ring-green-400' : ''}
          ${isShort ? 'bg-gradient-to-br from-purple-50 to-pink-50' : ''}
        `}
        onClick={() => setSelectedVideo(item)}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {isFeatured && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Featured
            </div>
          )}
          {isShort && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Zap className="w-3 h-3" />
              Short
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-8 h-8 text-green-600" fill="currentColor" />
            </div>
          </div>
          
          
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-transparent bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
              A2A2 Milk Bilona Ghee
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience our journey from traditional dairy farming to your kitchen
          </p>
        </div>

        {/* Improved Bento Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[660px] ">
          {/* Featured Video - Large */}
          <VideoCard 
            item={allContent[0]} 
            className="col-span-12 md:col-span-6 row-span-6"
          />
          
          {/* Two shorts stacked */}
          <VideoCard 
            item={allContent[1]} 
            className="col-span-6 md:col-span-3 row-span-3"
          />
          <VideoCard 
            item={allContent[3]} 
            className="col-span-6 md:col-span-3 row-span-3"
          />
           <VideoCard 
            item={allContent[5]} 
            className="col-span-6 md:col-span-3 row-span-3"
          />
           <VideoCard 
            item={allContent[7]} 
            className="col-span-6 md:col-span-3 row-span-3"
          />
          
          {/* Medium video */}
          <VideoCard 
            item={allContent[2]} 
            className="col-span-12 md:col-span-4 row-span-4"
          />
          
          {/* Three videos in a row */}
          <VideoCard 
            item={allContent[4]} 
            className="col-span-4 md:col-span-5 row-span-4"
          />
          <VideoCard 
            item={allContent[6]} 
            className="col-span-4 md:col-span-3 row-span-4"
          />
    
         
        </div>
        <div className="flex justify-center items-center">
           <Link to="/gallery">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 w-full md:w-auto">
                  View Our Gallery
                </button>
                </Link>
        </div>

       

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6">
              

                <Link to="/allproducts">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 w-full md:w-auto">
                  Shop Our Ghee
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VideoShowcase;