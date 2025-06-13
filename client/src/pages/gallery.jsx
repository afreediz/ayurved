import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X, Play, Camera, Video, ChevronLeft, ChevronRight, ZoomIn, Grid, LayoutGrid } from 'lucide-react';

// Optimized Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
    const elementsRef = useRef(new Map());
    const [visibleElements, setVisibleElements] = useState(new Set());
    const observerRef = useRef(null);

    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    setVisibleElements(prev => {
                        const newVisible = new Set(prev);
                        entries.forEach(entry => {
                            const id = entry.target.dataset.id;
                            if (entry.isIntersecting) {
                                newVisible.add(id);
                            } else {
                                newVisible.delete(id);
                            }
                        });
                        return newVisible;
                    });
                },
                { threshold: 0.1, rootMargin: '100px', ...options }
            );
        }

        const currentElements = elementsRef.current;
        currentElements.forEach((element) => {
            if (element) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const observe = useCallback((id, element) => {
        if (element && observerRef.current) {
            elementsRef.current.set(id, element);
            element.dataset.id = id;
            observerRef.current.observe(element);
        }
    }, []);

    const unobserve = useCallback((id) => {
        const element = elementsRef.current.get(id);
        if (element && observerRef.current) {
            observerRef.current.unobserve(element);
            elementsRef.current.delete(id);
        }
    }, []);

    return [observe, unobserve, visibleElements];
};

// Optimized Gallery Item Component
const GalleryItem = React.memo(({ item, index, onClick, viewMode, observe, unobserve, visibleElements }) => {
    const elementRef = useRef(null);
    const isVisible = visibleElements.has(item.id);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (elementRef.current) {
            observe(item.id, elementRef.current);
        }
        return () => {
            unobserve(item.id);
        };
    }, [item.id, observe, unobserve]);

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

    const containerClasses = useMemo(() => {
        const baseClasses = "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl";
        
        if (viewMode === 'masonry') {
            return `${baseClasses} rounded-2xl shadow-lg bg-white break-inside-avoid mb-6 transform hover:scale-[1.02]`;
        } else {
            return `${baseClasses} rounded-2xl shadow-lg bg-white transform hover:scale-[1.02]`;
        }
    }, [viewMode]);

    const imageContainerClasses = useMemo(() => {
        return viewMode === 'grid' 
            ? "aspect-square relative overflow-hidden rounded-2xl" 
            : "relative overflow-hidden rounded-2xl";
    }, [viewMode]);

    return (
        <div
            ref={elementRef}
            className={containerClasses}
            onClick={handleClick}
            style={viewMode === 'masonry' ? { display: 'inline-block', width: '100%' } : {}}
        >
            <div className={imageContainerClasses}>
                {isVisible ? (
                    <>
                        {!imageLoaded && !imageError && (
                            <div className="w-full h-full bg-gradient-to-br from-green-50 via-green-100 to-green-200 animate-pulse flex items-center justify-center">
                                <div className="text-center">
                                    <Camera className="w-12 h-12 text-green-400 mx-auto mb-2" />
                                    <div className="w-16 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        )}
                        {item.type === 'image' && !imageError ? (
                            <img
                                src={item.src}
                                alt={item.alt}
                                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                loading="lazy"
                                decoding="async"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                style={viewMode === 'masonry' ? { height: 'auto', display: 'block' } : {}}
                            />
                        ) : item.type === 'video' ? (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                <Video className="w-16 h-16 text-blue-500" />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                <div className="text-center">
                                    <Camera className="w-12 h-12 text-red-400 mx-auto mb-2" />
                                    <p className="text-sm text-red-600 font-medium">Image not found</p>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-pulse"></div>
                )}
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                            {item.type === 'image' ? (
                                <ZoomIn className="w-8 h-8 text-white drop-shadow-2xl" />
                            ) : (
                                <Play className="w-8 h-8 text-white drop-shadow-2xl" />
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Item Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                        {item.alt}
                    </p>
                </div>
            </div>
        </div>
    );
});

GalleryItem.displayName = 'GalleryItem';

// Enhanced Lightbox Component
const Lightbox = React.memo(({ selectedMedia, filteredItems, closeLightbox, navigateLightbox }) => (
    <div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
    >
        {/* Close Button */}
        <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
            aria-label="Close gallery"
        >
            <X className="w-6 h-6" />
        </button>
        
        {/* Navigation Buttons */}
        {filteredItems.length > 1 && (
            <>
                <button
                    onClick={() => navigateLightbox('prev')}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigateLightbox('next')}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </>
        )}
        
        {/* Media Container */}
        <div className="max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {selectedMedia.type === 'image' ? (
                <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                        e.target.src = '/api/placeholder/800/600';
                    }}
                />
            ) : (
                <video
                    src={selectedMedia.src}
                    controls
                    className="max-w-full max-h-full rounded-xl shadow-2xl"
                    autoPlay
                    preload="metadata"
                />
            )}
        </div>
        
        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm border border-white/20">
            <span className="font-medium">{selectedMedia.index + 1}</span>
            <span className="text-white/70 mx-2">of</span>
            <span className="font-medium">{filteredItems.length}</span>
        </div>
    </div>
));

