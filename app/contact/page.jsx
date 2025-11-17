"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";

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
          : formData.selectedServices.filter((s) => s !== service),
      });
    } else if (field === "contactType") {
      // Reset form data when contact type changes
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
      // Reset selectedServiceOrProduct when feedback type changes
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
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const selectedCountry = countryCodes.find(
    (cc) => cc.code === formData.countryCode
  );

  return (
    <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {/* Contact Us Heading with Images */}
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
            {/* First Cube Image */}
            <Box
              sx={{
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                position: "relative",
                mt: { xs: -1, md: -2 },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #4A90E2 0%, #50C8FF 50%, #FF6B9D 100%)",
                  borderRadius: "12px",
                  opacity: 0.8,
                  transform: "rotate(-15deg)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
            {/* Second Cube Image */}
            <Box
              sx={{
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                position: "relative",
                mt: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #6B46C1 0%, #9333EA 50%, #EC4899 100%)",
                  borderRadius: "12px",
                  opacity: 0.8,
                  transform: "rotate(15deg)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
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
          We&apos;d love to hear from you. Please select the reason you are
          contacting us from the list below and then fill out the rest of the
          form.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Contact Type Dropdown */}
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

          {/* Name Field - Always shown */}
          <TextField
            fullWidth
            label="Name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange("name")}
            required
            sx={{ mb: 3 }}
          />

          {/* Email Field - Always shown */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange("email")}
            required
            sx={{ mb: 3 }}
          />

          {/* Phone Number Field - Always shown */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: "14px",
                fontWeight: 500,
                color: "#000",
              }}
            >
              Phone number (optional)
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={formData.countryCode}
                  onChange={handleChange("countryCode")}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                  }}
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
                placeholder={selectedCountry?.format || "+ 358 (0) 00-0000000"}
                value={formData.phone}
                onChange={handleChange("phone")}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Price Quote Request - Services Checkboxes */}
          {formData.contactType === "Price quote request" && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Choose the services you are interested in
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5,
                }}
              >
                {services.map((service) => (
                  <FormControlLabel
                    key={service}
                    control={
                      <Checkbox
                        checked={formData.selectedServices.includes(service)}
                        onChange={handleChange("selectedServices")}
                        value={service}
                        sx={{
                          color: "#000",
                          "&.Mui-checked": {
                            color: "#000",
                          },
                          "& .MuiSvgIcon-root": {
                            borderRadius: "4px",
                          },
                        }}
                      />
                    }
                    label={service}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#000",
                        ml: 1,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Feedback/Review - Feedback Type Select */}
          {formData.contactType === "Feedback/review" && (
            <>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="feedback-type-label">
                  I want to review/leave feedback for
                </InputLabel>
                <Select
                  labelId="feedback-type-label"
                  id="feedback-type"
                  value={formData.feedbackType}
                  label="I want to review/leave feedback for"
                  onChange={handleChange("feedbackType")}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                  }}
                >
                  {feedbackTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                      {type === "Other" && " (specify below)"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Choose service/product - Conditional dropdown */}
              {formData.feedbackType &&
                formData.feedbackType !== "Other" && (
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="service-product-label">
                      Choose service/product
                    </InputLabel>
                    <Select
                      labelId="service-product-label"
                      id="service-product"
                      value={formData.selectedServiceOrProduct}
                      label="Choose service/product"
                      onChange={handleChange("selectedServiceOrProduct")}
                      sx={{
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#000",
                        },
                      }}
                    >
                      {formData.feedbackType === "Service" &&
                        feedbackServices.map((service) => (
                          <MenuItem key={service} value={service}>
                            {service}
                          </MenuItem>
                        ))}
                      {formData.feedbackType === "Product" &&
                        products.map((product) => (
                          <MenuItem key={product} value={product}>
                            {product}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}

              {/* Rating Stars */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Please rate your experience
                </Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  max={5}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#2F2E2E",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#ccc",
                    },
                  }}
                />
              </Box>

              {/* Can be published radio */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  My rating/review can be published on the Unelma Platforms
                  website
                </Typography>
                <RadioGroup
                  row
                  value={formData.canBePublished}
                  onChange={handleChange("canBePublished")}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio sx={{ color: "#000" }} />}
                    label="Yes"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#000",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio sx={{ color: "#000" }} />}
                    label="No"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#000",
                      },
                    }}
                  />
                </RadioGroup>
              </Box>

              {/* Wish to be contacted radio */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Do you wish to be contacted by Unelma Platforms about your
                  feedback?
                </Typography>
                <RadioGroup
                  row
                  value={formData.wishToBeContacted}
                  onChange={handleChange("wishToBeContacted")}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio sx={{ color: "#000" }} />}
                    label="Yes"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#000",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio sx={{ color: "#000" }} />}
                    label="No"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#000",
                      },
                    }}
                  />
                </RadioGroup>
              </Box>
            </>
          )}

          {/* How can we help? - Only for Price quote request */}
          {formData.contactType === "Price quote request" && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                How can we help?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Tell us a little about your project/need for our services"
                value={formData.message}
                onChange={handleChange("message")}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* Message Field - Shown for Message/question */}
          {formData.contactType === "Message/question" && (
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={6}
              value={formData.message}
              onChange={handleChange("message")}
              required
              sx={{ mb: 3 }}
            />
          )}

          {/* Your feedback/review - Only for Feedback/review */}
          {formData.contactType === "Feedback/review" && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Your feedback/review
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Tell us a little about your experience"
                value={formData.message}
                onChange={handleChange("message")}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#000",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* File Upload - Shown for Message/question and Price quote request */}
          {(formData.contactType === "Message/question" ||
            formData.contactType === "Price quote request") && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                {formData.contactType === "Price quote request"
                  ? "Add file (accepted filetypes)"
                  : "Add your file (optional)"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AttachFile sx={{ color: "#666", fontSize: 24 }} />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    borderColor: "#ccc",
                    color: "#666",
                    textTransform: "none",
                    backgroundColor: "#f5f5f5",
                    "&:hover": {
                      borderColor: "#999",
                      backgroundColor: "#e8e8e8",
                    },
                  }}
                >
                  Choose file
                  <input
                    type="file"
                    hidden
                    onChange={handleChange("file")}
                    accept="*/*"
                  />
                </Button>
                {fileName && (
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {fileName}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#2F2E2E",
                color: "#fff",
                py: 1,
                px: 6,
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                borderRadius: "10px",
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