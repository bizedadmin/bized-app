import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Bized — Your Entire Business, Powered by WhatsApp",
  description:
    "The unified platform for WhatsApp commerce, broadcasts, team inbox, AI chatbots, and payments. Grow your business where your customers already are.",
  keywords: [
    "WhatsApp Business",
    "WhatsApp Commerce",
    "WhatsApp API",
    "Business Messaging",
    "WhatsApp Chatbot",
    "WhatsApp Payments",
  ],
  openGraph: {
    title: "Bized — Your Entire Business, Powered by WhatsApp",
    description:
      "The unified platform for WhatsApp commerce, broadcasts, team inbox, AI chatbots, and payments.",
    url: "https://bized.app",
    siteName: "Bized",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bized — Your Entire Business, Powered by WhatsApp",
    description:
      "The unified platform for WhatsApp commerce, broadcasts, team inbox, AI chatbots, and payments.",
  },
  alternates: { canonical: "https://bized.app" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bized.app/#org",
      name: "Bized",
      url: "https://bized.app",
      logo: "https://bized.app/logo.png",
      sameAs: [
        "https://twitter.com/bizedapp",
        "https://linkedin.com/company/bized",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://bized.app/#website",
      url: "https://bized.app",
      name: "Bized",
      publisher: { "@id": "https://bized.app/#org" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://bized.app/#app",
      name: "Bized",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free plan available",
      },
      description:
        "The unified WhatsApp Business platform for commerce, broadcasts, payments, and AI-driven customer engagement.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
