import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Text, Image, Flex, Skeleton, useToast } from "@chakra-ui/react";
import { Authcontext } from "../Context/Authcontextprovider";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { newAddedProduct } = useContext(Authcontext);

  const toastHandle = () => {
    toast({
      title: "Item added to the cart.",
      description: "Go to the cart to see it.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const addTocart = () => {
    if (!data) return;
    const newObj = {
      id: data.id,
      title: data.title,
      category: data.category,
      price: data.price,
      image: data.image,
    };
    newAddedProduct(newObj);
    toastHandle();
  };

  const addTocartandbuy = () => {
    if (!data) return;
    const newObj = {
      id: data.id,
      title: data.title,
      category: data.category,
      price: data.price,
      image: data.image,
    };
    newAddedProduct(newObj);
    navigate("/cart");
  };

  useEffect(() => {
    async function getSingleData() {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setData(data);
      } 
      catch (error) {
        console.log(error);
      }
    }
    getSingleData();
  }, [id]);

  return (
    <Flex direction="column" align="center" paddingX="20%" >
      {!data ? (
        <Skeleton height="300px" width="300px" mt={10}/>
      ) : (
        <>
          <Image src={data.image} h="200px" mt="50px" />
          <Text fontSize="x-large" fontWeight="bold" mt="4" w="70%">
            {data.title}
          </Text>
          <Text fontSize="12px" mt="2" width="60%" >
            {data.description}
          </Text>
          <Text fontSize="lg" mt="2" fontWeight="bold">
            Rating - {data.rating && data.rating.rate}
          </Text>
          <Text fontSize="lg" mt="2">
            ₹ {data.price}
          </Text>
          <Flex>
          <Button colorScheme="blue" mt="4" onClick={addTocart}>
            Add to Cart
          </Button>
          <Button colorScheme="blue" mt="4" ml="4" onClick={addTocartandbuy}>
            Buy Now
          </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Products;
