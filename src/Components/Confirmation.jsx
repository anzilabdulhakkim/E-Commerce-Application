import { FaCheckCircle } from "react-icons/fa";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontextprovider";
import { useContext, useEffect } from "react";

const Confirmation = () => {
  const { handleReset } = useContext(Authcontext);
  const navigate = useNavigate();

  function handleHome() {
    navigate("/");
  }

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <VStack spacing="4" align="center" mt="4">
      <Text fontSize="xl">Thank You For Your Order!</Text>
      <Text fontSize="md">Your order has been successfully placed.</Text>
      <FaCheckCircle color="green" size={50} />
      <Text fontSize="md"> We've sent you a confirmation email.</Text>
      <Text fontSize="sm" color="gray.500">
        Note: Please check your spam folder if you don't see the email in your inbox.
      </Text>
      <Button colorScheme="red" mt="4" onClick={handleHome}>
        Home
      </Button>
    </VStack>
  );
};

export default Confirmation;
