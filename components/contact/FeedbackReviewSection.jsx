"use client"

import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Rating,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { useTheme } from "@mui/material/styles"

export default function FeedbackReviewSection({ feedbackForm, countryCodes, preselectedService, preselectedProduct }) {
  const theme = useTheme()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

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
  })

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  })

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        feedbackType: "Service",
        selectedServiceOrProduct: preselectedService,
      }))
    }
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        feedbackType: "Product",
        selectedServiceOrProduct: preselectedProduct,
      }))
    }
  }, [preselectedService, preselectedProduct])

  const selectedCountry = countryCodes.find((cc) => cc.code === formData.countryCode)

  const {
    feedbackTypes,
    feedbackServices,
    feedbackProducts,
    feedback_title,
    rating_title,
    message_title,
    canBePublish_title,
    wishToBeContact_title,
    phone_number_title,
  } = feedbackForm

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    })
  }

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting formData:", formData)
    setStatus({ loading: true, message: "Sending...", error: false })

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        feedbackType: formData.feedbackType,
        selectedServiceOrProduct: formData.selectedServiceOrProduct,
        message: formData.message,
        rating: formData.rating,
        canBePublished: formData.canBePublished === "yes",
        wishToBeContacted: formData.wishToBeContacted === "yes",
      }

      const res = await axios.post(`${API_URL}/api/feedback-forms`, {
        data: payload,
      })
      setStatus({
        loading: false,
        message: "Feedback sent successfully!",
        error: false,
      })

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
      })
    } catch (error) {
      console.error("Strapi error:", error.response?.data || error.message)
      setStatus({
        loading: false,
        message: "Failed to send message.",
        error: true,
      })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>Name</Typography>
      <TextField
        fullWidth
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        sx={{
          mb: 3,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
          },
        }}
      />

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>Email</Typography>
      <TextField
        fullWidth
        placeholder="you@company.com"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        required
        sx={{
          mb: 3,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
          },
        }}
      />

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{phone_number_title}</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={formData.countryCode}
            onChange={handleChange("countryCode")}
            sx={{
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": {
                ...theme.mixins.borderStyle,
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
          placeholder={selectedCountry?.format}
          value={formData.phone}
          onChange={handleChange("phone")}
          sx={{
            mb: 3,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            "& .MuiOutlinedInput-root": {
              ...theme.mixins.borderStyle,
            },
          }}
        />
      </Box>

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{feedback_title}</Typography>
      <FormControl
        fullWidth
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Select value={formData.feedbackType} onChange={handleChange("feedbackType")} displayEmpty>
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
          <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>
            Choose Service/Product
          </Typography>
          <FormControl
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                ...theme.mixins.borderStyle,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              },
            }}
          >
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

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{rating_title}</Typography>
      <Rating value={formData.rating} onChange={handleRatingChange} sx={{ mb: 3 }} size="large" />

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{message_title}</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Write your feedback here..."
        value={formData.message}
        onChange={handleChange("message")}
        required
        sx={{
          mb: 3,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
          },
        }}
      />

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1, fontWeight: 600 }}>{canBePublish_title}</Typography>
      <RadioGroup row value={formData.canBePublished} onChange={handleChange("canBePublished")} sx={{ mb: 3 }}>
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label="Yes"
          sx={{ "& .MuiFormControlLabel-label": theme.typography.bodyFont_M }}
        />
        <FormControlLabel
          value="no"
          control={<Radio />}
          label="No"
          sx={{ "& .MuiFormControlLabel-label": theme.typography.bodyFont_M }}
        />
      </RadioGroup>

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1, fontWeight: 600 }}>{wishToBeContact_title}</Typography>
      <RadioGroup row value={formData.wishToBeContacted} onChange={handleChange("wishToBeContacted")} sx={{ mb: 3 }}>
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label="Yes"
          sx={{ "& .MuiFormControlLabel-label": theme.typography.bodyFont_M }}
        />
        <FormControlLabel
          value="no"
          control={<Radio />}
          label="No"
          sx={{ "& .MuiFormControlLabel-label": theme.typography.bodyFont_M }}
        />
      </RadioGroup>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button type="submit" variant="contained" size="large" disabled={status.loading} sx={{ px: 6, py: 2 }}>
          {status.loading ? "Sending..." : "Submit"}
        </Button>
      </Box>

      {status.message && (
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            ...theme.typography.bodyFont_M,
            color: status.error ? theme.palette.section.contact.main : theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          {status.message}
        </Typography>
      )}
    </Box>
  )
}
