import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import ProductsPage from "../Components/ProductsPage";
import Products from "../Components/Products";
import Cart from "../Components/Cart";
import Processing from "../Components/Processing";
import Error from "../Components/Error";
import PrivateRoute from "./PrivateRoute";
import { Box } from "@chakra-ui/react";
import Confirmation from "../Components/Confirmation";
import Loading from "../Components/Loading";

const Allroutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<PrivateRoute><ProductsPage /></PrivateRoute> }/>
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}/>
        <Route path="/products/:id" element={<PrivateRoute><Products /></PrivateRoute> }/>
        <Route path="/processing" element={<PrivateRoute><Processing /></PrivateRoute> }/>
        <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute> }/>
        <Route path="/Loading"  element={<PrivateRoute><Loading/></PrivateRoute>  }/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
    </Box>
  );
};

export default Allroutes;
