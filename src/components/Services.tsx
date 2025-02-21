import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Biblioteca para animações
import { Swiper, SwiperSlide } from "swiper/react"; // Biblioteca de Slider
import { Navigation, Autoplay } from "swiper/modules"; // Módulos adicionais do Swiper
import "swiper/css"; // Importando estilos do Swiper
import "swiper/css/navigation"; // Estilos para navegação (setas)
import {
  Church,
  Users,
  Heart,
  Sun,
} from "lucide-react";

const Services = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    { 
      icon: <Sun className="w-8 h-8 text-primary" />, 
      title: 'TEMPORADA DE FÉRIAS', 
      description: 'Férias inesquecíveis para crianças e adolescentes.',
      whatsapp: "https://wa.me/5599999999999?text=Olá!%20Quero%20saber%20mais%20sobre%20a%20Temporada%20de%20Férias."
    },
    { 
      icon: <Church className="w-8 h-8 text-primary" />, 
      title: 'IGREJAS', 
      description: 'Ambiente ideal para retiros espirituais.', 
      whatsapp: "https://wa.me/5599999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20retiros%20para%20igrejas."
    },
    { 
      icon: <Users className="w-8 h-8 text-primary" />, 
      title: 'CORPORATIVO', 
      description: 'Espaço para treinamentos e integração de equipes.',
      whatsapp: "https://wa.me/5599999999999?text=Olá!%20Quero%20mais%20informações%20sobre%20eventos%20corporativos."
    },
    { 
      icon: <Heart className="w-8 h-8 text-primary" />, 
      title: 'RETIRO DE JOVENS', 
      description: 'Estrutura completa para eventos e encontros.',
      whatsapp: "https://wa.me/5599999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20retiros%20de%20jovens."
    },
    { 
      icon: <Heart className="w-8 h-8 text-primary" />, 
      title: 'RETIRO DE CASAIS', 
      description: 'Ambiente romântico e aconchegante para casais.',
      whatsapp: "https://wa.me/5599999999999?text=Olá!%20Quero%20informações%20sobre%20retiros%20de%20casais."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="servicos">
      {/* Background com efeito Parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white"
        style={{ backgroundAttachment: "fixed" }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nossos Serviços
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça tudo o que podemos oferecer para seu evento
          </motion.p>
        </div>

        {/* Exibição Mobile - Slider com Paginação Personalizada */}
        {isMobile ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="p-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden bg-white"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>

                  {/* Botão Saiba Mais */}
                  <a 
                    href={service.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 inline-block px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
                  >
                    Saiba Mais
                  </a>
                </motion.div>
              </SwiperSlide>
            ))}

            {/* Paginação Personalizada */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-blue-500 w-8'
                      : 'bg-blue-200 hover:bg-white/75'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>

            
          </Swiper>
        ) : (
          // Exibição Desktop - Grid
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer relative overflow-hidden bg-white"
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;
