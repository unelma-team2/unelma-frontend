"use client"

import { useEffect, useState } from "react"
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import axios from "axios"

import MessageQuestionSection from "@/components/contact/MessageQuestionSection"
import PriceQuoteSection from "@/components/contact/PriceQuoteSection"
import FeedbackReviewSection from "@/components/contact/FeedbackReviewSection"
import AppointmentBookingSection from "@/components/contact/AppointmentBookingSection"
import MapLocation from "@/components/contact/MapLocation"
import SocialAndSupport from "@/components/contact/SocialAndSupport"
import ContactPageHero from "@/components/contact/ContactPageHero"
import LoadingSpinner from "@/components/LoadingSpinner"
import BackToTopButton from "@/components/BackToTopButton"
import { useSearchParams } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ContactPage() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [banner, setBanner] = useState(null)
  const [contactTypeData, setContactTypeData] = useState(null)
  const [contactForm, setContactForm] = useState(null)
  const [requestQuote, setRequestQuote] = useState(null)
  const [feedbackForm, setFeedbackForm] = useState(null)
  const [appointmentBooking, setAppointmentBooking] = useState(null)

  const searchParams = useSearchParams()
  const preselectedContactType = searchParams.get("contactType")
  const preselectedService = searchParams.get("service")
  const preselectedProduct = searchParams.get("product")

  const [formData, setFormData] = useState({
    contactType: preselectedContactType || "Message/question",
  })

  useEffect(() => {
    if (preselectedContactType) {
      setFormData((prev) => ({ ...prev, contactType: preselectedContactType }))
    }
  }, [preselectedContactType])

  const countryCodes = [
    { code: "+358", country: "FIN", format: "+358 (0) 00-0000000" },
    { code: "+1", country: "USA", format: "+1 (000) 000-0000" },
    { code: "+44", country: "GBR", format: "+44 0000 000000" },
    { code: "+49", country: "DEU", format: "+49 000 0000000" },
  ]

  useEffect(() => {
    setLoading(true)

    axios
      .get(
        `${API_URL}/api/contact?populate[Banner][populate]=*&populate[ContactType]=*&populate[MessageForm]=*&populate[RequestQuote]=*&populate[FeedbackForm]=*&populate[AppointmentBooking]=*`,
      )
      .then((res) => {
        const data = res.data?.data || {}

        setBanner(data.Banner || null)
        setContactTypeData(data.ContactType || null)
        setContactForm((data.MessageForm && data.MessageForm[0]) || null)
        setRequestQuote(data.RequestQuote || null)
        setFeedbackForm(data.FeedbackForm || null)
        setAppointmentBooking(data.AppointmentBooking || null)

        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err)
        setLoading(false)
      })
  }, [API_URL])

  if (loading) return <LoadingSpinner />

  if (error)
    return (
      <Box sx={{ py: 8, px: { xs: 2, md: "150px" } }}>
        <Typography sx={{ ...theme.typography.bodyFont_L, color: "error.main" }}>
          Error loading contact page: {error.message}
        </Typography>
      </Box>
    )

  const { contact_type_title, contact_type } = contactTypeData || {}

  const allContactTypes = contact_type ? [...contact_type] : []
  if (!allContactTypes.includes("Book appointment")) {
    allContactTypes.push("Book appointment")
  }

  const { title, sub_title, description } = banner || {}

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  return (
    <>
      <ContactPageHero />

      <Box sx={{ px: { xs: 2, md: "150px" }, py: 8, mb: 10 }}>
        <Box sx={{ maxWidth: 500, mx: "auto", mb: 12 }}>
          <Typography
            sx={{
              ...theme.typography.headingFont_M,
              mb: 3,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
              {title}
          </Typography>

          <Typography
            sx={{
              ...theme.typography.bodyFontTitle_M_Card,
              mb: 2,
              textAlign: "center",
            }}
          >
             {sub_title}
          </Typography>

          <Typography
            sx={{
              ...theme.typography.bodyFontTitle_S,
              mb: 2,
              textAlign: "center",
            }}
          >
            {description}
          </Typography>

         

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography
              sx={{
                ...theme.typography.bodyFont_L,
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              {contact_type_title}
            </Typography>

            <Select
              value={formData.contactType}
              onChange={handleChange("contactType")}
              sx={{
                ...theme.mixins.borderStyle,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {allContactTypes.map((type, idx) => (
                <MenuItem key={idx} value={type}>
                  <Typography sx={{ ...theme.typography.bodyFont_M }}>{type}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.contactType === "Message/question" && contactForm && (
            <MessageQuestionSection countryCodes={countryCodes} contactForm={contactForm} />
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
            <AppointmentBookingSection countryCodes={countryCodes} appointmentBooking={appointmentBooking} />
          )}
        </Box>

        <Box sx={{ mb: 12 }}>

          <MapLocation />
        </Box>

        <SocialAndSupport />
      </Box>

      <BackToTopButton />
    </>
  )
}
