
import React from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const BlogCategory = () => {
  
  return (
    <div className='flex flex-col gap-4'>
      <h3 className="text-3xl font-bold p-5 text-yellow-400">Categories</h3>
      <div className="flex flex-col gap-3">
        <Link href="/blogs/category/Fashion">
          <Button 
            variant="link" 
            color="yellow.400" 
            fontSize="lg" 
            textAlign="left" 
            _hover={{ textDecor: "underline", color: "yellow.500" }} 
            padding="0"
            className="transition-all duration-300 ease-in-out"
          >
            Fashion
          </Button>
        </Link>
        <hr className="border-yellow-400" />
        <Link href="/blogs/category/StreetStyle">
          <Button 
            variant="link" 
            color="yellow.400" 
            fontSize="lg" 
            textAlign="left" 
            _hover={{ textDecor: "underline", color: "yellow.500" }} 
            padding="0"
            className="transition-all duration-300 ease-in-out"
          >
            StreetStyle
          </Button>
        </Link>
        <hr className="border-yellow-400" />
        <Link href="/blogs/category/Beauty">
          <Button 
            variant="link" 
            color="yellow.400" 
            fontSize="lg" 
            textAlign="left" 
            _hover={{ textDecor: "underline", color: "yellow.500" }} 
            padding="0"
            className="transition-all duration-300 ease-in-out"
          >
            Beauty
          </Button>
        </Link>
        <hr className="border-yellow-400" />
        <Link href="/blogs/category/LifeStyle">
          <Button 
            variant="link" 
            color="yellow.400" 
            fontSize="lg" 
            textAlign="left" 
            _hover={{ textDecor: "underline", color: "yellow.500" }} 
            padding="0"
            className="transition-all duration-300 ease-in-out"
          >
            Life Style
          </Button>
        </Link>
        <hr className="border-yellow-400" />
        <Link href="/blogs/category/Diy&Crafts">
          <Button 
            variant="link" 
            color="yellow.400" 
            fontSize="lg" 
            textAlign="left" 
            _hover={{ textDecor: "underline", color: "yellow.500" }} 
            padding="0"
            className="transition-all duration-300 ease-in-out"
          >
            DIY & Crafts
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCategory;
