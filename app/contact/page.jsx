"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import MessageQuestionSection from "@/components/contact/MessageQuestionSection";
import PriceQuoteSection from "@/components/contact/PriceQuoteSection";
import FeedbackReviewSection from "@/components/contact/FeedbackReviewSection";

const contactTypes = [
  "Message/question",
  "Price quote request",
  "Feedback/review",
  "Appointment booking",
];

const services = [
  "Cyber Security",
  "AI & Machine Learning",
  "Cloud Services",
  "Data Management",
  "Data Science",
  "Web & Mobile Development",
  "Startup Development",
  "Other (specify in your message below)",
];

const products = [
  "UnelmaMail",
  "UnelmaCloud",
  "UnelmaCRM",
  "Open-Source Software",
];

const feedbackServices = [
  "Cyber Security",
  "AI & Machine Learning",
  "Cloud Services",
  "Data Management",
  "Data Science",
  "Web & Mobile Development",
  "Startup Development",
];

const feedbackTypes = ["Service", "Product", "Other"];

const countryCodes = [
  { code: "+358", country: "FIN", format: "+ 358 (0) 00-0000000" },
  { code: "+1", country: "USA", format: "+1 (000) 000-0000" },
  { code: "+44", country: "GBR", format: "+44 0000 000000" },
  { code: "+49", country: "DEU", format: "+49 000 0000000" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    contactType: "Message/question",
    name: "",
    email: "",
    countryCode: "+358",
    phone: "",
    message: "",
    file: null,
    selectedServices: [],
    feedbackType: "",
    selectedServiceOrProduct: "",
    rating: 0,
    canBePublished: "",
    wishToBeContacted: "",
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (field) => (event) => {
    if (field === "file") {
      const file = event.target.files[0];
      setFormData({ ...formData, file });
      setFileName(file ? file.name : "");
    } else if (field === "selectedServices") {
      const service = event.target.value;
      const checked = event.target.checked;
      setFormData({
        ...formData,
        selectedServices: checked
          ? [...formData.selectedServices, service]
          : formData.selectedServices.filter((item) => item !== service),
      });
    } else if (field === "contactType") {
      setFormData({
        contactType: event.target.value,
        name: "",
        email: "",
        countryCode: "+358",
        phone: "",
        message: "",
        file: null,
        selectedServices: [],
        feedbackType: "",
        selectedServiceOrProduct: "",
        rating: 0,
        canBePublished: "",
        wishToBeContacted: "",
      });
      setFileName("");
    } else if (field === "feedbackType") {
      setFormData({
        ...formData,
        feedbackType: event.target.value,
        selectedServiceOrProduct: "",
      });
    } else {
      setFormData({ ...formData, [field]: event.target.value });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const selectedCountry = countryCodes.find(
    (cc) => cc.code === formData.countryCode
  );

  return (
    <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 6,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "36px", md: "64px" },
              fontWeight: 700,
              color: "#000",
              flex: "0 0 auto",
            }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              ml: { xs: 0, sm: 2 },
              flex: "1 1 auto",
            }}
          >
          </Box>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "36px", md: "48px" },
            fontWeight: 700,
            mb: 2,
            color: "#000",
          }}
        >
          Get in touch
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "#000",
            fontSize: "16px",
            lineHeight: 1.6,
          }}
        >
          We'd love to hear from you. Please select the reason you are
          contacting us from the list below and then fill out the rest of the
          form.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="contact-type-label">Select contact type</InputLabel>
            <Select
              labelId="contact-type-label"
              id="contact-type"
              value={formData.contactType}
              label="Select contact type"
              onChange={handleChange("contactType")}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
              }}
            >
              {contactTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  disabled={type === "Appointment booking"}
                  sx={{
                    "&.Mui-disabled": {
                      opacity: 0.5,
                      color: "#999",
                    },
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.contactType === "Message/question" && (
            <MessageQuestionSection
              formData={formData}
              handleChange={handleChange}
              countryCodes={countryCodes}
              selectedCountry={selectedCountry}
              fileName={fileName}
            />
          )}

          {formData.contactType === "Price quote request" && (
            <PriceQuoteSection
              formData={formData}
              handleChange={handleChange}
              countryCodes={countryCodes}
              selectedCountry={selectedCountry}
              services={services}
              fileName={fileName}
            />
          )}

          {formData.contactType === "Feedback/review" && (
            <FeedbackReviewSection
              formData={formData}
              handleChange={handleChange}
              countryCodes={countryCodes}
              selectedCountry={selectedCountry}
              feedbackTypes={feedbackTypes}
              feedbackServices={feedbackServices}
              products={products}
              handleRatingChange={handleRatingChange}
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2F2E2E",
                color: "#fff",
                py: 1,
                px: 4,
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                borderRadius: "25px",
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
