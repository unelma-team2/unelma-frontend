"use client"

import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { AttachFile } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"

export default function PriceQuoteSection({ requestQuote, countryCodes, preselectedService }) {
  const theme = useTheme()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+358",
    selectedServices: [],
    message: "",
    file: null,
  })
  const [fileName, setFileName] = useState("")
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  })

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: [preselectedService],
      }))
    }
  }, [preselectedService])

  const selectedCountry = countryCodes.find((cc) => cc.code === formData.countryCode)

  const { title, message_title, attachement_title, attachement_description, services, phone_number_title } =
    requestQuote || {}

  const handleChange = (field) => (e) => {
    const value = e.target.value

    if (field === "file") {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, file }))
      setFileName(file ? file.name : "")
      return
    }

    if (field === "selectedServices") {
      setFormData((prev) => {
        const current = prev.selectedServices || []
        return current.includes(value)
          ? { ...prev, selectedServices: current.filter((s) => s !== value) }
          : { ...prev, selectedServices: [...current, value] }
      })
      return
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const uploadFile = async () => {
    if (!formData.file) return null

    const fileData = new FormData()
    fileData.append("files", formData.file)

    const uploadRes = await axios.post(`${API_URL}/api/upload`, fileData)
    return uploadRes.data[0].id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, message: "Sending...", error: false })

    try {
      const uploadedFileId = await uploadFile()

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        message: formData.message,
        selectedServices: formData.selectedServices,
        attachement: uploadedFileId ? uploadedFileId : null,
      }

      const res = await axios.post(`${API_URL}/api/request-quote-forms`, {
        data: payload,
      })

      console.log("Response:", res.data)
      setStatus({
        loading: false,
        message: "Quote request sent successfully!",
        error: false,
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+358",
        selectedServices: [],
        message: "",
        file: null,
      })
      setFileName("")
    } catch (error) {
      console.error(error.response?.data || error.message)
      setStatus({
        loading: false,
        message: "Failed to send quote request.",
        error: true,
      })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        sx={{
          ...theme.typography.bodyFont_M,
          mb: 1,
          fontWeight: 600,
        }}
      >
        Name
      </Typography>

      <TextField
        fullWidth
        placeholder="Name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.typography.bodyFont_M,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      />

      <Typography
        sx={{
          ...theme.typography.bodyFont_M,
          mb: 1,
          fontWeight: 600,
        }}
      >
        Email
      </Typography>

      <TextField
        fullWidth
        type="email"
        placeholder="you@company.com"
        value={formData.email}
        onChange={handleChange("email")}
        required
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.typography.bodyFont_M,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      />

      <Typography
        sx={{
          ...theme.typography.bodyFont_M,
          mb: 1,
          fontWeight: 600,
        }}
      >
        {phone_number_title}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={formData.countryCode}
            onChange={handleChange("countryCode")}
            sx={{
              ...theme.typography.bodyFont_M,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {countryCodes?.map((cc) => (
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
            "& .MuiOutlinedInput-root": {
              ...theme.typography.bodyFont_M,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            },
          }}
        />
      </Box>

      <Typography
        sx={{
          ...theme.typography.bodyFont_M,
          mb: 1,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {services?.map((service) => (
          <FormControlLabel
            key={service}
            control={
              <Checkbox
                checked={formData.selectedServices.includes(service)}
                onChange={handleChange("selectedServices")}
                value={service}
              />
            }
            label={service}
            sx={{
              "& .MuiFormControlLabel-label": {
                ...theme.typography.bodyFont_M,
              },
            }}
          />
        ))}
      </Box>

      <Typography
        sx={{
          ...theme.typography.bodyFont_M,
          mb: 1,
          fontWeight: 600,
        }}
      >
        {message_title}
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Tell us about your project"
        value={formData.message}
        onChange={handleChange("message")}
        required
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.typography.bodyFont_M,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            ...theme.typography.bodyFont_M,
            mb: 1,
            fontWeight: 600,
          }}
        >
          {attachement_title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <AttachFile sx={{ color: theme.palette.text.secondary, fontSize: 24 }} />

          <Button
            variant="outlined"
            component="label"
            sx={{
              textTransform: "none",
              ...theme.typography.bodyFont_M,
            }}
          >
            {attachement_description}
            <input type="file" hidden onChange={handleChange("file")} />
          </Button>

          {fileName && (
            <Typography
              sx={{
                ...theme.typography.bodyFont_M,
                color: theme.palette.text.secondary,
              }}
            >
              {fileName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button type="submit" variant="contained" size="large" disabled={status.loading} sx={{ px: 6 }}>
          {status.loading ? "Submitting..." : "Submit"}
        </Button>
      </Box>

      {status.message && (
        <Typography
          sx={{
            ...theme.typography.bodyFont_M,
            mt: 2,
            textAlign: "center",
            color: status.error ? "error.main" : "success.main",
          }}
        >
          {status.message}
        </Typography>
      )}
    </Box>
  )
}
