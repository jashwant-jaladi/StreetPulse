import Image from "next/image";
import prisma from "@/libs/db";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const fetchFaqData = async () => {
  try {
    return await prisma.faqs.findMany({
      select: {
        id: true,
        title: true,
        question: true,
        answer: true
      }
    });
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return [];
  }
};

const Faq = async () => {
  const faqData = await fetchFaqData();

  return (
    <div>
      <div className="relative h-40 md:h-48 lg:h-56 w-full">
        <Image
          src="https://res.cloudinary.com/dm7ntehzl/image/upload/w_1920,h_108,c_fill,f_auto,q_auto/v1737648404/StreetPulse/HomepageImages%20and%20headers/sussy_cnixrq.jpg"
          alt="FAQ Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 75vw"
          className="object-cover border-b-2 border-yellow-400"
          priority
          loading="eager"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4 text-center">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-black">
        {faqData.map((section) => (
          <div key={section.id} className="mb-6">
            {section.title && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold p-3 sm:p-4 md:p-5 pt-8 sm:pt-12 md:pt-16 text-yellow-400">
                {section.title}
              </h2>
            )}
            <Accordion allowMultiple>
              <AccordionItem>
                <h3>
                  <AccordionButton 
                    className="hover:bg-gray-900 transition-colors rounded"
                    aria-label={`Toggle answer for ${section.question}`}
                  >
                    <span 
                      className="flex-1 text-left text-base sm:text-lg md:text-xl text-yellow-500"
                    >
                      {section.question}
                    </span>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel 
                  pb={4} 
                  className="text-gray-200 text-sm sm:text-base md:text-lg"
                >
                  {section.answer}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Faq;