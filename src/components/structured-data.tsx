// src/components/structured-data.tsx
// JSON-LD components. Render each one inside the relevant
// page's JSX — Next.js will inline the <script type="application/ld+json">
// tag on the server, which search engines and AI overviews parse.

const BASE_URL = "https://monoversalhub-website.vercel.app";

// ---------------------------------------------------------------------
// 1. Organization + SoftwareApplication — render ONCE on the homepage.
// Update the numeric statistics from real data when they change.
// ---------------------------------------------------------------------
export function HomepageSchema({
  tailorCount = 500,
  ratingValue = 4.8,
  ratingCount = 500,
}: {
  tailorCount?: number;
  ratingValue?: number;
  ratingCount?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Monoversal Hub",
    alternateName: "Monoversal Hub Website",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Official Monoversal Hub website — portfolio and information for Monoversal projects.",
    url: BASE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NGN",
      description: "Information and portfolio website",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      ratingCount: ratingCount,
      bestRating: "5",
    },
    provider: {
      "@type": "Organization",
      name: "Monoversal Hub",
      url: BASE_URL,
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/UseAction",
      userInteractionCount: tailorCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------
// 2. FAQPage — render on your /faq page. Duplicate the same visible
// question/answer text here.
// ---------------------------------------------------------------------
export type FaqItem = { question: string; answer: string };

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const defaultFaqItems: FaqItem[] = [
  {
    question: "What is Monoversal Hub?",
    answer:
      "Monoversal Hub is the official site showcasing Monoversal projects, resources, and portfolio work.",
  },
  {
    question: "How can I contact Monoversal Hub?",
    answer:
      "Use the contact methods on the site — WhatsApp-first contact patterns are preferred where provided.",
  },
];

// ---------------------------------------------------------------------
// 3. Tailor/Portfolio-like LocalBusiness schema — render on per-item pages
// ---------------------------------------------------------------------
export function PortfolioSchema({
  name,
  slug,
  city,
  craft = "Service",
  ratingValue,
  whatsappNumber,
}: {
  name: string;
  slug: string;
  city: string;
  craft?: string;
  ratingValue?: number;
  whatsappNumber?: string; // e.g. "2348012345678"
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url: `${BASE_URL}/t/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "NG",
    },
    description: `${craft} services by ${name}, based in ${city}.`,
  };

  if (whatsappNumber) data.telephone = `+${whatsappNumber}`;
  if (ratingValue)
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: "5",
      ratingCount: 1,
    };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
