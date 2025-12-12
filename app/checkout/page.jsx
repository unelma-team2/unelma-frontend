"use client";
import { useState } from "react";
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
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Image from "next/image";
import Alert from "@mui/material/Alert";

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

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const router = useRouter();

  const [showShipping, setShowShipping] = useState(false);
  const [billingCountry, setBillingCountry] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].value);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate order summary values
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (item.quantity || 1) * (Number(item.unitPrice) || 0),
    0
  );
  const taxAmount = totalPrice * 0.24;
  const shippingCost = 0; // You can update this if you have shipping logic
  const grandTotal = totalPrice + taxAmount + shippingCost;

  return (
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
          <TextField fullWidth label="Name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" sx={{ mb: 2 }} />
          <CountrySelect
            value={billingCountry}
            onChange={(e) => setBillingCountry(e.target.value)}
          />
          <TextField fullWidth label="Street Address" sx={{ mb: 2 }} />
          <TextField fullWidth label="City/Town" sx={{ mb: 2 }} />
          <TextField fullWidth label="State/Province/Region" sx={{ mb: 2 }} />
          <TextField fullWidth label="Postal Code" sx={{ mb: 2 }} />

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
              <TextField fullWidth label="Name" sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" sx={{ mb: 2 }} />
              <CountrySelect
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
                label="Recipient Country"
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
            onClick={() => {
              setOrderSuccess(true);
            }}
          >
            Confirm Order
          </Button>
          {orderSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Your order has been successfully placed!
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}