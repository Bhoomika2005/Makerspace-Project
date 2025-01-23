import React from 'react';
import { MailIcon, MapPinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full relative h-24 bg-transparent mt-10 mb-0 border-b border-black">
      <div className="absolute inset-0 bg-[#1a1a1a]">
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-center items-center gap-8 py-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MailIcon className="h-4 w-4" />
              <a href="mailto:makerspace@iiti.ac.in" className="hover:text-white">
                makerspace@iiti.ac.in
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPinIcon className="h-4 w-4" />
              <p>IIT Indore, Khandwa Road, Simrol</p>
            </div>
          </div>
          <div className="text-center py-2 border-t border-gray-700 text-gray-300">
            <p className="text-sm">
              © 2025 MakerSpace, IIT Indore. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute left-0 bottom-0 w-[200px] lg:w-[300px] h-32 flex items-center justify-center bg-gray-200"
        style={{ 
          clipPath: "polygon(0% 100%, 100% 100%, 80% 0, 0 0)",
        }}
      >
        <img
          src="/images/iiti.png"
          className="object-contain w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] py-2"
          alt="IITI Logo"
        />
      </div>

      <div
        className="absolute right-0 bottom-0 w-[200px] lg:w-[300px] h-32 flex items-center justify-center bg-gray-200"
        style={{ 
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 20% 0)",
        }}
      >
        <img
          src="/images/ms_logo.png"
          className="object-contain w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] py-2"
          alt="MakerSpace Logo"
        />
      </div>
    </footer>
  );
};

export default Footer;