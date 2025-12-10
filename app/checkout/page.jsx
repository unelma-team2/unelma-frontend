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
} from "@mui/material";
import countryList from "react-select-country-list";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const countries = countryList().getData();

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

  // Calculate order summary values
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.quantity || 1) * (Number(item.unitPrice) || 0),
    0
  );
  const taxAmount = totalPrice * 0.24;
  const shippingCost = 0; // You can update this if you have shipping logic
  const grandTotal = totalPrice + taxAmount + shippingCost;

  return (
    <>
      <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, maxWidth: 600, mx: "auto" }}>
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
          label="Ship to a different location?"
          sx={{ mt: 2 }}
        />

        {showShipping && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Shipping Information
            </Typography>
            <TextField fullWidth label="Name" sx={{ mb: 2 }} />
            <TextField fullWidth label="Phone" sx={{ mb: 2 }} />
            <CountrySelect
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              label="Shipping Country"
            />
            <TextField fullWidth label="Street Address" sx={{ mb: 2 }} />
            <TextField fullWidth label="City/Town" sx={{ mb: 2 }} />
            <TextField fullWidth label="State/Province/Region" sx={{ mb: 2 }} />
            <TextField fullWidth label="Postal Code" sx={{ mb: 2 }} />
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 5 }}>
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
                <TableCell>Shipping Cost</TableCell>
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
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, minWidth: 200, width: { xs: "100%", sm: "auto" } }}
          onClick={() => {
            // Place your checkout logic here
            // e.g., router.push("/order-confirmation");
          }}
        >
          Confirm Order
        </Button>
      </Box>
    </>
  );
}
