import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline, IoPersonCircleOutline, IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Authcontext } from "../Context/Authcontextprovider";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Text, Spacer, IconButton, Tooltip } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const toast = useToast();
  const { cartcount, logout, isAuthenticated } = React.useContext(Authcontext);
  const navigate = useNavigate();

  function handleGoToCart() {
    navigate("/cart");
  }

  function handleLogout() {
    logout();
    toast({
      title: "Logout Successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Flex align="center" bg="red.500" color="black" p="4" >
      <Link to="/">
        <Tooltip label="Home" aria-label="Home">
          <IconButton icon={<IoHomeOutline />} aria-label="Home" mr="4" />
        </Tooltip>
      </Link>
      {!isAuthenticated && (
        <Link to="/login">
          <Tooltip label="Login" aria-label="Login">
            <IconButton icon={<IoPersonCircleOutline />} aria-label="Login" mr="4" />
          </Tooltip>
        </Link>
      )}
      <Link to="/product">
        <Tooltip label="Product" aria-label="Product">
          <IconButton icon={<AiOutlineShopping />} aria-label="Product" mr="2" />
        </Tooltip>
      </Link>
      <Spacer />
      <Tooltip label="Cart" aria-label="Cart">
        <IconButton icon={<IoCartOutline />} aria-label="Cart" onClick={handleGoToCart} mr="2" />
      </Tooltip>
      <Text fontSize="xl">{cartcount}</Text>
      {isAuthenticated && (
        <>
          <Tooltip label="Logout" aria-label="Logout">
            <IconButton icon={<IoLogOutOutline />} aria-label="Logout" onClick={handleLogout} ml="4" />
          </Tooltip>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
