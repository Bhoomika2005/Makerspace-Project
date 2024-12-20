import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Book, Cog, Users } from 'lucide-react'
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
//import {Accordion, AccordionItem} from "@nextui-org/react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MakerSpace</h1>
        <p className="text-xl mb-8">Innovate, Create, and Learn at IIT Indore's Premier Fabrication Lab</p>
        {/* <Image
          src="/images/centralworkshop.png?height=400&width=800"
          alt="MakerSpace Lab"
          width={800}
          height={400}
          className="rounded-lg shadow-md mx-auto"
        /> */}
      </section>

            {/* About Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
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
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Cog className="h-12 w-12" />}
            title="State-of-the-art Machinery"
            description="Access to cutting-edge equipment for your projects"
          />
          <FeatureCard
            icon={<Book className="h-12 w-12" />}
            title="Comprehensive Courses"
            description="Learn from experts in various fabrication techniques"
          />
          <FeatureCard
            icon={<Users className="h-12 w-12" />}
            title="Collaborative Environment"
            description="Connect with like-minded innovators and creators"
          />
        </div>
      </section>

            {/* FAQ Section
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="what-is">
            <AccordionTrigger>What is MakerSpace?</AccordionTrigger>
            <AccordionContent>
              MakerSpace is a DIY facility at IIT Indore that provides access to various tools and equipment
              for students and faculty to work on their projects. It's a place where you can learn new skills,
              create prototypes, and bring your ideas to life.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="who-can-use">
            <AccordionTrigger>Who can use the MakerSpace?</AccordionTrigger>
            <AccordionContent>
              MakerSpace is open to the entire IIT Indore community, including students, faculty, and staff members.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="equipment">
            <AccordionTrigger>What equipment is available in the MakerSpace?</AccordionTrigger>
            <AccordionContent>
              We have a wide range of equipment including laser cutters, waterjet cutter, CNC routers,
              3D printers, PCB prototyping station, soldering stations, welding kit, and various hand and power tools.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reserve">
            <AccordionTrigger>How can I reserve time in the MakerSpace?</AccordionTrigger>
            <AccordionContent>
              You can reserve time by filling out the reservation form on our website or by contacting
              the MakerSpace staff directly. Training sessions are scheduled weekly, and you must complete
              the necessary training before using specific equipment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section> */}


      {/* CTA Section */}
      <section className="bg-[#1e3c72] text-white rounded-lg p-8 text-center">
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-[#1e3c72] mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}