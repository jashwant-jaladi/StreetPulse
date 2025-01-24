import { Box, VStack, Heading, Text, Button, Center, Icon } from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Center 
      h="100vh" 
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      color="white"
    >
      <VStack spacing={8} textAlign="center" p={6}>
        <Icon 
          as="svg" 
          width={32} 
          height={32} 
          color="yellow.300" 
          viewBox="0 0 24 24"
        >
          <path 
            fill="currentColor" 
            d="M12 2L2 22h20L12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"
          />
        </Icon>
        
        <Heading 
          fontSize={["4xl", "5xl", "6xl"]} 
          textShadow="2px 2px 4px rgba(0,0,0,0.3)"
        >
          404 - LOST IN CYBERSPACE
        </Heading>
        
        <Text 
          fontSize={["lg", "xl"]} 
          maxW="600px" 
          fontStyle="italic"
        >
          Oops! Looks like you've wandered into the digital wilderness. 
          This page has gone on an unexpected adventure.
        </Text>
        
        <Link href="/" passHref>
          <Button 
            rightIcon={
              <Icon 
                as="svg" 
                viewBox="0 0 24 24"
                width={6}
                height={6}
              >
                <path 
                  fill="currentColor" 
                  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                />
              </Icon>
            }
            colorScheme="yellow"
            size="lg"
            variant="solid"
          >
            Return to Home
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default NotFound;