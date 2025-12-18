"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Stack } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import axios from "axios"

export default function MapLocation() {
  const theme = useTheme()
  const [offices, setOffices] = useState([])
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/contact?populate[OfficeAddress][populate]=*`)
      .then((res) => {
        const data = res.data?.data || {}
        const addresses = data?.OfficeAddress || []
        setOffices(addresses)

        if (addresses.length) {
          setSelectedLocation(addresses[0].mapQuery)
        }

        setTitle(data.map_title || "")
        setSubtitle(data.map_subtitle || "")
      })
      .catch((err) => {
        console.error(err)
      })
  }, [API_URL])

  const officesLeft = offices.filter((o) => o.column === "left")
  const officesRight = offices.filter((o) => o.column === "right")

  return (
    <Box sx={{ mt: 8, mb: 8, px: { xs: 2, sm: 4, md: "150px" } }}>

      {title && <Typography sx={{ ...theme.typography.headingFont_M, textAlign: "center", mb: 6, textTransform: "uppercase", }}>{title}</Typography>}

      <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, textAlign: "center", mb: 6 }}>We hold offices in Northern America, Northern Europe and South Asia.</Typography>
     {subtitle && (
        <Typography sx={{ ...theme.typography.bodyFont_S, textAlign: "center", mb: 6 }}>{subtitle}</Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "flex-end" },
          gap: 4,
        }}
      >
        <Box sx={{ flexBasis: { xs: "100%", md: "300px" }, flexShrink: 0 }}>
          <OfficeColumn
            offices={officesLeft}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
            theme={theme}
          />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <MapBox mapQuery={selectedLocation} theme={theme} />
        </Box>

        <Box sx={{ flexBasis: { xs: "100%", md: "300px" }, flexShrink: 0 }}>
          <OfficeColumn
            offices={officesRight}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
            theme={theme}
          />
        </Box>
      </Box>
    </Box>
  )
}

function OfficeColumn({ offices, setSelectedLocation, selectedLocation, theme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {offices.map((office, idx) => (
        <OfficeInfo
          key={idx}
          {...office}
          isActive={selectedLocation === office.mapQuery}
          onClick={() => setSelectedLocation(office.mapQuery)}
          theme={theme}
        />
      ))}
    </Box>
  )
}

function OfficeInfo({ country_name, company_name, phone_number, email, address, onClick, isActive, theme }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        p: 2.5,
        border: isActive ? `3px solid ${theme.palette.section.contact.main}` : `2px solid ${theme.palette.divider}`,
        transition: "all 0.25s ease",
        "&:hover": {
          borderColor: theme.palette.section.contact.main,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, mb: 1.5, fontWeight: 700 }}>{country_name}</Typography>

      <Typography sx={{ ...theme.typography.bodyFontTitle_S, mb: 1.5 }}>{company_name}</Typography>

      {phone_number && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <PhoneIcon sx={{ fontSize: 18, color: theme.palette.section.contact.main }} />
          <Typography sx={{ ...theme.typography.bodyFont_S }}>{phone_number}</Typography>
        </Stack>
      )}

      {email && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <EmailIcon sx={{ fontSize: 18, color: theme.palette.section.contact.main }} />
          <Typography sx={{ ...theme.typography.bodyFont_S }}>{email}</Typography>
        </Stack>
      )}

      {address && (
        <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: 1.5 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: theme.palette.section.contact.main, mt: 0.2 }} />
          <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.section.contact.muted }}>
            {address}
          </Typography>
        </Stack>
      )}
    </Box>
  )
}

function MapBox({ mapQuery, theme }) {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 420, md: 600 },
        height: 500,
        ...theme.mixins.borderStyle,
        overflow: "hidden",
      }}
    >
      <iframe
        title="Unelma office location"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  )
}
