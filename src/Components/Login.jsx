import axios from "axios";
import { useContext, useReducer } from "react";
import { useToast, Input, Button, Box } from "@chakra-ui/react";
import { Authcontext } from "../Context/Authcontextprovider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: false,
};

function formreducer(state, { type, payload }) {
  switch (type) {
    case "EMAIL": {
      return {
        ...state,
        email: payload,
      };
    }
    case "PASSWORD": {
      return {
        ...state,
        password: payload,
      };
    }
    case "LOADING": {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case "RESET": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

const Login = () => {
  const toast = useToast();
  const { login } = useContext(Authcontext);
  const [formdata, dispatch] = useReducer(formreducer, initialState);

  const { email, password, loading, error } = formdata;

  function handleLogin() {
    toast({
      title: "Login Successful",
      description: "Go to the product section to purchase items.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  function handleError() {
    toast({
      title: "Invalid Credentials.",
      description: "Go to the Login page again.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  function handleLost() {
    toast({
      title: "Email and Password cannot be empty",
      description: "Fill out credentials properly.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      handleLost();
      return;
    }
    let obj = { email: email, password: password };
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: obj,
      });
      dispatch({ type: "SUCCESS" });
      login(data.token);
      dispatch({ type: "RESET" });
      handleLogin();
    } catch (error) {
      dispatch({ type: "ERROR" });
      handleError();
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to="/error" />;
  }

  return (
    <Box width="40%" m="auto" mt={10} p={5} border="1px solid #e2e8f0" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          mt="20px"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            dispatch({ type: "EMAIL", payload: e.target.value });
          }}
        />
        <Input
          type="password"
          mt="20px"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            dispatch({ type: "PASSWORD", payload: e.target.value });
          }}
        />
        <Button mt="20px" colorScheme="green" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
