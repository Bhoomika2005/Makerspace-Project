import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MakerSpace IITI",
  description: "IIT Indore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imageDirectURL = "https://makerspace.iiti.ac.in/images/makerspace_logo.png";
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" type="image/png" href={imageDirectURL} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="subject" content="MakerSpace" />
        <meta
          name="description"
          content="INTER IIT 2024 hosted by IIT Indore is a prestigious event where students from various IITs across the country come together to participate in  sports competitions. The event fosters a spirit of collaboration, competition, and excellence, promoting innovation, teamwork, and skill development in an intense yet friendly environment."
        />
        <meta
          name="keywords"
          content="INTER IIT 2024, IIT Indore, INTER IIT Indore, Indian Institute of Technology Indore, INTER IIT Tech Meet, INTER IIT Sports Meet, INTER IIT Cultural Meet, INTER IIT Competitions"
        />
        <meta name="language" content="en" />
        <meta name="url" content={process.env.SITE_URL} />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="all" />
        <meta name="rating" content="General" />
        <meta name="og:country-name" content="India" />
        <meta name="og:region" content="India" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta name="og:site_name" content="MakerSpace" />
        <meta property="og:type" content="Website" />
        <meta property="og:title" content="MakerSpace" />
        <meta
          property="og:description"
          content="MakerSpace, IIT Indore's Premier Fabrication Lab"
        />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:site" content="MakerSpace" />
        <meta name="twitter:title" content="MakerSpace" />
        <meta
          name="twitter:description"
          content="MakerSpace, IIT Indore's Premier Fabrication Lab"
        />
        <meta itemProp="name" content="MakerSpace" />
        <meta
          itemProp="description"
          content="MakerSpace, IIT Indore's Premier Fabrication Lab"
        />
        <meta name="author" content="Pradeep Kumar Rebbavarapu" />

        <meta property="og:image" content={imageDirectURL} />
        <meta name="twitter:image" content={imageDirectURL} />

        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="150x150"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}