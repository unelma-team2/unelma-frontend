"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

export default function ProjectInquiry() {
  const theme = useTheme();

  const [projectInquiry, setProjectInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    const API_URL = "http://localhost:1337";
  

useEffect(() => {
  axios
    .get(`${API_URL}/api/home?populate[ProjectInquiry][populate]=*`)
    .then((res) => setProjectInquiry(res.data.data?.ProjectInquiry || null))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}, [API_URL]);

if (loading) return <LoadingSpinner />;
if (error) return <p>Error: {error.message}</p>;
if (!projectInquiry) return <p>No ProjectInquiry section found.</p>;

const { title1, title2, description1, description2, link, link_description } = projectInquiry;

  return (
    <Box
      sx={{
       //width: "100vw",
        //py: { xs: 6, md: 10 },
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.background.darkMint,
          borderTop: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
          borderTopRightRadius: "120px",
          width: "100%",
          height: "600px",
       //   mx: "auto",
         // px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "center",  
        }}
      >
        <Box
          sx={{
              width: "100%",
               ml: "170px",
               mt: "150px" ,
            //bgcolor: "#C1FCFF",
            //borderTop: "2px solid #2F2E2E",
            //borderRight: "2px solid #2F2E2E",
            //borderTopRightRadius: "120px",
        
            //p: { xs: 3, md: 6 },
            //maxWidth: { xs: "100%", md: "100%" },
            //mt: { md: -4 },
            //marginLeft: {md: "10%"},
          }}
        >
          <Typography
            sx={{
              fontFamily: "StackSansNotch, sans-serif",
              fontSize: { xs: 26, md: 32 },
              fontWeight: 700,
              mb: 3,
              color: theme.palette.primary.main,
            }}
          >
            {title1} <br /> {title2}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              mb: 3,
              color: theme.palette.primary.main,
              maxWidth: 420,
            }}
          >
            {description1}
            <br />
            <br />
            {description2}
          </Typography>

          <Button href={link}
            //variant="contained"
            sx={{
             // bgcolor: "#2F2E2E",
              //color: "#fff",
              px: 3,
              py: 1,
            //  borderRadius: 1,
            //  textTransform: "none",
            //  fontWeight: 600,
            //  fontFamily: "Quicksand, sans-serif",
            //  ":hover": { bgcolor: "#444" },
            }}
          >
            {link_description}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}