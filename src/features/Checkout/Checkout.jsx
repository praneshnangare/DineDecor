import React, { useEffect } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import useCart from "../Cart/useCart";
import { useFormik } from "formik";
import validationSchema from "../../schemas/userDetailsSchema";
import useOrder from "./useOrder";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useCart();
  const { orders, createOrder } = useOrder();
  const navigate = useNavigate();
  const {clearCart} = useCart();

  useEffect(() => {
    document.title = "Checkout - DineDecor";
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createOrder(values, {items: cartItems});
      formik.resetForm();
      navigate("/");
      clearCart();
    },
  });
  
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      sx={{ p: 2, maxWidth: { xs: "100%", sm: "900px" }, mx: "auto" }}
    >
      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography variant="h4">Checkout</Typography>
      </Grid>
      <Grid item container>
        <Paper
          elevation={3}
          sx={{ p: 2, minHeight: "300px", width: { xs: "100%", md: "250px"}, borderRadius: 4 }}
        >
          <Grid item container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Your Order</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title1">Items : </Typography>
            </Grid>
            <Grid item xs={12} >
              {cartItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Typography variant="body1">{`- ${item.name} : $ ${item.price} x ${item.quantity}`}</Typography>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{`Total : $ ${cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}`}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          elevation={3}
          sx={{ p: 2, minHeight: "550px", width: { xs: "100%", md: "430px"}, borderRadius: 4 }}
        >
          <Grid item container direction="column" spacing={2} >
            <Grid item xs={12}>
              <Typography variant="h5">Your Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                value={formik.values.phoneNumber}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                variant="outlined"
              />
            </Grid>
            <Grid item container xs={12} direction="row" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                  value={formik.values.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  fullWidth
                  name="state"
                  label="State"
                  onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                  value={formik.values.state}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="pincode"
                label="Pincode"
                onChange={formik.handleChange}
                onBlur = {formik.handleBlur}
                value={formik.values.pincode}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 , p: 2}} alignSelf={'end'}>
              <Button size="large" variant="contained" color = "success" type="submit" onClick={formik.handleSubmit} disabled={!formik.isValid}>Confirm Order</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Checkout;
