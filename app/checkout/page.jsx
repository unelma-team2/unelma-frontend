"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@mui/material";
import countryList from "react-select-country-list";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Image from "next/image";
import Alert from "@mui/material/Alert";
import HeroPage from "@/components/common/HeroPage";
import axios from "axios";
import { useUserProfile } from "@/app/context/UserContext";

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const countries = countryList().getData();

const paymentOptions = [
  {
    label: "Pay After Delivery",
    value: "cod",
    icon: <AccessTimeIcon fontSize="large" />,
  },
  {
    label: "Bank Transfer",
    value: "bank",
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    label: "PayPal",
    value: "paypal",
    icon: (
      <Image
        src="/images/payment/paypal.png"
        alt="PayPal"
        width={100}
        height={100}
        style={{ objectFit: "contain" }}
      />
    ),
  },
  {
    label: "UnelmaPay",
    value: "unelmapay",
    icon: (
      <Image
        src="/images/payment/unelmapay.png"
        alt="UnelmaPay"
        width={60}
        height={60}
        style={{ objectFit: "contain" }}
      />
    ),
  },
];

function CountrySelect({ value, onChange, label = "Country" }) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        <MenuItem value="">
          <em>Select Country</em>
        </MenuItem>
        {countries.map((country) => (
          <MenuItem key={country.value} value={country.label}>
            {country.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function generateOrderId() {
    const date = new Date();
    const ymd =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0");
  
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  
    return `UNEL${ymd}${random}`;
  }

export default function CheckoutPage() {
    const { cartItems, clearCart, selectedShipping, setSelectedShipping } = useCart();
    const { profile, loading: profileLoading } = useUserProfile();
    const router = useRouter();
  
    const [showShipping, setShowShipping] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("cod");
  
    const [billingAddress, setBillingAddress] = useState({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  
    const [deliveryAddress, setDeliveryAddress] = useState({
      name: "",
      email: "",
      country: "",
    });
  
    useEffect(() => {
      const saved = localStorage.getItem("selectedShipping");
      if (saved) setSelectedShipping(JSON.parse(saved));
    }, [setSelectedShipping]);
  
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.unitPrice),
      0
    );
    const taxAmount = totalPrice * 0.24;
    const shippingCost = Number(selectedShipping?.cost || 0);
    const grandTotal = totalPrice + taxAmount + shippingCost;
  

    const handleConfirmOrder = async () => {
        if (!profile) {
          alert("User profile not loaded yet. Please try again.");
          return;
        }
      
        const orderId = generateOrderId();
      
        try {
          // 1️⃣ Create the Order first
          const orderPayload = {
            data: {
              order_id: orderId,
              user_profile: profile.id, // Many-to-one relation
              order_status: "Pending",
              payment_method: selectedPayment,
              subTotal: totalPrice,
              tax: taxAmount,
              delivery_type: selectedShipping?.delivery_type || "",
              delivery_cost: shippingCost,
              total: grandTotal,
              billing_address: billingAddress,
              delivery_address: showShipping ? deliveryAddress : null,
            },
          };
      
          const orderRes = await axios.post(`${API_URL}/api/orders`, orderPayload, {
            headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
          });
      
          const createdOrder = orderRes.data.data; // <-- Strapi order ID
      
          // 2️⃣ Create Order Items separately and link them to the order
          await Promise.all(
            cartItems.map((item) =>
              axios.post(
                `${API_URL}/api/order-items`,
                {
                  data: {
                    order: createdOrder.id, // Link to parent order
                    product_id: item.productId,
                    product_name: item.name,
                    unitPrice: item.unitPrice,
                    quantity: item.quantity,
                    subTotal: item.unitPrice * item.quantity,
                  },
                },
                { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
              )
            )
          );
      
          // 3️⃣ Clear cart & redirect
          clearCart();
          localStorage.removeItem("selectedShipping");
      
          // Save order info locally for the success page
          localStorage.setItem(
            "lastOrder",
            JSON.stringify({
              orderId: orderId,
              total: grandTotal,
              billingAddress,
              deliveryAddress: showShipping ? deliveryAddress : null,
              shipping: selectedShipping,
              items: cartItems, // optional: for display in success page
            })
          );
      
          router.push("/order-success");
        } catch (err) {
          console.error("Checkout failed:", err.response?.data || err);
          alert("Something went wrong while placing the order.");
        }
      };
      

  return (
    <>
      <HeroPage
        title="Checkout"
        // image1={{ src: ""/images/shipping&billing_hero.png"", alt: "Checkout Hero 1", width: 244, height: 261 }}
        // image2={{ src: "/blog/blog-hero-2.png", alt: "Checkout Hero 2", width: 272, height: 309 }}
      />
      <Grid
        container
        columns={{ xs: 1, md: 2 }}
        columnSpacing={4}
        sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}
      >
        {/* Billing & Shipping Form (Left) */}
        <Grid
          sx={{
            width: "100%",
            maxWidth: 500, // or 600 for wider
            mx: "auto",
            mb: { xs: 4, md: 0 },
            pr: { xs: 0, md: 2 },
          }}
        >
          <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Billing Information
            </Typography>
            <TextField fullWidth label="Name" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, name: e.target.value })} />

          <TextField fullWidth label="Email" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })} />

          <TextField fullWidth label="Phone" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })} />

            <CountrySelect
            value={billingAddress.country}
            onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
          />
            <TextField fullWidth label="Street Address" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })} />

          <TextField fullWidth label="City" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })} />

          <TextField fullWidth label="State" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })} />

          <TextField fullWidth label="Postal Code" sx={{ mb: 2 }}
            onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })} />


            <FormControlLabel
              control={
                <Switch
                  checked={showShipping}
                  onChange={() => setShowShipping(!showShipping)}
                  color="primary"
                />
              }
              label="Deliver to a different recipient?"
              sx={{ mt: 2 }}
            />

            {showShipping && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Recipient Information
                </Typography>
                <TextField fullWidth label="Name" sx={{ mb: 2 }}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })} />

              <TextField fullWidth label="Email" sx={{ mb: 2 }}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, email: e.target.value })} />
                <CountrySelect
                value={deliveryAddress.country}
                label="Recipient Country"
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
              />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Order Summary & Payment (Right) */}
        <Grid
          sx={{
            width: { xs: "100%", md: "50%" },
            pl: { xs: 0, md: 2 },
          }}
        >
          <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, background: "#fff" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">${totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax (24%)</TableCell>
                    <TableCell align="right">+ ${taxAmount.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Delivery Cost</TableCell>
                    <TableCell align="right">
                      + ${shippingCost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ${grandTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                justifyContent: "center",
                my: 4,
                alignItems: "center",
              }}
            >
              {paymentOptions.map((option) => (
                <Box
                  key={option.value}
                  onClick={() => setSelectedPayment(option.value)}
                  sx={{
                    border:
                      selectedPayment === option.value
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                    borderRadius: 2,
                    p: 1,
                    cursor: "pointer",
                    boxShadow:
                      selectedPayment === option.value ? "0 0 8px #1976d2" : "none",
                    position: "relative",
                    minWidth: 100,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    background: "#fff",
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      height: 80, // fixed icon area height
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#333",
                      minHeight: 24, // ensures consistent label height
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {option.label}
                  </Typography>
                  {selectedPayment === option.value && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 18,
                        height: 18,
                        background: "#1976d2",
                        borderRadius: "50%",
                        color: "#fff",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✓
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, minWidth: 200, width: { xs: "100%", sm: "auto" } }}
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}