"use client"

import { Box, Typography, TextField, FormControl, Select, MenuItem, Button } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { AttachFile } from "@mui/icons-material"
import { useState } from "react"
import axios from "axios"

export default function MessageQuestionSection({ contactForm, countryCodes }) {
  const theme = useTheme()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+358",
    message: "",
    file: null,
  })

  const [fileName, setFileName] = useState("")
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  })

  const selectedCountry = countryCodes.find((cc) => cc.code === formData.countryCode)

  const { message_title, attachement_title, attachement_description, phone_number_title } = contactForm

  const handleChange = (field) => (e) => {
    if (field === "file") {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, file }))
      setFileName(file ? file.name : "")
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }
  }

  const uploadFile = async () => {
    if (!formData.file) return null

    const fileData = new FormData()
    fileData.append("files", formData.file)

    const uploadRes = await axios.post(`${API_URL}/api/upload`, fileData)
    return uploadRes.data[0].id
  }

  const handleSubmit = async () => {
    setStatus({ loading: true, message: "Sending...", error: false })

    try {
      const uploadedFileId = await uploadFile()

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        message: formData.message,
        attachement: uploadedFileId ? uploadedFileId : null,
      }

      const res = await axios.post(`${API_URL}/api/contact-forms`, {
        data: payload,
      })

      console.log("Response from Strapi:", res.data)

      setStatus({
        loading: false,
        message: "Message sent successfully!",
        error: false,
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+358",
        message: "",
        file: null,
      })

      setFileName("")
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
    <>
      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>Name</Typography>

      <TextField
        fullWidth
        placeholder="Name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
          },
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      />

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>Email</Typography>

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
            ...theme.mixins.borderStyle,
          },
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      />

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{phone_number_title}</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={formData.countryCode}
              onChange={handleChange("countryCode")}
              sx={{
                ...theme.mixins.borderStyle,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
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
              "& .MuiOutlinedInput-root": {
                ...theme.mixins.borderStyle,
              },
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>

      <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{message_title}</Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Message"
        value={formData.message}
        onChange={handleChange("message")}
        required
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            ...theme.mixins.borderStyle,
          },
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ ...theme.typography.bodyFont_L, mb: 1.5, fontWeight: 600 }}>{attachement_title}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AttachFile sx={{ color: theme.palette.text.secondary, fontSize: 28 }} />

          <Button
            variant="outlined"
            component="label"
            sx={{
              ...theme.mixins.borderStyle,
              textTransform: "none",
              ...theme.typography.bodyFont_M,
            }}
          >
            {attachement_description}
            <input type="file" hidden onChange={handleChange("file")} />
          </Button>

          {fileName && (
            <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.text.secondary }}>
              {fileName}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={status.loading}
          sx={{
            px: 6,
            py: 2,
            ...theme.typography.button,
          }}
        >
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
    </>
  )
}
