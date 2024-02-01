"use server"
import { revalidateTag } from 'next/cache'
import React from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

async function getData() {
  const res = await fetch('http://localhost:3000/api/faqs', {cache: 'no-store'}, { next: { revalidate: 3600 } })
  
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Faq = async() => {
  const faqData=await getData()
  return (
    <>
    <div className='bg-[url("/sussy.jpg")] h-40 bg-center bg-cover  text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400'>FREQUENTLY ASKED QUESTIONS</div>

    <div className='p-20 bg-black'>
    {faqData.map((item) => (
        
        <Accordion allowMultiple key={item.id} className='bg-black text-yellow-400'>
         {item.title!=null && <h3 className='text-3xl font-bold p-5 pt-20'>{item.title}</h3>}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' className='text-yellow-600'>
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