import React from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/product");
  }

  return (
    <Flex direction="column" alignItems="center" mt="20">
      <Text fontSize="xl" mb="4">Welcome to the Home Page</Text>
      <Flex>
        <Button onClick={handleClick} colorScheme="red" mr="4">
          Go to Product Page using useNavigate
        </Button>
        <Link to="/product">
          <Button colorScheme="red">
            Go to Product Page using Link
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
