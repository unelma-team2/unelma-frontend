"use client";

import { Box, Typography, Link, IconButton, useTheme } from "@mui/material";
import SocialButtons from "../SocialButtons";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

export default function SocialAndSupport() {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 20, mb: 6, textAlign: "center" }}>
      <Typography sx={{ ...theme.typography.headingFont_M, textAlign: "center", mb: 6, textTransform: "uppercase", }}>Find Us on Social Media</Typography>
   
      <Typography  sx={{   ...theme.typography.bodyFontTitle_M_Card,
              mb: 2, textAlign: "center", mb: 14}}>
        Follow Unelma Platforms for news and updates.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 22 }}>
      <SocialButtons  />
      </Box>

       <Typography sx={{ ...theme.typography.headingFont_M, textAlign: "center", mb: 6, textTransform: "uppercase", }}>Tech Support </Typography>
   

       <Typography  sx={{   ...theme.typography.bodyFontTitle_M_Card,
             lineHeight: 1.7, mb: 2, textAlign: "center", mb: 10}}>
         Technical issues <br /> with Unelma products?
      </Typography>

       <Typography  sx={{   ...theme.typography.bodyFontTitle_S,
              mb: 2, textAlign: "center"}}>
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
       <Typography  sx={{   ...theme.typography.bodyFontTitle_L,
              mb: 2, textAlign: "center", mb: 14}}>
            <ArrowForwardTwoToneIcon sx={{ color: "blue", fontSize: 36 }} />  
          https://unelmasupport.com
      </Typography>

        </Link>
      </Box>
    </Box>
  );
}

