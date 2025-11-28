"use client";

import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const officesLeft = [
  {
    title: "USA",
    company: "Unelma Platforms Inc.",
    phone: "+1 (302) 703 7543",
    email: "info@unelmaplatforms.com",
    extra: "Incorporation states: Delaware, Florida, Alabama & Montana, USA",
    mapQuery: "Delaware USA",
  },
  {
    title: "Canada",
    company: "Unelma Pay Ltd",
    incorporation: "Incorporation number: 1000986742",
    phone: "+1 (705) 709 8047",
    email: "unelmapayca@gmail.com",
    extra: "215 Anne Street N, Barrie, Ontario, Canada",
    mapQuery: "Barrie Ontario Canada",
  },
];

const officesRight = [
  {
    title: "Northern Europe",
    company: "Unelma Platforms OÜ",
    phone: "+358 (0) 44 988 9771",
    email: "info@unelmaplatforms.com",
    extra: "Tallinn, Estonia region 10111, Estonia",
    mapQuery: "Tallinn Estonia",
  },
  {
    title: "South Asia",
    company: "Unelma Platforms Pvt. Ltd",
    id: `Business ID / VAT / PAN: 606863094`,
    phone: "+977 56 562 130",
    email: "hello@unelma.com.np",
    extra: "Ratnanagar, Chitwan 4 44204, Nepal",
    mapQuery: "Ratnanagar Chitwan Nepal",
  },
];

export default function MapLocation() {
  const [selectedLocation, setSelectedLocation] = useState("Tallinn Estonia");

  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
      >
        Contact Our Offices Worldwide
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
        Opening hours Mon-Fri 10AM-5PM
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {/* Left offices */}
        <Box sx={{ flexBasis: { xs: "100%", md: "240px" }, flexShrink: 0 }}>
          <OfficeColumn
            offices={officesLeft}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
        </Box>

        {/* Map — grows and is centered */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <MapBox mapQuery={selectedLocation} />
        </Box>

        {/* Right offices */}
        <Box sx={{ flexBasis: { xs: "100%", md: "240px" }, flexShrink: 0 }}>
          <OfficeColumn
            offices={officesRight}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
        </Box>
      </Box>
    </Box>
  );
}

function OfficeColumn({ offices, setSelectedLocation, selectedLocation }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {offices.map((office) => (
        <OfficeInfo
          key={office.title}
          {...office}
          isActive={selectedLocation === office.mapQuery}
          onClick={() => setSelectedLocation(office.mapQuery)}
        />
      ))}
    </Box>
  );
}

function OfficeInfo({ 
  title, company, phone, email, extra, incorporation, id, 
  onClick, isActive 
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        p: 2,
        border: isActive ? "2px solid #C1FCFF" : "1px solid #ffffffff",
        transition: "border-color 0.2s",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2">{company}</Typography>
      {incorporation && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {incorporation}
        </Typography>
      )}
      {id && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {id}
        </Typography>
      )}

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <LocalPhoneIcon sx={{ color: "#0018a0ff" }} />
        <Typography variant="body2">{phone}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <MailOutlineIcon sx={{ color: "#0018a0ff" }} />
        <Typography variant="body2">{email}</Typography>
      </Stack>

      {extra && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 1, color: "#9D00A0" }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5} component="span">
            <LocationPinIcon sx={{ color: "#9D00A0" }} />
            <span>{extra}</span>
          </Stack>
        </Typography>
      )}
    </Box>
  );
}

function MapBox({ mapQuery }) {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 420, md: 600 },
        height: 450,
        borderRadius: 0.2,
        overflow: "hidden",
        boxShadow: 2,
      }}
    >
      <iframe
        title="Unelma map"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
}
