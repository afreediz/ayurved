import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, Play, Camera, Video, ChevronLeft, ChevronRight, ZoomIn, Grid, List } from 'lucide-react';

// Intersection Observer Hook for Lazy Loading
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        });

        observer.observe(element);
        return () => observer.unobserve(element);
    }, []);

    return [elementRef, isIntersecting];
};

// Optimized Gallery Item Component
const GalleryItem = React.memo(({ item, index, onClick, viewMode }) => {
    const [elementRef, isVisible] = useIntersectionObserver();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
        setImageLoaded(true);
    }, []);

    const handleClick = useCallback(() => {
        onClick(item, index);
    }, [item, index, onClick]);

    const gridClass = viewMode === 'masonry' 
        ? "group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white break-inside-avoid mb-4"
        : "group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white";

    return (
        <div
            ref={elementRef}
            className={gridClass}
            onClick={handleClick}
            style={viewMode === 'masonry' ? { display: 'inline-block', width: '100%' } : {}}
        >
            <div className={viewMode === 'grid' ? "aspect-square relative overflow-hidden" : "relative overflow-hidden"}>
                {isVisible ? (
                    <>
                        {!imageLoaded && !imageError && (
                            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                                <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                        
                        {item.type === 'image' && !imageError ? (
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                loading="lazy"
                                decoding="async"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                style={viewMode === 'masonry' ? { height: 'auto', display: 'block' } : {}}
                            />
                        ) : item.type === 'video' ? (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <Video className="w-12 h-12 text-gray-400" />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">Image not found</p>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        {item.type === 'image' ? (
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                        ) : (
                            <Play className="w-8 h-8 text-white drop-shadow-lg" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

GalleryItem.displayName = 'GalleryItem';

export default function GalleryPage() {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'
    const [preloadedImages, setPreloadedImages] = useState(new Set());

    // Preload images for better performance
    const preloadImage = useCallback((src) => {
        if (preloadedImages.has(src)) return;
        
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setPreloadedImages(prev => new Set([...prev, src]));
        };
    }, [preloadedImages]);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadMediaItems();
    }, []);

    const loadMediaItems = useCallback(() => {
        const items = [];
        
        // Load images (1.jpeg to 26.jpeg)
        for (let i = 1; i <= 26; i++) {
            const src = `/images/gallery/${i}.jpeg`;
            items.push({
                id: `img-${i}`,
                type: 'image',
                src,
                thumbnail: src,
                alt: `Gallery image ${i}`
            });
        }

        // Future video support
        // for (let i = 1; i <= 10; i++) {
        //     items.push({
        //         id: `video-${i}`,
        //         type: 'video',
        //         src: `/images/gallery/${i}.mp4`,
        //         thumbnail: `/images/gallery/${i}-thumb.jpg`,
        //         alt: `Gallery video ${i}`
        //     });
        // }

        setMediaItems(items);
        setLoading(false);

        // Preload first few images
        items.slice(0, 6).forEach(item => {
            if (item.type === 'image') {
                setTimeout(() => preloadImage(item.src), 100);
            }
        });
    }, [preloadImage]);

    const openLightbox = useCallback((item, index) => {
        setSelectedMedia({ ...item, index });
        
        // Preload adjacent images for smoother navigation
        const filteredItems = getFilteredItems();
        const prevIndex = index > 0 ? index - 1 : filteredItems.length - 1;
        const nextIndex = index < filteredItems.length - 1 ? index + 1 : 0;
        
        [prevIndex, nextIndex].forEach(idx => {
            const adjacentItem = filteredItems[idx];
            if (adjacentItem && adjacentItem.type === 'image') {
                preloadImage(adjacentItem.src);
            }
        });
    }, [preloadImage]);

    const closeLightbox = useCallback(() => {
        setSelectedMedia(null);
    }, []);

    const navigateLightbox = useCallback((direction) => {
        if (!selectedMedia) return;
        
        const filteredItems = getFilteredItems();
        const currentIndex = selectedMedia.index;
        let newIndex;
        
        if (direction === 'next') {
            newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
        }
        
        const newItem = filteredItems[newIndex];
        setSelectedMedia({ ...newItem, index: newIndex });
        
        // Preload next images
        const nextIdx = direction === 'next' 
            ? (newIndex < filteredItems.length - 1 ? newIndex + 1 : 0)
            : (newIndex > 0 ? newIndex - 1 : filteredItems.length - 1);
        
        const nextItem = filteredItems[nextIdx];
        if (nextItem && nextItem.type === 'image') {
            preloadImage(nextItem.src);
        }
    }, [selectedMedia, preloadImage]);

    const getFilteredItems = useCallback(() => {
        if (filter === 'all') return mediaItems;
        return mediaItems.filter(item => item.type === filter);
    }, [filter, mediaItems]);

    const filteredItems = useMemo(() => getFilteredItems(), [getFilteredItems]);

    // Optimized keyboard handler
    const handleKeyPress = useCallback((e) => {
        if (!selectedMedia) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox('next');
                break;
        }
    }, [selectedMedia, closeLightbox, navigateLightbox]);

    useEffect(() => {
        if (selectedMedia) {
            document.addEventListener('keydown', handleKeyPress);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.body.style.overflow = 'unset';
        };
    }, [selectedMedia, handleKeyPress]);

    // Memoized grid component
    const GalleryGrid = useMemo(() => {
        const gridClass = viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max"
            : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4";

        return (
            <div className={gridClass}>
                {filteredItems.map((item, index) => (
                    <GalleryItem
                        key={item.id}
                        item={item}
                        index={index}
                        onClick={openLightbox}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        );
    }, [filteredItems, viewMode, openLightbox]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading gallery...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
                        Our <span className="text-green-200">Gallery</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                        Capturing moments from our sustainable farm life and A2-A2 milk journey
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    {/* Filter Buttons */}
                    <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                                filter === 'all' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:text-green-600'
                            }`}
                        >
                            <Camera className="w-4 h-4" />
                            All ({mediaItems.length})
                        </button>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200 flex">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                viewMode === 'grid' 
                                    ? 'bg-green-500 text-white' 
                                    : 'text-gray-600 hover:text-green-600'
                            }`}
                            title="Grid View"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('masonry')}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                viewMode === 'masonry' 
                                    ? 'bg-green-500 text-white' 
                                    : 'text-gray-600 hover:text-green-600'
                            }`}
                            title="Masonry View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                {GalleryGrid}

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No media found</p>
                    </div>
                )}
            </div>

            {/* Optimized Lightbox Modal */}
            {selectedMedia && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && closeLightbox()}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all duration-200 backdrop-blur-sm"
                        aria-label="Close gallery"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons */}
                    {filteredItems.length > 1 && (
                        <>
                            <button
                                onClick={() => navigateLightbox('prev')}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all duration-200 backdrop-blur-sm"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => navigateLightbox('next')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all duration-200 backdrop-blur-sm"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Media Content */}
                    <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                        {selectedMedia.type === 'image' ? (
                            <img
                                src={selectedMedia.src}
                                alt={selectedMedia.alt}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/800/600';
                                }}
                            />
                        ) : (
                            <video
                                src={selectedMedia.src}
                                controls
                                className="max-w-full max-h-full rounded-lg shadow-2xl"
                                autoPlay
                                preload="metadata"
                            />
                        )}
                    </div>

                    {/* Media Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 rounded-full text-white text-sm backdrop-blur-sm">
                        {selectedMedia.index + 1} of {filteredItems.length}
                    </div>
                </div>
            )}
        </main>
    );
}