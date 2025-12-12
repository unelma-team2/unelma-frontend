"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

import MessageQuestionSection from "@/components/contact/MessageQuestionSection";
import PriceQuoteSection from "@/components/contact/PriceQuoteSection";
import FeedbackReviewSection from "@/components/contact/FeedbackReviewSection";
import AppointmentBookingSection from "@/components/contact/AppointmentBookingSection";
import MapLocation from "@/components/contact/MapLocation";
import SocialAndSupport from "@/components/contact/SocialAndSupport";
import ContactPageHero from "@/components/contact/ContactPageHero";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContactPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [banner, setBanner] = useState(null);
  const [contactTypeData, setContactTypeData] = useState(null);
  const [contactForm, setContactForm] = useState(null);
  const [requestQuote, setRequestQuote] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState(null);

  const searchParams = useSearchParams();
  const preselectedContactType = searchParams.get("contactType"); 
  const preselectedService = searchParams.get("service") 
  const preselectedProduct = searchParams.get("product"); 

  const [formData, setFormData] = useState({
    contactType: preselectedContactType || "Message/question",
  });

  useEffect(() => {
    if (preselectedContactType) {
      setFormData((prev) => ({ ...prev, contactType: preselectedContactType }));
    }
  }, [preselectedContactType]);

  const countryCodes = [
    { code: "+358", country: "FIN", format: "+358 (0) 00-0000000" },
    { code: "+1", country: "USA", format: "+1 (000) 000-0000" },
    { code: "+44", country: "GBR", format: "+44 0000 000000" },
    { code: "+49", country: "DEU", format: "+49 000 0000000" },
  ];

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
    return <LoadingSpinner />;

  if (error)
    return (
      <Container sx={{ py: 8 }}>
        Error loading contact page: {error.message}
      </Container>
    );

  const { contact_type_title, contact_type } = contactTypeData || {};

  const allContactTypes = contact_type ? [...contact_type] : [];
  if (!allContactTypes.includes("Book appointment")) {
    allContactTypes.push("Book appointment");
  }

  const { title, sub_title, description, image } = banner || {};

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
    <>
      <ContactPageHero />
      <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "18px", md: "33px" },
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
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
            textAlign: "center",
          }}
        >
          {sub_title}
        </Typography>

        <Typography variant="h6" sx={{ my: 6 }}>
          {description}
        </Typography>

        <Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
            >
              {contact_type_title}
            </Typography>

            <Select
              id="contact-type"
              value={formData.contactType}
              onChange={handleChange("contactType")}
            >
              {allContactTypes.map((type, idx) => (
                <MenuItem key={idx} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.contactType === "Message/question" && contactForm && (
            <MessageQuestionSection
              countryCodes={countryCodes}
              contactForm={contactForm}
            />
          )}

          {formData.contactType === "Price quote request" && requestQuote && (
            <PriceQuoteSection
              countryCodes={countryCodes}
              requestQuote={requestQuote}
              preselectedService={preselectedService} 
            />
          )}

          {formData.contactType === "Feedback/review" && feedbackForm && (
            <FeedbackReviewSection
              countryCodes={countryCodes}
              feedbackForm={feedbackForm}
              preselectedService={preselectedService}
              preselectedProduct={preselectedProduct}
            />
          )}

          {formData.contactType === "Book appointment" && (
            <AppointmentBookingSection countryCodes={countryCodes} />
          )}
        </Box>

        <MapLocation />
        <SocialAndSupport />
      </Box>
    </Container>
    </>
  );
}
