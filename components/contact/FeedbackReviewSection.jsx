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

export default function FeedbackReviewSection({feedbackForm, countryCodes}) {

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

  const [status, setStatus] = useState({ loading: false, message: "", error: false });
  
  const selectedCountry = countryCodes.find((cc) => cc.code === formData.countryCode);
  
  const {feedbackTypes, feedbackServices, feedbackProducts,feedback_title,rating_title,message_title,canBePublish_title, wishToBeContact_title,attachement_title, attachement_description, phone_number_title} = feedbackForm;

 
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
      setStatus({ loading: false, message: "Feedback sent successfully!", error: false });

     
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
      setStatus({ loading: false, message: "Failed to send message.", error: true });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
   Name
</Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        sx={{ mb: 3 }}
      />
      <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
 Email
</Typography>
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        required
        sx={{ mb: 3 }}
      />
      <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
  {phone_number_title}
</Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            name="countryCode"
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
          name="phone"
          placeholder={selectedCountry?.format || "+ 358 (0) 00-0000000"}
          value={formData.phone}
          onChange={handleChange("phone")}
        />
      </Box>
      <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
  {feedback_title}
</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="feedback-type-label">Feedback Type</InputLabel>
        <Select
          labelId="feedback-type-label"
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleChange("feedbackType")}
        >
          {feedbackTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.feedbackType && formData.feedbackType !== "Other" && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="service-product-label">Choose Service/Product</InputLabel>
          <Select
            labelId="service-product-label"
            name="selectedServiceOrProduct"
            value={formData.selectedServiceOrProduct}
            onChange={handleChange("selectedServiceOrProduct")}
          >
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
      )}

      <Box sx={{ mb: 3 }}>
        <Typography>{rating_title}</Typography>
        <Rating name="rating" value={formData.rating} onChange={handleRatingChange} />
      </Box>

      <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
  {message_title}
</Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        name="message"
        value={formData.message}
        onChange={handleChange("message")}
        placeholder="Write your feedback here..."
        sx={{ mb: 3 }}
      />

      <Typography sx={{ mb: 1 }}>{canBePublish_title}</Typography>
      <RadioGroup
        row
        name="canBePublished"
        value={formData.canBePublished}
        onChange={handleChange("canBePublished")}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>

      <Typography sx={{ mb: 1, mt: 2 }}>{wishToBeContact_title}</Typography>
      <RadioGroup
        row
        name="wishToBeContacted"
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

