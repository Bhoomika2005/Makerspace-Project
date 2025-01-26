import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-gradient-to-tr from-[#027cc4] to-[#0610ab] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Location Section */}
            <div className="space-y-4 md:pl-8">
              <h2 className="text-xl font-semibold uppercase tracking-wide">
                Location :
              </h2>
              <div className="flex gap-3">
                <a
                  href="https://maps.app.goo.gl/VnFN8QrtVmstQkAf8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                </a>
                <address className="not-italic">
                  <p className="font-medium">MakerSpace</p>
                  <p>Indian Institute of Technology Indore,</p>
                  <p>Khandwa Road, Simrol,</p>
                  <p>Indore 453552</p>
                </address>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4 md:pl-8">
              <h2 className="text-xl font-semibold uppercase tracking-wide">
                Contact Us
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <a href="mailto:makerspace@iiti.ac.in" className="hover:underline">
                    makerspace@iiti.ac.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <a href="tel:+917509202484" className="hover:underline">
                    +917509202484
                  </a>
                </div>
              </div>
            </div>

            {/* Logos Section */}
            <div className="relative h-64 md:h-full">
              <div className="absolute right-0 bottom-32 md:bottom-1/2 md:translate-y-1/2 w-[200px] lg:w-[300px] h-32 flex items-center justify-center">
                <div className="w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] rounded-lg bg-slate-200 flex items-center justify-center">
                  <Image
                    src="/images/ms_logo.png"
                    alt="IIT Indore MakerSpace Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <div className="flex justify-center items-center gap-2 text-sm">
              <p>Copyright ©2025 All rights reserved by: MakerSpace - IIT Indore</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
