import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
  answerJsx: React.ReactNode;
}

interface TownFAQData {
  faqs: FAQ[];
}

const townFAQs: Record<string, TownFAQData> = {
  albany: {
    faqs: [
      {
        question: "What is the median home price in Albany NY?",
        answer: "The median list price in Albany NY is approximately $320,000 as of April 2026.",
        answerJsx: (
          <>The median list price in Albany NY is approximately <strong>$320,000</strong> as of April 2026.</>
        ),
      },
      {
        question: "Is Albany NY a good place to invest in rental property?",
        answer: "Albany offers multi-family cap rates of 5–8%, with strong rental demand from state government workers, hospital employees, and SUNY Albany students.",
        answerJsx: (
          <>
            Albany offers multi-family cap rates of <strong>5–8%</strong>, with strong rental demand from state government workers, 
            hospital employees, and SUNY Albany students.{" "}
            <Link to="/analyze" className="text-primary hover:underline">Run the numbers on an Albany deal →</Link>
          </>
        ),
      },
      {
        question: "How fast are homes selling in Albany NY?",
        answer: "Albany properties are averaging 18 days on market, with well-priced multi-families going under contract in under 2 weeks.",
        answerJsx: (
          <>Albany properties are averaging <strong>18 days</strong> on market, with well-priced multi-families going under contract in under 2 weeks.</>
        ),
      },
      {
        question: "What types of investment properties are available in Albany NY?",
        answer: "Active Albany investment inventory includes duplexes, triplexes, and mixed-use buildings. The Pine Hills, Arbor Hill, and South End neighborhoods offer the strongest cash-flow numbers. Analyze any Albany property free at AnalyzeAnyDeal.com.",
        answerJsx: (
          <>
            Active Albany investment inventory includes duplexes, triplexes, and mixed-use buildings. 
            The <strong>Pine Hills</strong>, <strong>Arbor Hill</strong>, and <strong>South End</strong> neighborhoods offer the strongest cash-flow numbers.{" "}
            <a href="https://www.analyzeanydeal.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Analyze any Albany property free at AnalyzeAnyDeal.com →
            </a>
          </>
        ),
      },
    ],
  },
  troy: {
    faqs: [
      {
        question: "What is the median home price in Troy NY?",
        answer: "The median list price in Troy NY is approximately $275,000 as of April 2026, with strong demand across both single-family and multi-family segments.",
        answerJsx: (
          <>The median list price in Troy NY is approximately <strong>$275,000</strong> as of April 2026, with strong demand across both single-family and multi-family segments.</>
        ),
      },
      {
        question: "Is Troy NY a good place to invest in rental property?",
        answer: "Troy is one of the Capital District's top rental markets, driven by RPI and Russell Sage College students, tech workers, and young professionals drawn to the revitalized downtown. Multi-family cap rates typically range from 5–9%.",
        answerJsx: (
          <>
            Troy is one of the Capital District's top rental markets, driven by RPI and Russell Sage College students, 
            tech workers, and young professionals drawn to the revitalized downtown. Multi-family cap rates typically range from <strong>5–9%</strong>.{" "}
            <Link to="/analyze" className="text-primary hover:underline">Run the numbers on a Troy deal →</Link>
          </>
        ),
      },
      {
        question: "How fast are homes selling in Troy NY?",
        answer: "Troy properties are averaging 22 days on market as of April 2026. Well-priced properties in South Troy and Lansingburgh are moving in under 2 weeks.",
        answerJsx: (
          <>Troy properties are averaging <strong>22 days</strong> on market as of April 2026. Well-priced properties in South Troy and Lansingburgh are moving in under 2 weeks.</>
        ),
      },
      {
        question: "What neighborhoods in Troy NY have the best investment potential?",
        answer: "South Troy, Lansingburgh, and the downtown corridor offer the strongest cash-flow potential for investors. Downtown Troy's ongoing revitalization — including the Troy Innovation Garage and new mixed-use developments — is driving appreciation. Analyze any Troy property free at AnalyzeAnyDeal.com.",
        answerJsx: (
          <>
            <strong>South Troy</strong>, <strong>Lansingburgh</strong>, and the <strong>downtown corridor</strong> offer the strongest cash-flow potential for investors. 
            Downtown Troy's ongoing revitalization — including the Troy Innovation Garage and new mixed-use developments — is driving appreciation.{" "}
            <a href="https://www.analyzeanydeal.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Analyze any Troy property free at AnalyzeAnyDeal.com →
            </a>
          </>
        ),
      },
    ],
  },
  schenectady: {
    faqs: [], // Schenectady uses its own dedicated page
  },
};

interface TownFAQSectionProps {
  townSlug: string;
  townName: string;
}

const TownFAQSection = ({ townSlug, townName }: TownFAQSectionProps) => {
  const data = townFAQs[townSlug];
  if (!data || data.faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 px-4">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          {townName} Real Estate — Investor Intel
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Answers to the most common questions about buying and investing in {townName}, NY.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {data.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-lg font-semibold text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answerJsx}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default TownFAQSection;
