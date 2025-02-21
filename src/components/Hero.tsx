import React, { useState, useEffect } from 'react';
import { Sun, MapPin, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Hero = () => {
  const content = useInView({ threshold: 0.5 });
  const cards = useInView({ threshold: 0.5 });
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative min-h-screen flex items-center" id="inicio">
      {/* Carousel Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImage === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div 
          ref={content.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl transition-all duration-1000 transform ${
            content.isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-left">
           Acampamento <br/>
           Sitio Bom Pastor
          </h1>

          <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl">
            Um espaço único, onde cada momento 
            se transforma em uma experiência memorável.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://wa.me/5515974011407?text=Olá,%20gostaria%20de%20mais%20informações" target='_blank'
              className="group inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Saiba Mais
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#servicos"
             className="group inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Conheça Nossos Espaços
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div
          ref={cards.ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl transition-all duration-1000 delay-500 transform ${
            cards.isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <Sun className="w-6 h-6 text-primary-light flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium">Lazer</h3>
              <p className="text-gray-200 text-sm">Diversão e relaxamento garantidos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <MapPin className="w-6 h-6 text-primary-light flex-shrink-0" />
            <div>
              <h3 className="text-white font-medium">Localização</h3>
              <p className="text-gray-200 text-sm">Fácil acesso e ambiente seguro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent z-10" />
    </div>
  );
};

export default Hero;