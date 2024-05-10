import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { updateCartItems } from "./cartSlice";
import useCart from "./useCart";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { EMPTY_CART } from "../../helpers/assets";

const Cart = () => {
  const { updateCart, cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cart - DineDecor";
  }, []);

  const returnHome = () => {
    navigate("/");
  };

  const CartItemList = ({ items }) => {
    const handleAddQuantity = (data) => {
      const item = { ...data };
      item.quantity = item.quantity ? item.quantity + 1 : 1;
      updateCart(item);
    };

    const handleRemoveQuantity = (data) => {
      const item = { ...data };
      item.quantity = item.quantity ? item.quantity - 1 : 0;
      updateCart(item);
    };
    const handleDeleteItem = (data) => {
      removeFromCart(data);
    };

    return (
      <Grid item container direction="column">
        {items.map((item, index) => (
          <Paper
            item
            elevation={3}
            key={item.id}
            sx={{
              p: 2,
              width: {
                xs: "100%",
              },
              display: "flex",
              borderRadius: 2,
              marginBottom: 2,
              background: "white",
              flexWrap: "nowrap",
            }}
          >
            <Grid
              item
              container
              direction={"row"}
              display="flex"
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Grid item>
                <Box
                  component="img"
                  src={item.img}
                  sx={{ width: 70, height: "100%", borderRadius: 2 }}
                />
              </Grid>
              <Grid item direction={"column"} spacing={3}>
                <Grid item mb={1}>
                  <Typography variant="h6">{item.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{item.category}</Typography>
                </Grid>
              </Grid>
              <Grid item direction={"row"} spacing={3} sx={{ display: "flex" }}>
                <Grid item m={1}>
                  <AddCircleOutlineRoundedIcon
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.1s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "primary.main",
                      },
                    }}
                    onClick={() => handleAddQuantity(item)}
                  />
                </Grid>
                <Grid item m={1}>
                  <Typography variant="h4">{item.quantity ?? 0}</Typography>
                </Grid>
                <Grid item m={1}>
                  <RemoveCircleOutlineRoundedIcon
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.1s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "primary.main",
                      },
                    }}
                    onClick={() => handleRemoveQuantity(item)}
                  />
                </Grid>
              </Grid>
              <Grid item direction={"column"}>
                <Typography variant="h6">{`$ ${item.price}`}</Typography>
              </Grid>

              <Grid item>
                <DeleteRoundedIcon
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.1s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      color: "primary.main",
                    },
                  }}
                  onClick={() => handleDeleteItem(item)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    );
  };

  return (
    <Grid
      container
      sx={{ p: 2, maxWidth: { xs: "100%", sm: "700px" }, mx: "auto" }}
      spacing={2}
      display={"flex"}
    >
      <Grid item container direction="row" spacing={2} alignItems={"end"} onClick={returnHome} sx={{ cursor: "pointer" }}>
        <Grid item alignItems={"center"}>
          <KeyboardBackspaceIcon />
        </Grid>
        <Grid item alignItems={"center"}>
          <Typography variant="h4">Shopping Cart</Typography>
        </Grid>
      </Grid>
      {cartItems.length > 0 && <Grid item><Typography variant="title1">You have {cartItems.length} {cartItems.length > 1 ? "items" : "item"} in your cart</Typography></Grid>}
      {cartItems.length > 0 && <CartItemList items={cartItems} />}
      {cartItems.length === 0 && (
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Box component="img" src={EMPTY_CART} sx={{ width: 400 }} />
          </Grid>
          <Grid item mt={2}>
            {/* <Typography
              component="a"
              onClick={returnHome}
              variant="h6"
              sx={{ cursor: "pointer" }}
              color={"primary.main"}
            >
              Return to shopping
            </Typography> */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              label="Return to shopping"
              onClick={returnHome}
            ></Button>
          </Grid>
        </Grid>
      )}
      {cartItems.length > 0 && (
        <Grid item container direction="row" justifyContent="space-between">
          <Grid
            item
            sx={{
              display: "flex",
              justifySelf: "end",
              width: "auto",
              justifyContent: "end",
            }}
          >
            <Grid item m={1}>
              <Typography variant="h4">Total : </Typography>
            </Grid>
            <Grid item m={1}>
              <Typography variant="h4">{`$ ${cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}`}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              size="large"
              label="Checkout"
              disabled={cartItems.length === 0}
              onClick={() => {
                navigate("/checkout");
              }}
            ></Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Cart;
