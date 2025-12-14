"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import axios from "axios";


export default function MapLocation() {
  const [offices, setOffices] = useState([]);
  const [title,setTitle] = useState("");
  const [subtitle,setSubtitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Tallinn Estonia");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {

    axios
      .get(
        `${API_URL}/api/contact?populate[OfficeAddress][populate]=*`
      )
      .then((res) => {
        const data = res.data?.data || {};
        const addresses = data?.OfficeAddress || [];
        setOffices(addresses);

        if (addresses.length) {
          setSelectedLocation(addresses[0].mapQuery);
        }

        setTitle(data.map_title || "");
        setSubtitle(data.map_subtitle || "");

      })
      .catch((err) => {
        console.error(err);
      
      });
  }, [API_URL]);

  const officesLeft = offices.filter(o => o.column === "left");
  const officesRight = offices.filter(o => o.column === "right");

  return (
    <Box sx={{ mt: 22, mb: 8 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
      >
        {title}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
        {subtitle}
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
        <Box sx={{ flexBasis: { xs: "100%", md: "240px" }, flexShrink: 0 }}>
          <OfficeColumn
            offices={officesLeft}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <MapBox mapQuery={selectedLocation} />
        </Box>
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
          key={office.country_name}
          {...office}
          isActive={selectedLocation === office.mapQuery}
          onClick={() => setSelectedLocation(office.mapQuery)}
        />
      ))}
    </Box>
  );
}

function OfficeInfo({ 
  country_name, company_name, phone_number, email, mapQuery, address, column,
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
        {country_name}
      </Typography>
      <Typography variant="body2">{company_name}</Typography>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <LocalPhoneIcon sx={{ color: "#0018a0ff" }} />
        <Typography variant="body2">{phone_number}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <MailOutlineIcon sx={{ color: "#0018a0ff" }} />
        <Typography variant="body2">{email}</Typography>
      </Stack>

      {address && (
        <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#9D00A0" }}>
          <Stack direction="row" alignItems="center" spacing={0.5} component="span">
            <LocationPinIcon sx={{ color: "#9D00A0" }} />
            <span>{address}</span>
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
