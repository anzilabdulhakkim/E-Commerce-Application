import React, { useEffect, useState } from "react";
import { Authcontext } from "../Context/Authcontextprovider";
import { Button, Text, Flex, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { added } = React.useContext(Authcontext);
  const [paycount, setPaycount] = useState(0);

  function handleCountpay() {
    let total = 0;
    added.forEach((ele) => {
      total = total + ele.price;
    });
    setPaycount(total);
  }

  function handlecartto() {
    navigate("/processing");
  }

  useEffect(() => {
    handleCountpay();
  }, []);

  return (
    <div>
      <Flex direction="column" alignItems="center" mt="4">
        {added.length <= 0 && (
          <Text fontSize="md" color="gray.500" textAlign="center">
            Your Cart is Empty
          </Text>
        )}

        {added.map((ele) => (
          <Flex key={ele.id} alignItems="center" my="2" w="40%">
            <Image src={ele.image} alt="" boxSize="100px" mr="4" />
            <VStack align="flex-start">
              <Text fontSize="lg">{ele.title}</Text>
              <Text fontSize="md" color="gray.500">{ele.category}</Text>
              <Text fontSize="lg">₹ {ele.price}</Text>
            </VStack>
          </Flex>
        ))}

        {added.length > 0 && (
          <Button colorScheme="blue" mt="4" onClick={handlecartto}>
            Pay ₹ {paycount}
          </Button>
        )}
      </Flex>
    </div>
  );
};

export default Cart;
