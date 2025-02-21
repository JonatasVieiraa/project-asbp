
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const header = useInView({ threshold: 0.5 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Capela',
      description: 'Espaço para momentos de oração e reflexão'
    },
    {
      url: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Área Externa',
      description: 'Natureza exuberante e ar puro'
    },
    {
      url: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Dormitórios',
      description: 'Acomodações confortáveis e acolhedoras'
    },
    {
      url: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Salão de Eventos',
      description: 'Espaço amplo para suas celebrações'
    },
    {
      url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Refeitório',
      description: 'Ambiente agradável para refeições'
    },
    {
      url: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Área de Lazer',
      description: 'Diversão e integração ao ar livre'
    }
  ];

  const totalSlides = Math.ceil(images.length / visibleImages);

  const updateVisibleImages = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleImages(1);
    } else if (width < 1024) {
      setVisibleImages(2);
    } else {
      setVisibleImages(3);
    }
    setCurrentSlide(prev => Math.min(prev, Math.ceil(images.length / visibleImages) - 1));
  }, [images.length]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (!isTransitioning) {
        setIsTransitioning(true);
        timeoutId = window.setTimeout(() => {
          updateVisibleImages();
          setIsTransitioning(false);
        }, 250);
      }
    };

    updateVisibleImages();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateVisibleImages, isTransitioning]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isHovered && !isTransitioning) {
      interval = window.setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, 5000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [totalSlides, isHovered, isTransitioning]);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(prev => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [totalSlides, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'BUTTON') {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section className="py-20 bg-gray-50" id="galeria">
      <div className="container mx-auto px-4">
        <div
          ref={header.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            header.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossa Estrutura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os espaços que preparamos para você
          </p>
        </div>

        <div className="relative" ref={carouselRef}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleImages)}%)`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg group">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-opacity duration-300 ${
                        isHovered === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;