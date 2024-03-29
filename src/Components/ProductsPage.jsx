import { useState, useEffect, useReducer } from "react";
import Singleproduct from "./Singleproduct";
import Error from "./Error";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Select, Input, Flex, Grid, GridItem } from "@chakra-ui/react";
import Loading from "./Loading";

const initialData = {
  loading: false,
  error: false,
  data: [],
};

function dataReducer(state, { type, payload }) {
  switch (type) {
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
        data: payload,
        loading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
}

const ProductsPage = () => {
  const [productData, dispatch] = useReducer(dataReducer, initialData);
  const [search, setSearch] = useSearchParams();
  const [category, setCategory] = useState(null);
  const [priceSort, setPriceSort] = useState("Price");
  const [ratingSort, setRatingSort] = useState("Rating");
  const [inputText, setInputText] = useState("");

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory === "all" ? null : selectedCategory);
  }

  function handlePriceChange(event) {
    setPriceSort(event.target.value);
  }

  function handleRatingChange(event) {
    setRatingSort(event.target.value);
  }

  function handleInput(event) {
    setInputText(event.target.value);
  }

  async function fetchProductData() {
    const params = { category };
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get(import.meta.env.VITE_URL, { params });
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  }

  useEffect(() => {
    setSearch((prevSearch) => {
      const newSearch = new URLSearchParams(prevSearch);
      newSearch.set("category", category);
      return newSearch;
    });

    fetchProductData();
  }, [category, priceSort, ratingSort]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const filteredProducts = productData.data.filter((product) =>
    product.title.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div style={{ marginTop: "60px" }}>
      <Flex w="60%" m="auto">
        <Select value={category || "all"} onChange={handleCategoryChange} mr="4">
          <option value="all">All</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </Select>
        <Select value={priceSort} onChange={handlePriceChange} mr="4">
          <option value="Price">Price</option>
          <option value="high to low">high to low</option>
          <option value="low to high">low to high</option>
        </Select>
        <Select value={ratingSort} onChange={handleRatingChange} mr="4">
          <option value="Rating">Rating</option>
          <option value="4 and above">4 and above</option>
          <option value="3 and above">3 and above</option>
          <option value="2 and above">2 and above</option>
        </Select>
        <Input
          type="text"
          placeholder="Enter title of the product"
          value={inputText}
          onChange={handleInput}
        />
      </Flex>
      {productData.loading && <Loading />}
      {productData.error && <Error />}
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={4}
        justifyContent="center"
        mt="4"
        m="auto"
      >
        {filteredProducts.map((product) => (
          <GridItem key={product.id}>
            <Singleproduct {...product} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsPage;
