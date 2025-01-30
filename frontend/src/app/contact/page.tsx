import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Header from "@/components/HeaderReplica";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-[#026bc0]">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Map Section */}
          <div className="w-full relative rounded-lg overflow-hidden shadow-lg">
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
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              {/* Location Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <MapPin className="h-5 w-5" />
                  Location
                </h2>
                <address className="not-italic text-gray-600 pl-7">
                  <p className="font-medium">MakerSpace</p>
                  <p>Indian Institute of Technology Indore,</p>
                  <p>Khandwa Road, Simrol,</p>
                  <p>Indore 453552</p>
                </address>
              </div>

              {/* Email Section */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <Mail className="h-5 w-5" />
                  Email
                </h2>
                <a
                  href="mailto:makerspace@iiti.ac.in"
                  className="text-gray-600 hover:text-[#026bc0] transition-colors pl-7 block"
                >
                  makerspace@iiti.ac.in
                </a>
              </div>

              {/* Phone Section */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[#026bc0]">
                  <Phone className="h-5 w-5" />
                  Phone
                </h2>
                <a
                  href="tel:+917509202484"
                  className="text-gray-600 hover:text-[#026bc0] transition-colors pl-7 block"
                >
                  +91 7509202484
                </a>
              </div>
            </div>

            {/* IIT Indore Logo */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/images/iiti.png"
                  alt="IIT Indore Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <Image
                  src="/images/ms_logo.png"
                  alt="MakerSpace Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
