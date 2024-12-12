import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const Faq = async () => {

  const faqData = await prisma.faqs.findMany()

  return (
    <>
      <div className="bg-[url('/sussy.jpg')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400">
        FREQUENTLY ASKED QUESTIONS
      </div>

      <div className="p-20 bg-black">
        {faqData.map((item) => (
          <Accordion allowMultiple key={item.id} className="bg-black text-yellow-400">
            {item.title && <h3 className="text-3xl font-bold p-5 pt-20">{item.title}</h3>}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" className="text-yellow-600">
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  )
}

export default Faq
