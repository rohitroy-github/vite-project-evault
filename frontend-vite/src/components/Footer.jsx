import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 md:px-10 md:py-5 p-0 bottom-0 w-full">
      <div className="flex xs:h-[6vh] md:h-auto items-center justify-center w-full">
        <p className="text-blue-500 font-montserrat md:text-sm text-xs">
          <a
            href="https://github.com/rohitroy-github/sih-evault-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            © Project E-Vault 2024 | Rohit Roy | Github
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
