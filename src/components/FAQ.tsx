import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Qual a capacidade máxima de hospedagem?',
      answer: 'Nosso sítio tem capacidade para acomodar até X pessoas em nossos dormitórios e chalés.'
    },
    {
      question: 'Vocês oferecem serviço de alimentação?',
      answer: 'Sim, oferecemos café da manhã, almoço e jantar. Também podemos adaptar o cardápio conforme necessidades específicas.'
    },
    {
      question: 'Como funciona a reserva?',
      answer: 'Para fazer uma reserva, entre em contato conosco via telefone ou e-mail. Solicitamos um sinal de X% para confirmar a data.'
    },
    {
      question: 'Qual a infraestrutura disponível?',
      answer: 'Contamos com capela, salão de eventos, dormitórios, refeitório, área de lazer, campo de futebol e piscina.'
    },
    {
      question: 'Vocês têm wi-fi?',
      answer: 'Sim, oferecemos wi-fi gratuito nas áreas comuns do sítio.'
    },
    {
      question: 'Qual a antecedência necessária para reservar?',
      answer: 'Recomendamos fazer a reserva com pelo menos 2 meses de antecedência, especialmente para eventos maiores.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nosso espaço
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <button
                className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-left font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-6 bg-white border-t">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;