Lightbox.displayName = 'Lightbox';

export default function GalleryPage() {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [preloadedImages, setPreloadedImages] = useState(new Set());
    const [observe, unobserve, visibleElements] = useIntersectionObserver();

    // Generate media items
    const initialMediaItems = useMemo(() => {
        const items = [];
        for (let i = 1; i <= 26; i++) {
            const src = `/images/gallery/${i}.jpeg`;
            const thumbnail = `/images/gallery/thumbnails/${i}-thumb.jpeg`;
            items.push({
                id: `img-${i}`,
                type: 'image',
                src,
                thumbnail,
                alt: `Gallery image ${i}`
            });
        }
        return items;
    }, []);

    const getFilteredItems = useCallback(() => {
        if (filter === 'all') return mediaItems;
        return mediaItems.filter(item => item.type === filter);
    }, [filter, mediaItems]);

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
        setMediaItems(initialMediaItems);
        setLoading(false);
        // Preload first few images
        initialMediaItems.slice(0, 5).forEach(item => {
            if (item.type === 'image') {
                preloadImage(item.src);
            }
        });
    }, [preloadImage, initialMediaItems]);

    const openLightbox = useCallback((item, index) => {
        setSelectedMedia({ ...item, index });
        const filteredItems = getFilteredItems();
        // Preload adjacent images
        const prevIndex = index > 0 ? index - 1 : filteredItems.length - 1;
        const nextIndex = index < filteredItems.length - 1 ? index + 1 : 0;
        [prevIndex, nextIndex].forEach(idx => {
            const adjacentItem = filteredItems[idx];
            if (adjacentItem && adjacentItem.type === 'image') {
                preloadImage(adjacentItem.src);
            }
        });
    }, [preloadImage, getFilteredItems]);

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

        // Preload next image in direction
        const nextIdx = direction === 'next'
            ? (newIndex < filteredItems.length - 1 ? newIndex + 1 : 0)
            : (newIndex > 0 ? newIndex - 1 : filteredItems.length - 1);

        const nextItem = filteredItems[nextIdx];
        if (nextItem && nextItem.type === 'image') {
            preloadImage(nextItem.src);
        }
    }, [selectedMedia, preloadImage, getFilteredItems]);

    const filteredItems = useMemo(() => getFilteredItems(), [getFilteredItems]);

    // Keyboard navigation
    const handleKeyPress = useCallback((e) => {
        if (!selectedMedia) return;
        switch (e.key) {
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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.body.style.overflow = 'unset';
        };
    }, [selectedMedia, handleKeyPress]);

    // Optimized Grid Layout
    const GalleryGrid = useMemo(() => {
        if (viewMode === 'masonry') {
            return (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={openLightbox}
                            viewMode={viewMode}
                            observe={observe}
                            unobserve={unobserve}
                            visibleElements={visibleElements}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={openLightbox}
                            viewMode={viewMode}
                            observe={observe}
                            unobserve={unobserve}
                            visibleElements={visibleElements}
                        />
                    ))}
                </div>
            );
        }
    }, [filteredItems, viewMode, openLightbox, observe, unobserve, visibleElements]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Gallery</h2>
                        <p className="text-gray-600">Preparing your visual journey...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
                <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM26 4v-4h-2v4h-4v2h4v4h2V6h4V4h-4z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}></div>
                <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide">
                        Our <span className="text-green-200 bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">Gallery</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                        Capturing moments from our sustainable farm life and A2-A2 milk journey
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-green-300 to-green-100 rounded-full"></div>
                    </div>
                </div>
                </div>
            

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
                    {/* Filter */}
                    <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-medium ${
                                filter === 'all'
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                            }`}
                        >
                            <Camera className="w-5 h-5" />
                            All Photos ({mediaItems.length})
                        </button>
                    </div>

                
                </div>

                {/* Gallery Grid */}
                {GalleryGrid}

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
                            <Camera className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No media found</h3>
                        <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedMedia && (
                <Lightbox
                    selectedMedia={selectedMedia}
                    filteredItems={filteredItems}
                    closeLightbox={closeLightbox}
                    navigateLightbox={navigateLightbox}
                />
            )}
        </main>
    );
}