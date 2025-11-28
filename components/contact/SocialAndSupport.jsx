"use client";

import { Box, Typography, Link, IconButton } from "@mui/material";
import SocialButtons from "../SocialButtons";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

export default function SocialAndSupport() {
  return (
    <Box sx={{ mt: 20, mb: 6, textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 4 }}>
        Find Us on Social Media
      </Typography>
      <Typography variant="body2" sx={{ mb: 8 }}>
        Follow Unelma Platforms for news and updates.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 22 }}>
      <SocialButtons sx={{ backgroundColor: "#C1FCFF" }} />
      </Box>

      <Typography variant="h2" sx={{ fontWeight: 700, mb: 8 }}>
        Tech Support
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Technical issues with Unelma products?
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Contact our support team here:
      </Typography>
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center",
          mt: 4
        }}
      >
        <Link 
          href="https://unelmasupport.com" 
          target="_blank" 
          rel="noreferrer"
          sx={{ 
            color: "blue", 
            fontSize: 16,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <ArrowForwardTwoToneIcon sx={{ color: "blue" }} /> 
          https://unelmasupport.com
        </Link>
      </Box>
    </Box>
  );
}

