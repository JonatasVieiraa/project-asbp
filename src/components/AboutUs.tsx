import React, { useState } from "react";
import { Heart, Users, Home, Utensils, CheckCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUs: React.FC = () => {
  const imageSection = useInView({ threshold: 0.5 });
  const contentSection = useInView({ threshold: 0.5 });

  const [currentSlide, setCurrentSlide] = useState(0);

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-100",
      title: "Nossa Missão",
      description:
        "Criar um ambiente acolhedor, confortável e seguro para retiros e eventos cristãos.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      title: "Nossa Comunidade",
      description:
        "Recebemos igrejas e grupos cristãos de todas as denominações, promovendo unidade e comunhão.",
    },
    {
      icon: <Home className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      title: "Nossa Estrutura",
      description:
        "Com capacidade para 530 pessoas em pernoite e 700 para Day Camp, temos suítes climatizadas e espaços de lazer.",
    },
    {
      icon: <Utensils className="w-8 h-8 text-red-600" />,
      bgColor: "bg-red-100",
      title: "Nossa Gastronomia",
      description:
        "Refeitório climatizado, cardápio variado e refeições temáticas para tornar sua experiência ainda mais especial.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-100",
      title: "Excelência no Atendimento",
      description:
        "Nosso compromisso é oferecer o melhor serviço, priorizando o fator humano e o bem-estar dos visitantes.",
    },
  ];

  const sliderSettings = {
    dots: false, // Removemos os dots padrão do Slider
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (next: number) => setCurrentSlide(next),
  };

  return (
    <section className="py-20 bg-white" id="sobre">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div
            ref={imageSection.ref as React.RefObject<HTMLDivElement>}
            className={`md:w-1/2 transition-all duration-1000 transform ${
              imageSection.isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1464082354059-27db6ce50048?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Vista do Sítio Bom Pastor"
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div
            ref={contentSection.ref as React.RefObject<HTMLDivElement>}
            className={`md:w-1/2 transition-all duration-1000 transform ${
              contentSection.isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Um Espaço de Paz e Comunhão
            </h3>
            <p className="text-gray-600 mb-6">
              Fundado em 1997, o Sítio Bom Pastor é um espaço dedicado a
              retiros, comunhão e crescimento espiritual. Localizado a 130 km de
              São Paulo, em Capela do Alto, proporciona um ambiente ideal para
              descanso, reflexão e conexão com Deus.
            </p>
          </div>
        </div>

        {/* Carrossel para Mobile com Paginação Personalizada */}
        <div className="md:hidden mt-8 relative">
          <Slider {...sliderSettings}>
            {values.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div
                  className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </Slider>

          {/* Paginação Personalizada */}
          <div className="absolute  left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {values.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-black w-8"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid para Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-8">
          {values.slice(0, 3).map((item, index) => (
            <div key={index} className="text-center p-6">
              <div
                className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:w-2/3 mx-auto mt-8">
          {values.slice(3, 5).map((item, index) => (
            <div key={index} className="text-center p-6">
              <div
                className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
