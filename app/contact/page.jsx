"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

import PriceQuoteSection from "@/components/contact/PriceQuoteSection";
import FeedbackReviewSection from "@/components/contact/FeedbackReviewSection";
import MapLocation from "@/components/contact/MapLocation";
import SocialAndSupport from "@/components/contact/SocialAndSupport";

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

  // Fetch from Strapi
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_URL}/api/contact?populate[Banner][populate]=*&populate[ContactType]=*&populate[ContactForm]=*&populate[RequestQuote]=*&populate[FeedbackForm]=*`
      )
      .then((res) => {
        const data = res.data?.data || {};
        setBanner(data.Banner || null);
        setContactTypeData(data.ContactType || null);
        setContactForm((data.ContactForm && data.ContactForm[0]) || null);
        setRequestQuote(data.RequestQuote || null);
        setFeedbackForm(data.FeedbackForm || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading)
    return <Container sx={{ py: 8 }}>Loading contact page...</Container>;
  if (error)
    return (
      <Container sx={{ py: 8 }}>
        Error loading contact page: {error.message}
      </Container>
    );

  // const contactTypeOptions = contactTypeData?.contact_type || [
  //   "Message/question",
  //   "Price quote request",
  //   "Feedback/review",
  //   "Appointment booking",
  // ];

  // const bannerTitle = banner?.title || "Contact";
  // const bannerSubtitle = banner?.sub_title || "";
  // const bannerDescription = banner?.description || "";

  const {contact_type_title,contact_type} = contactTypeData;

  const {title, sub_title,description,image}= banner;

  const imageUrl = image?.url
            ? image.url.startsWith("http")
              ? image.url
              : `${API_URL}${image.url}`
            : "";

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "28px", md: "44px" },
            fontWeight: 700,
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "18px", md: "24px" },
            fontWeight: 600,
            mb: 2,
          }}
        >
          {sub_title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {description}
        </Typography>

        {/* ❌ Removed form — replaced with plain Box to avoid nested forms */}
        <Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
{contact_type_title}
</Typography>
            {/* <InputLabel id="contact-type-label">
              {contact_type_title}
            </InputLabel> */}

            <Select
              labelId="contact-type-label"
              id="contact-type"
              value={formData.contactType}
              onChange={handleChange("contactType")}
            >
              {contact_type.map((type, idx) => (
                <MenuItem key={idx} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Content Sections */}
          {formData.contactType === "Message/question" && requestQuote && (
            <MessageQuestionSection
              countryCodes={countryCodes}
              contactForm={contactForm}
            />
          )}

          {formData.contactType === "Price quote request" && requestQuote && (
            <PriceQuoteSection
            countryCodes={countryCodes}
              requestQuote={requestQuote}
            />
          )}

          {formData.contactType === "Feedback/review" && feedbackForm && (
            <FeedbackReviewSection
            countryCodes={countryCodes}
              feedbackForm={feedbackForm}
             />
          )}
        </Box>

        <MapLocation />
        <SocialAndSupport />
      </Box>
    </Container>
  );
}