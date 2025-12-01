"use client";

import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Rating,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function FeedbackReviewSection({ feedbackForm, countryCodes }) {
  const API_URL = "http://localhost:1337";

  //   const API_URL =
  //   process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+358",
    feedbackType: "",
    selectedServiceOrProduct: "",
    message: "",
    rating: 0,
    canBePublished: "",
    wishToBeContacted: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const selectedCountry = countryCodes.find(
    (cc) => cc.code === formData.countryCode
  );

  const {
    feedbackTypes,
    feedbackServices,
    feedbackProducts,
    feedback_title,
    rating_title,
    message_title,
    canBePublish_title,
    wishToBeContact_title,
    attachement_title,
    attachement_description,
    phone_number_title,
  } = feedbackForm;

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);
    setStatus({ loading: true, message: "Sending...", error: false });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        feedbackType: formData.feedbackType,
        selectedServiceOrProduct: formData.selectedServiceOrProduct,
        message: formData.message,
        rating: formData.rating,
        canBePublished: formData.canBePublished === "yes",
        wishToBeContacted: formData.wishToBeContacted === "yes",
      };

      const res = await axios.post(`${API_URL}/api/feedback-forms`, {
        data: payload,
      });
      setStatus({
        loading: false,
        message: "Feedback sent successfully!",
        error: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+358",
        feedbackType: "",
        selectedServiceOrProduct: "",
        message: "",
        rating: 0,
        canBePublished: "",
        wishToBeContacted: "",
      });
    } catch (error) {
      console.error("Strapi error:", error.response?.data || error.message);
      setStatus({
        loading: false,
        message: "Failed to send message.",
        error: true,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>

      <Typography sx={labelStyle}>Name</Typography>
      <TextField
        fullWidth
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange("name")}
        sx={{ mb: 3 }}
      />

      <Typography sx={labelStyle}>Email</Typography>
      <TextField
        fullWidth
        placeholder="you@company.com"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        sx={{ mb: 3 }}
      />

      <Typography sx={labelStyle}>{phone_number_title}</Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={formData.countryCode}
            onChange={handleChange("countryCode")}
          >
            {countryCodes.map((cc) => (
              <MenuItem key={cc.code} value={cc.code}>
                {cc.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          placeholder={selectedCountry?.format}
          value={formData.phone}
          onChange={handleChange("phone")}
        />
      </Box>

      <Typography sx={labelStyle}>{feedback_title}</Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={formData.feedbackType}
          onChange={handleChange("feedbackType")}
          displayEmpty
        >
          <MenuItem disabled value="">
            Select Feedback Type
          </MenuItem>
          {feedbackTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.feedbackType && formData.feedbackType !== "Other" && (
        <>
          <Typography sx={labelStyle}>Choose Service/Product</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              value={formData.selectedServiceOrProduct}
              onChange={handleChange("selectedServiceOrProduct")}
              displayEmpty
            >
              <MenuItem disabled value="">
                Select
              </MenuItem>

              {formData.feedbackType === "Service" &&
                feedbackServices.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}

              {formData.feedbackType === "Product" &&
                feedbackProducts.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}

      <Typography sx={{ fontWeight: 500, mb: 1 }}>{rating_title}</Typography>
      <Rating
        value={formData.rating}
        onChange={handleRatingChange}
        sx={{ mb: 3 }}
      />

      <Typography sx={labelStyle}>{message_title}</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your feedback here..."
        value={formData.message}
        onChange={handleChange("message")}
        sx={{ mb: 3 }}
      />

      <Typography sx={{ mb: 1 }}>{canBePublish_title}</Typography>
      <RadioGroup
        row
        value={formData.canBePublished}
        onChange={handleChange("canBePublished")}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>

      <Typography sx={{ mt: 2, mb: 1 }}>{wishToBeContact_title}</Typography>
      <RadioGroup
        row
        value={formData.wishToBeContacted}
        onChange={handleChange("wishToBeContacted")}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit
      </Button>

      {status.message && (
        <Typography color={status.error ? "error" : "primary"} sx={{ mt: 2 }}>
          {status.message}
        </Typography>
      )}
    </Box>
  );
}
const labelStyle = {
  mb: 1,
  fontSize: "14px",
  fontWeight: 500,
  color: "#000",
};
