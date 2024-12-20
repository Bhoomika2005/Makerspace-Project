import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1e3c72] text-white py-6">
      <div className="container mx-auto px-4">
        {/* Top Section: Left and Right Halves */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left Half: Contact Us */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:makerspace@iiti.ac.in" className="hover:underline">
                makerspace@iiti.ac.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <address className="not-italic">
                IIT Indore, Khandwa Road, Simrol, Indore 453552
              </address>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <a
                href="https://www.google.com/maps/place/IIT+Indore/@22.520215,75.9192283,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Right Half: Google Maps */}
          <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.0845672789676!2d75.91922831500338!3d22.52021508520051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e51b24612a3d%3A0x562b30c8c02f4cfa!2sIIT%20Indore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Bottom Section: Copyrights */}
        <div className="mt-6 text-center text-sm">
          © {new Date().getFullYear()} MakerSpace, Indian Institute of Technology Indore.
          <br />
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
