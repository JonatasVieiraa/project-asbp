import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Definindo interfaces para a tipagem correta
interface DetailItem {
  name: string;
  description: string;
}

interface ImageDetails {
  default?: DetailItem[];
  chalés?: DetailItem[];
  apartamentos?: DetailItem[];
  alojamentos?: DetailItem[];
  esportes?: DetailItem[];
  aventura?: DetailItem[];
  aquaticas?: DetailItem[];
  outras?: DetailItem[];
  adultos?: DetailItem[];
  crianças?: DetailItem[];
  [key: string]: DetailItem[] | undefined; // Index signature para permitir acesso dinâmico
}

interface GalleryImage {
  url: string;
  title: string;
  description: string;
  details: ImageDetails;
}

const Gallery = () => {
  // Estados para controle do carrossel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Estados para os cards expansíveis
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("default");
  
  // Refs para animações
  const header = useInView({ threshold: 0.5 });
  const carouselSection = useInView({ threshold: 0.2 });
  const indicatorsSection = useInView({ threshold: 0.8 });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Array com todos os dados - agora tipado corretamente
  const images: GalleryImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Refeitório',
      description: 'Ambiente acolhedor para suas refeições com capacidade para 300 pessoas',
      details: {
        default: [
          { name: 'Capacidade', description: 'Comporta até 300 pessoas simultaneamente' },
          { name: 'Buffet', description: 'Sistema self-service com opções para todas as dietas' },
          { name: 'Horários', description: 'Café: 7h-9h, Almoço: 12h-14h, Jantar: 18h-20h' }
        ]
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Templo',
      description: 'Espaço dedicado para momentos de oração e celebração',
      details: {
        default: [
          { name: 'Capacidade', description: 'Acomoda até 400 pessoas sentadas' },
          { name: 'Estrutura', description: 'Altar, púlpito, sistema de som profissional' },
          { name: 'Climatização', description: 'Ambiente climatizado para maior conforto' }
        ]
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Chalés e Apartamentos',
      description: 'Acomodações confortáveis para seu descanso e relaxamento',
      details: {
        chalés: [
          { name: 'Chalé Familiar', description: 'Acomoda até 6 pessoas, com cozinha e varanda' },
          { name: 'Chalé Casal', description: 'Ideal para casais, com vista privilegiada' }
        ],
        apartamentos: [
          { name: 'Apto Standard', description: 'Acomoda até 4 pessoas com banheiro privativo' },
          { name: 'Apto Superior', description: 'Acomoda até 4 pessoas, com ar-condicionado' }
        ],
        alojamentos: [
          { name: 'Alojamento Coletivo', description: 'Beliches para grupos, banheiros compartilhados' }
        ]
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Área de Lazer',
      description: 'Espaços de convivência e integração ao ar livre',
      details: {
        default: [
          { name: 'Espaço Fogueira', description: 'Local preparado para fogueiras noturnas' },
          { name: 'Quiosques', description: 'Espaços cobertos com churrasqueiras e mesas' },
          { name: 'Redário', description: 'Área arborizada com redes para descanso' }
        ]
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Esportes e Diversão',
      description: 'Quadras poliesportivas e espaços para atividades recreativas',
      details: {
        esportes: [
          { name: 'Campo de Futebol', description: 'Gramado natural com medidas oficiais' },
          { name: 'Ginásio Poliesportivo', description: 'Coberto, com quadra para diversas modalidades' },
          { name: 'Quadra de Areia', description: 'Para vôlei de praia e beach tennis' }
        ],
        aventura: [
          { name: 'Tirolesa', description: '300m de extensão com vista panorâmica' },
          { name: 'Arborismo', description: 'Circuito entre árvores com diferentes níveis' },
          { name: 'Paredão de Escalada', description: '8m de altura com diferentes graus de dificuldade' }
        ],
        aquaticas: [
          { name: 'Tobo-água', description: 'Escorregador aquático com 50m de extensão' }
        ],
        outras: [
          { name: 'Passeio a Cavalo', description: 'Trilha guiada pela propriedade' }
        ]
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Piscinas',
      description: 'Piscinas para adultos e crianças com área de descanso',
      details: {
        adultos: [
          { name: 'Piscina Semiolímpica', description: '25m de comprimento, ideal para natação' },
          { name: 'Piscina Recreativa', description: 'Com cascata e hidromassagem' }
        ],
        crianças: [
          { name: 'Piscina Infantil', description: 'Rasa e segura, com brinquedos aquáticos' },
          { name: 'Splash Zone', description: 'Área com jatos de água para diversão' }
        ]
      }
    }
  ];

  // Gerenciamento responsivo
  const updateVisibleImages = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleImages(1);
    } else if (width < 1024) {
      setVisibleImages(2);
    } else {
      setVisibleImages(3);
    }
  }, []);

  useEffect(() => {
    updateVisibleImages();
    window.addEventListener('resize', updateVisibleImages);
    return () => window.removeEventListener('resize', updateVisibleImages);
  }, [updateVisibleImages]);

  // Calcular índices de imagens visíveis no slide atual
  const calculateVisibleIndices = () => {
    const startIndex = currentSlide * visibleImages;
    const endIndex = Math.min(startIndex + visibleImages, images.length);
    return Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);
  };

  // Número total de slides
  const totalSlides = Math.ceil(images.length / visibleImages);

  // Controle de expansão dos cards
  const handleExpandCard = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
      const tabs = Object.keys(images[index].details);
      setActiveTab(tabs[0]);
    }
  };

  // Navegação
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Primeiro definimos a transparência para fazer uma transição suave
    const carousel = carouselRef.current?.querySelector('.flex');
    if (carousel) {
      carousel.classList.add('opacity-0');
    }
    
    // Depois de um pequeno delay, mudamos o slide
    setTimeout(() => {
      setCurrentSlide(prevSlide => {
        const nextSlide = prevSlide + 1;
        return nextSlide >= totalSlides ? 0 : nextSlide;
      });
      
      // Restauramos a opacidade
      setTimeout(() => {
        if (carousel) {
          carousel.classList.remove('opacity-0');
        }
        setIsTransitioning(false);
      }, 100);
    }, 400);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Primeiro definimos a transparência para fazer uma transição suave
    const carousel = carouselRef.current?.querySelector('.flex');
    if (carousel) {
      carousel.classList.add('opacity-0');
    }
    
    // Depois de um pequeno delay, mudamos o slide
    setTimeout(() => {
      setCurrentSlide(prevSlide => {
        const nextSlide = prevSlide - 1;
        return nextSlide < 0 ? totalSlides - 1 : nextSlide;
      });
      
      // Restauramos a opacidade
      setTimeout(() => {
        if (carousel) {
          carousel.classList.remove('opacity-0');
        }
        setIsTransitioning(false);
      }, 100);
    }, 400);
  }, [totalSlides, isTransitioning]);

  // Auto-play com tempo aumentado
  useEffect(() => {
    if (isHovered || isTransitioning || expandedCard !== null) return;
    
    const interval = setInterval(nextSlide, 7000); // Aumentei para 7 segundos
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, isTransitioning, expandedCard]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'BUTTON') {
        if (e.key === 'ArrowLeft') prevSlide();
        else if (e.key === 'ArrowRight') nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Ajustar currentSlide quando totalSlides muda
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(Math.max(0, totalSlides - 1));
    }
  }, [totalSlides, currentSlide]);

  // Renderizar apenas os cards visíveis no slide atual
  const visibleIndices = calculateVisibleIndices();

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

        <div 
          className="relative" 
          ref={carouselRef}
        >
          <div 
            ref={carouselSection.ref as React.RefObject<HTMLDivElement>}
            className={`overflow-hidden transition-all duration-1200 ${
              carouselSection.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex flex-wrap transition-opacity duration-700 ease-in-out">
              {visibleIndices.map((index, i) => {
                const image = images[index];
                return (
                  <div
                    key={index}
                    className={`transform transition-all duration-700 ease-in-out px-4 ${
                      visibleImages === 1 ? 'w-full' :
                      visibleImages === 2 ? 'w-1/2' :
                      'w-1/3'
                    }`}
                    style={{ 
                      transitionDelay: `${i * 150}ms`,
                      opacity: carouselSection.isInView ? 1 : 0,
                      transform: carouselSection.isInView ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    {/* Card Principal */}
                    <div className="mb-8">
                      <div 
                        className="relative aspect-video overflow-hidden rounded-lg group"
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                      >
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
                      
                      {/* Botão Expandir */}
                      <button 
                        onClick={() => handleExpandCard(index)}
                        className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                      >
                        {expandedCard === index ? (
                          <>
                            <span>Ver menos</span>
                            <ChevronUp className="ml-2 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Ver mais</span>
                            <ChevronDown className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Conteúdo Expandido */}
                    {expandedCard === index && (
                      <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-500 animate-fadeIn">
                        {/* Sistema de Tabs */}
                        {Object.keys(image.details).length > 1 && (
                          <div className="flex flex-wrap gap-2 mb-6 border-b">
                            {Object.keys(image.details).map(tab => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                                  activeTab === tab
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Lista de atividades - Agora com tipagem correta e animação */}
                        <div className="space-y-4">
                          {image.details[activeTab]?.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="bg-gray-50 p-4 rounded-md transition-all"
                              style={{ 
                                transitionDelay: `${idx * 100}ms`,
                                animation: 'fadeSlideUp 0.5s ease forwards',
                                animationDelay: `${idx * 100}ms`
                              }}
                            >
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-gray-600 mt-1">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões de navegação com animação */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-32 transform -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-500 ${
                  carouselSection.isInView ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Imagem anterior"
                disabled={isTransitioning}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-0 top-32 transform translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-500 ${
                  carouselSection.isInView ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Próxima imagem"
                disabled={isTransitioning}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores com animação */}
        {totalSlides > 1 && (
          <div 
            ref={indicatorsSection.ref as React.RefObject<HTMLDivElement>}
            className={`flex justify-center mt-8 space-x-2 transition-all duration-1000 delay-300 ${
              indicatorsSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

    
    </section>
  );
};

export default Gallery;