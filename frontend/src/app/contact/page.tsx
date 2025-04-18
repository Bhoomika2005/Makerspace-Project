import { Mail, Phone, MapPin, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/navbar";

export default function ContactPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center mb-8 sm:mb-12">
            <PhoneIcon className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-[#026bc0] mt-1 sm:mt-2" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#026bc0]">
              Contact Us
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          {/* Map Section */}
          <div className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.7381037860774!2d75.92133167599567!3d22.520485379650825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efcccbce7145%3A0x784e8cb69818596b!2sIndian%20Institute%20of%20Technology%20Indore!5e0!3m2!1sen!2sin!4v1706612130810!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <div className="space-y-6 sm:space-y-8">
              {/* Location Section */}
              <div className="space-y-2 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Location
                </h2>
                <address className="not-italic text-gray-600 pl-6 sm:pl-7 text-sm sm:text-base">
                  <p className="font-medium">MakerSpace</p>
                  <p>Indian Institute of Technology Indore,</p>
                  <p>Khandwa Road, Simrol,</p>
                  <p>Indore 453552</p>
                </address>
              </div>

              {/* Email Section */}
              <div className="space-y-1 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Email
                </h2>
                <a
                  href="mailto:msloffice@iiti.ac.in"
                  className="text-gray-600 hover:text-[#026bc0] transition-colors pl-6 sm:pl-7 block text-sm sm:text-base break-words"
                >
                  msloffice@iiti.ac.in
                </a>
              </div>

              {/* Phone Section */}
              <div className="space-y-1 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Phone
                </h2>
                <a
                  href="tel:+917316603389"
                  className="text-gray-600 hover:text-[#026bc0] transition-colors pl-6 sm:pl-7 block text-sm sm:text-base"
                >
                  +91 7316603389
                </a>
              </div>
            </div>

            {/* IIT Indore Logo */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#0532b3]-500 bg-gradient-to-b from-white to-[#0271c1] pb-4 sm:pb-5 rounded-md">
              <div className="flex items-center justify-center gap-4 sm:gap-7">
                <Image
                  src="/images/iiti.png"
                  alt="IIT Indore Logo"
                  width={60}
                  height={60}
                  className="object-contain sm:w-[80px] sm:h-[80px]"
                />
                <Image
                  src="/images/makerspace_logo.png"
                  alt="MakerSpace Logo"
                  width={70}
                  height={70}
                  className="object-contain sm:w-[90px] sm:h-[90px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
