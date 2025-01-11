import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalPassword() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = React.useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      
    }
  };

  return (
    <>
      <a
        className="text-right text-sm text-gray-200 cursor-pointer underline hover:text-yellow-400"
        onClick={() => {
          onOpen();
        }}
      >
        Forgot Password?
      </a>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent>
          <ModalHeader className="text-yellow-600 bg-black">
            Enter your Email below
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-black">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black text-yellow-400 w-full p-2 rounded-lg border-2 border-yellow-400"
            />
          </ModalBody>
          <ModalFooter className="bg-black gap-4">
            <Button onClick={handleSend}>Send</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
        <ToastContainer />
      </Modal>
    </>
  );
}

export default ModalPassword;
