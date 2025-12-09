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
} from "@mui/material";
import countryList from "react-select-country-list";

const countries = countryList().getData();

function CountrySelect({ value, onChange, label = "Country" }) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
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
  const [showShipping, setShowShipping] = useState(false);
  const [billingCountry, setBillingCountry] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");

  return (
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
      <TextField fullWidth label="Town/City" sx={{ mb: 2 }} />
      <TextField fullWidth label="District" sx={{ mb: 2 }} />

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
          <TextField fullWidth label="Town/City" sx={{ mb: 2 }} />
          <TextField fullWidth label="State" sx={{ mb: 2 }} />
        </Box>
      )}
    </Box>
  );
}