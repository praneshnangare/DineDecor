import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Grow,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CHAIR_IMG } from "../../helpers/assets";
import { productsList } from "../../helpers/data";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "../Cart/useCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useTheme } from "@emotion/react";

const Categories = ["Chairs", "Tables", "Dining tops"];

const ProductCard = ({
  product,
  handleAddToCart,
  isAlreadyInCart,
  handleRemoveFromCart,
}) => {
  return (
    <Grid
      item
      sx={{
        width: "300px",
        height: "350px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Paper elevation={4} sx={{ borderRadius: 5, p: 2 }}>
        <Grid item sx={{ alignSelf: "center" }}>
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            height={200}
            width={250}
            borderRadius={5}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" color="text.primary">
            {product.name}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            mx: 1,
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography variant="h6" color="text.secondary">
              {"$ " + product.price}
            </Typography>
          </Grid>
          <Grid item>
            {!isAlreadyInCart ? (
              <AddShoppingCartIcon
                onClick={() => handleAddToCart(product)}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.1s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "primary.main",
                  },
                }}
              />
            ) : (
              <RemoveShoppingCartIcon
                onClick={() => handleRemoveFromCart(product)}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.1s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "primary.main",
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(Categories[0]);
  const { addToCart, cartItems, removeFromCart } = useCart();
  const theme = useTheme();
  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    document.title = "Home - DineDecor";
  }, []);

  useEffect(() => {
    const products = productsList.filter((product) => {
      return product.category === category;
    });
    setProducts(products);
  }, [category]);

  const handleAddToCart = (item) => {
    const product = { ...item };
    addToCart(product);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const RenderProducts = ({ cartItems }) => (
    <Grid item container spacing={2} sx={{
      display: "flex",
      justifyContent: { xs: "center", sm: "flex-start" },
    }} mx={2}>
      {products.map((product, index) => {
        const isAlreadyInCart = cartItems.find(
          (item) => item.id === product.id
        );
        return (
          <ProductCard
            key={product.id}
            product={product}
            isAlreadyInCart={isAlreadyInCart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        );
      })}
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          component={"img"}
          src={CHAIR_IMG}
          alt="chair"
          alignSelf="center"
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "600px"},  
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        mx={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Grid item>
          <Typography variant={isBrowser ? "h3" : "h5"} color="text.primary">
            Explore our wide range of products
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Grid item mr={2}>
            <Typography variant="title2" color="text.primary">
              Select a category
            </Typography>
          </Grid>
          <Grid item>
            <Select
              value={category}
              onChange={(e) => {
                console.log(e.target.value);
                setCategory(e.target.value);
              }}
            >
              {Categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Typography variant="title1" color="text.primary">
                    {category}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <RenderProducts cartItems={cartItems} />
    </Grid>
  );
};

export default Home;
