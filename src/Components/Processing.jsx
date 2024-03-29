import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text ,Spinner} from "@chakra-ui/react";

const Processing = () => {
  const navigate = useNavigate();

  function handleProcess() {
    setTimeout(() => {
      navigate("/confirmation");
    }, 3000);
  }

  useEffect(() => {
    handleProcess();
  }, []);

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Spinner mt="10px"></Spinner>
      <Text fontSize="xl" mt="4">Processing...</Text>
    </Flex>
  );
};

export default Processing;
