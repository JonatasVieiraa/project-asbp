import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Contact = () => {
  const header = useInView({ threshold: 0.5 });
  const content = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 bg-white" id="contato">
      <div className="container mx-auto px-4">
        <div 
          ref={header.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            header.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos à disposição para ajudar você a planejar seu evento
          </p>
        </div>

        <div 
          ref={content.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-300 transform ${
            content.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-gray-600">(XX) XXXX-XXXX</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-gray-600">contato@sitiobompastor.com.br</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-gray-600">Estrada do Sítio, XX - Cidade/Estado</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1598462372434!2d-46.6938891!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjkiUyA0NsKwNDEnMzguMCJX!5e0!3m2!1sen!2sbr!4v1625761234567!5m2!1sen!2sbr"
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

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-colors"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </section>
  );
};

export default Contact