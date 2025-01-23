import prisma from "@/libs/db";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import Image from "next/image";

const fetchFaqData = async () => {
  try {
    return await prisma.faqs.findMany();
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return [];
  }
};

const Faq = async () => {
  const faqData = await fetchFaqData();

  return (
    <>
      {/* Header Section */}
      <div className="relative h-40 md:h-48 lg:h-56 w-full">
        <Image
          src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737648404/StreetPulse/HomepageImages%20and%20headers/sussy_cnixrq.jpg"
          alt="FAQ Background"
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover border-b-2 border-yellow-400"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4 text-center">
          FREQUENTLY ASKED QUESTIONS
        </div>
      </div>

      {/* FAQ Content */}
      <div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-black">
        {faqData.map((item) => (
          <Accordion allowMultiple key={item.id} className="bg-black text-yellow-400">
            {item.title && (
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold p-3 sm:p-4 md:p-5 pt-8 sm:pt-12 md:pt-16">
                {item.title}
              </h3>
            )}
            <AccordionItem>
              <h2>
                <AccordionButton className="hover:bg-gray-900 transition-colors">
                  <Box as="span" flex="1" textAlign="left" className="text-base sm:text-lg md:text-xl text-yellow-500">
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="text-gray-200 text-sm sm:text-base md:text-lg">
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Faq;