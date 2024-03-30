import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Text, Grid, Flex, Box } from "@chakra-ui/react";
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
    <Box m="50px" p="5px" h="auto">
    <Grid templateColumns="1fr" gap={5} alignItems="center" justifyContent="center" textAlign="center">
      <Image src={image} alt={title} width="150px" height="180px" m="auto"/>
      <Flex justifyContent="center">
        <Text  maxH="50px" overflow="hidden" textOverflow="ellipsis">{title}</Text>
      </Flex>
      <Text fontWeight="bold">Rating - {rating.rate}</Text>
      <Text >₹ {price}</Text>
      <Grid templateColumns="1fr 1fr" gap={10} justifyContent="center">
        <Button colorScheme="blue"  onClick={addTocart}>Add to Cart</Button>
        <Button colorScheme="blue" onClick={() => {handleNavigate(id)}}>
          View details
        </Button>
      </Grid>
    </Grid>
    </Box>
  );
};

export default Singleproduct;
