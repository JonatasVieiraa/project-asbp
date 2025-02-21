
const SocialIcon = ({ href, icon: Icon, label, color }: { href: string; icon: any; label: string; color: string }) => {
  return (
    <div className="relative mx-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg group"
      >
        <div
          className={`absolute bottom-0 left-0 w-full h-0 transition-all duration-300 group-hover:h-full ${color}`}
        />
        <Icon size={24} className="relative z-10 text-gray-700 transition-colors duration-300 group-hover:text-white" />
      </a>
      <div
        className={`absolute -top-[30px] left-1/2 -translate-x-1/2 px-3 py-1 rounded text-sm text-white opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:-top-[50px] ${color}`}
      >
        {label}
      </div>
    </div>
  );
};

export default SocialIcon;
