import { Text, Flex } from "@chakra-ui/react";
import { RiLoader4Line } from "react-icons/ri";

const Loading = () => {
  return (
    <Flex align="center" justify="center" direction="column" mt="10px">
      <RiLoader4Line size={32} />
      <Text mt="4" fontWeight="bold" fontSize="xl">
        Loading...
      </Text>
    </Flex>
  );
};

export default Loading;
