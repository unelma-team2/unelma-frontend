"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";

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
        variant="h3"
        sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
      >
        Contact Our Offices Worldwide
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mb: 4 }}>
        Opening hours Mon-Fri 10AM-5PM
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <OfficeColumn
          offices={officesLeft}
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
        <MapBox mapQuery={selectedLocation} />
        <OfficeColumn
          offices={officesRight}
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
        />
      </Box>
    </Box>
  );
}

function OfficeColumn({ offices, setSelectedLocation, selectedLocation }) {
  return (
    <Box
      sx={{
        minWidth: { xs: "100%", sm: 240 },
        maxWidth: 260,
        display: "flex",
        flexDirection: "column",
        gap: 3,
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
  title,
  company,
  phone,
  email,
  extra,
  onClick,
  isActive,
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        p: 2,
        borderRadius: 2,
        border: isActive ? "2px solid #6c2cff" : "1px solid #eee",
        transition: "border-color 0.2s",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2">{company}</Typography>
      <Typography variant="body2">📞 {phone}</Typography>
      <Typography variant="body2">✉️ {email}</Typography>
      <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#6c2cff" }}>
        {extra}
      </Typography>
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
        width: { xs: "100%", sm: 420, md: 500 },
        height: 320,
        borderRadius: 3,
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
      ></iframe>
    </Box>
  );
}

