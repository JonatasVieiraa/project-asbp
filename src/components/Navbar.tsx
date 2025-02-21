import { useState, useEffect } from "react";
import logo from "../img/logo_asbp.svg";
import { Facebook, Instagram, Phone } from "lucide-react";
import SocialIcon from "./SocialIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.error(`Element with id "${sectionId}" not found`);
    }
  };

  return (
    <nav className="fixed w-screen lg:h-32 md:h-28 h-20 z-50 ">
      {/* Barra azul clara superior */}
      <div className="w-full h-2 bg-sky-300" />

      <div className="w-full h-24 bg-[#00A6D8]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("inicio");
              }}
              className="flex items-center lg:pt-4 md:pt-3"
            >
              <img
                src={logo}
                alt="Logo Sítio e Acampamento Bom Pastor"
                className={`lg:h-24 md:h-24 h-20 transition-opacity duration-300 hover:transform hover:scale-105`}
              />
            </a>

            {/* Desktop Menu com Social Icons */}
            <div className="hidden md:flex items-center lg:pt-16 md:pt-8">
              <div className="flex space-x-12 mr-8">
                {[
                  { name: "Início", id: "inicio" },
                  { name: "Sobre", id: "sobre" },
                  { name: "Serviços", id: "servicos" },
                  { name: "Galeria", id: "galeria" },
                  { name: "Contato", id: "contato" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      text-white
                      relative
                      transition-colors
                      hover:text-[#2d3092cf]
                      lg:text-xl
                      md:text-lg
                      font-semibold
                      after:absolute
                      after:bottom-0
                      after:left-0
                      after:h-0.5
                      after:w-full
                      after:origin-left
                      after:scale-x-0
                      after:bg-[#2d3092cf]
                      after:transition-transform
                      after:duration-300
                      hover:after:scale-x-100
                    `}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-2 pb-5 md:">
                <SocialIcon
                  href="https://www.facebook.com/sitiobompastor"
                  icon={Facebook}
                  label="Facebook"
                  color="bg-[#1877F2]"
                />
                <SocialIcon
                  href="https://www.instagram.com/acampamentositiobompastor/"
                  icon={Instagram}
                  label="Instagram"
                  color="bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FD1D1D]"
                />
                <SocialIcon
                  href="https://wa.me/5515974011407?text=Olá,%20gostaria%20de%20mais%20informações"
                  icon={Phone}
                  label="WhatsApp"
                  color="bg-[#25D366]"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "rotate-45 top-3" : "rotate-0 top-1"}`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "opacity-0" : "opacity-100"} top-3`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
                    ${isMenuOpen ? "-rotate-45 top-3" : "rotate-0 top-5"}`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed inset-x-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-full pointer-events-none"
            }`}
          >
            <div className="px-4 py-6 space-y-2">
              {[
                { name: "Início", id: "inicio" },
                { name: "Sobre", id: "sobre" },
                { name: "Serviços", id: "servicos" },
                { name: "Galeria", id: "galeria" },
                { name: "Contato", id: "contato" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="
                    block 
                    w-full 
                    text-left 
                    px-4 
                    py-3 
                    text-gray-600
                    relative
                    transition-colors
                    hover:text-[#88CDEB]
                    after:absolute
                    after:bottom-0
                    after:left-4
                    after:h-0.5
                    after:w-[calc(100%-2rem)]
                    after:origin-left
                    after:scale-x-0
                    after:bg-[#88CDEB]
                    after:transition-transform
                    after:duration-300
                    hover:after:scale-x-100
                  "
                >
                  {item.name}
                </button>
              ))}

              {/* Social Media Icons for Mobile */}
              <div className="flex justify-center space-x-8 pt-4">
                <SocialIcon
                  href="https://www.facebook.com/sitiobompastor"
                  icon={Facebook}
                  label="Facebook"
                  color="bg-[#1877F2]"
                />
                <SocialIcon
                  href="https://www.instagram.com/acampamentositiobompastor/"
                  icon={Instagram}
                  label="Instagram"
                  color="bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FD1D1D]"
                />
                <SocialIcon
                  href="https://wa.me/5515974011407?text=Olá,%20gostaria%20de%20mais%20informações"
                  icon={Phone}
                  label="WhatsApp"
                  color="bg-[#25D366]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
