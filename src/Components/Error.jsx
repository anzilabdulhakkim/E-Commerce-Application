import { Button, Text, Flex, Spacer, Center } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  function handleNav() {
    navigate("/login");
  }

  return (
    <Center mt={20}>
      <Flex direction="column" align="center">
        <FaExclamationTriangle size={50} color="red" />
        <Text fontSize="xl" my="4">Some Error Occurred.</Text>
        <Spacer />
        <Button colorScheme="green" onClick={handleNav}>Login Again</Button>
      </Flex>
    </Center>
  );
};

export default Error