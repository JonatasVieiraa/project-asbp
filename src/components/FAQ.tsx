import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Refs para animações
  const headerSection = useInView({ threshold: 0.5 });
  const faqSection = useInView({ threshold: 0.2 });

  const faqs = [
    {
      question: "Qual a capacidade máxima de hospedagem?",
      answer:
        "Nosso sítio tem capacidade para acomodar até 530 pessoas em nossos dormitórios e chalés.",
    },
    {
      question: "Vocês oferecem serviço de alimentação?",
      answer:
        "Sim, oferecemos café da manhã, almoço e jantar. Também podemos adaptar o cardápio conforme necessidades específicas.",
    },
    {
      question: "Como funciona a reserva?",
      answer:
        "Para fazer uma reserva, entre em contato conosco via telefone ou e-mail, para consultar disponibilidade e fazer a reserva.",
    },
    {
      question: "É necessário trazer roupa de cama e banho?",
      answer:
        "Sim. Caso prefira, temos kits de roupa de cama e banho (Travesseiro, fronha, cobertor, lençol e toalha) para locação. Esse valor é cobrado em separado do acampante.",
    },
    {
      question: "Vocês têm wi-fi?",
      answer: "Sim, oferecemos wi-fi gratuito nas áreas comuns do sítio, próximo do escritório, no refeitório e templo.",
    },
    {
      question: "É permitida a pesca no lago?",
      answer:
        "Sim, pesca esportiva com anzol sem fisga. Não fornecemos de equipamento de pesca.",
    },
    {
      question: "Os quartos possuem frigobar e TV?",
      answer:
        "Não, mas temos geladeiras para uso coletivo e TV na sala de reunião.",
    },
    {
      question: "É permitido o acesso de pessoas com bichos de estimação no local?",
      answer:
        "Não, mas está nos nossos planos a construção de espaço para pets.",
    },
    {
      question: "O uso de fogos de artifício é permitido?",
      answer:
        "Não é permitido fogos de artificio com estampido, de acordo com Lei Estadual nº 17.389/21.",
    },
    
  ];

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4">
        {/* Cabeçalho com animação */}
        <div
          ref={headerSection.ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 transform ${
            headerSection.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nosso espaço
          </p>
        </div>

        {/* Container de FAQs com animação */}
        <div
          ref={faqSection.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            faqSection.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`transition-all duration-700 border border-gray-200 rounded-lg shadow-sm overflow-hidden ${
                  faqSection.isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex items-center justify-between w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <HelpCircle
                      className={`w-5 h-5 mr-3 ${
                        openIndex === index ? "text-blue-600" : "text-gray-400"
                      } transition-colors`}
                    />
                    <span
                      className={`font-medium ${
                        openIndex === index ? "text-blue-600" : "text-gray-900"
                      } transition-colors`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div className="ml-6">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out max-h-0 overflow-hidden ${
                    openIndex === index
                      ? "max-h-96 border-t border-gray-100"
                      : "max-h-0"
                  }`}
                >
                  <div className="p-5 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action com animação de entrada mais tardia */}
      <div
        className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          faqSection.isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
        <a
          href="https://wa.me/5515974011407?text=Olá,%20tenho%20algumas%20dúvidas%20sobre%20o%20Acampamento"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition-colors"
        >
          Fale Conosco
        </a>
      </div>

      {/* Estilo para as animações personalizadas */}
      <style>{`
        @keyframes slideDown {
          from { max-height: 0; }
          to { max-height: 500px; }
        }

        @keyframes slideUp {
          from { max-height: 500px; }
          to { max-height: 0; }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
