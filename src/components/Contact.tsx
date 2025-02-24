import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

const Contact = () => {
  const header = useInView({ threshold: 0.5 });
  const contactCards = useInView({ threshold: 0.3 });
  const mapSection = useInView({ threshold: 0.2 });

  // Dados dos cartões de contato para facilitar a animação em cascata
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telefone",
      details: "(15) 97401-1407",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "E-mail",
      details: "contato@sitiobompastor.com.br",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Endereço",
      details:
        "Estrada Municipal Severino de Oliveira, 2001 - Bairro da Canguera, Capela do Alto – SP CEP 18195-970 – Caixa Postal 11",
    },
  ];

  return (
    <section className="py-20 bg-white" id="contato">
      <div className="container mx-auto px-4">
        {/* Cabeçalho com animação fade-in + slide-up */}
        <div
          ref={header.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            header.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos à disposição para ajudar você a planejar seu evento
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Grid de cartões de contato com animação em cascata */}
          <div
            ref={contactCards.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {contactInfo.map((item, index) => (
              <div
                key={item.title}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  opacity: contactCards.isInView ? 1 : 0,
                  transform: contactCards.isInView
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "opacity 800ms ease, transform 800ms ease",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mapa com animação de fade-in + scale */}
          <div
            ref={mapSection.ref as React.RefObject<HTMLDivElement>}
            className="overflow-hidden rounded-lg shadow-lg"
            style={{
              height: "400px",
              opacity: mapSection.isInView ? 1 : 0,
              transform: mapSection.isInView ? "scale(1)" : "scale(0.98)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "300ms",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1829.6640899805027!2d-47.716572!3d-23.484686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c5e97a7004e05f%3A0x3b41d28b8313e55e!2sAcampamento%20S%C3%ADtio%20Bom%20Pastor!5e0!3m2!1spt-BR!2sus!4v1740421709221!5m2!1spt-BR!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localização do Sítio Bom Pastor"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Botão do WhatsApp com animação avançada */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Primeira camada de efeito pulsante */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping"></div>

        {/* Segunda camada de efeito pulsante */}
        <div
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-pulse"
          style={{ animationDuration: "3s" }}
        ></div>

        {/* Botão principal com tooltip */}
        <a
          href="https://wa.me/5515974011407?text=Olá,%20gostaria%20de%20mais%20informações"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center bg-[#25D366] hover:bg-[#20bf5b] w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-10"
          aria-label="Contato via WhatsApp"
        >
          {/* Ícone oficial atualizado */}
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>

          {/* Tooltip */}
          <span className="absolute whitespace-nowrap right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Fale conosco pelo WhatsApp
            <span className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-gray-800"></span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
