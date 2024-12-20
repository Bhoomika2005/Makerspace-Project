"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, Book, Cog, Users } from 'lucide-react'
import './static/styles.css';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    );

    // Observe elements
    const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
    elementsToObserve.forEach((el) => {
      observerRef.current.observe(el);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        elementsToObserve.forEach((el) => {
          observerRef.current.unobserve(el);
        });
      }
    };
  }, []);

  return isVisible;
};

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-[#1e3c72] mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default function HomePage() {
  const scrollVisibility = useScrollAnimation();

  return (
    <div className="container mx-auto px-4 py-8 typewriter">
      {/* Hero Section */}
      <section 
        id="hero-section"
        className={`animate-on-scroll mb-16 text-center transition-all duration-1000 
          ${scrollVisibility['hero-section'] 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-20'}`}
      >
        <h1 className="text-4xl font-bold mb-4 ">Welcome to MakerSpace...</h1>
        <p className="text-xl mb-8">Innovate, Create, and Learn at IIT Indore's Premier Fabrication Lab</p>
      </section>

      {/* About Section */}
      <section 
        id="about-section"
        className={`animate-on-scroll mb-16 transition-all duration-1000
          ${scrollVisibility['about-section'] 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-20'}`}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold text-[#1e3c72]">About MakerSpace</h2>
            <p className="text-gray-600">
              IIT Indore MakerSpace is a DIY facility for people who like to make things, are
              curious about how stuff works, or would like to learn new skills in tinkering.
            </p>
            <p className="text-gray-600">
              Our space is equipped with state-of-the-art machines such as laser cutters,
              waterjet cutter, CNC routers, 3D printers, PCB prototyping station, soldering
              stations, welding kit, and various hand and power tools.
            </p>
            <p className="text-gray-600">
              You can learn these machines by taking part in weekly scheduled training
              sessions. MakerSpace is open to the entire IIT Indore community.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center bg-[#1e3c72] text-white px-6 py-2 rounded-md hover:bg-[#1e3c72]/90 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div>
            <Image
              src="/images/centralworkshop.png?height=400&width=600"
              alt="Central Workshop"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features-section"
        className={`animate-on-scroll mb-16 transition-all duration-1000
          ${scrollVisibility['features-section'] 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-20'}`}
      >
        
        <h1 className="text-3xl font-semibold mb-8 text-center typewriter">What We Offer</h1>
       
          
        <div className="grid md:grid-cols-3 gap-8">
          <div className="transition-transform duration-500 hover:scale-105">
            <FeatureCard
              icon={<Cog className="h-12 w-12" />}
              title="State-of-the-art Machinery"
              description="Access to cutting-edge equipment for your projects"
            />
          </div>
          <div className="transition-transform duration-500 hover:scale-105">
            <FeatureCard
              icon={<Book className="h-12 w-12" />}
              title="Comprehensive Courses"
              description="Learn from experts in various fabrication techniques"
            />
          </div>
          <div className="transition-transform duration-500 hover:scale-105">
            <FeatureCard
              icon={<Users className="h-12 w-12" />}
              title="Collaborative Environment"
              description="Connect with like-minded innovators and creators"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta-section"
        className={`animate-on-scroll bg-[#1e3c72] text-white rounded-lg p-8 text-center transition-all duration-1000
          ${scrollVisibility['cta-section'] 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-20'}`}
      >
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Creating?</h2>
        <p className="mb-8">Join us at MakerSpace and bring your ideas to life!</p>
        <Link
          href="/forms"
          className="inline-flex items-center bg-white text-[#1e3c72] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  )
}