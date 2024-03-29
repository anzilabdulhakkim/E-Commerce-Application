import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Text, Flex } from "@chakra-ui/react";
import { Authcontext } from "../Context/Authcontextprovider";
import { useToast } from "@chakra-ui/react";

const Singleproduct = ({ id, title, category, price, image, rating }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { newAddedProduct } = React.useContext(Authcontext);

  function handleNavigate(value) {
    navigate(`/products/${value}`);
  }

  function toastShow() {
    toast({
      title: "Item added to the cart.",
      description: "Go To the cart to see it.",
      status: "success",
      duration: 700,
      isClosable: true,
    });
  }

  function addTocart() {
    let newObj = {
      id: id,
      title: title,
      category: category,
      price: price,
      image: image,
    };
    newAddedProduct(newObj);
    toastShow();
  }

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" maxWidth="200px" m="20px">
      <Image src={image} alt={title} width="150px"/>
      <Text mt="2">{title}</Text>
      <Text mt="2" fontWeight="bold">Rating - {rating.rate}</Text>
      <Text mt="2">₹ {price}</Text>
      <Flex mt="2" justifyContent="center">
        <Button colorScheme="blue" onClick={addTocart}>Add to Cart</Button>
        <Button
          ml="2"
          colorScheme="blue"
          onClick={() => {
            handleNavigate(id);
          }}
        >
          View details
        </Button>
      </Flex>
    </Flex>
  );
};

export default Singleproduct;
