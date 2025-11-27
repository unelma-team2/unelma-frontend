"use client";

import { Box, Typography, Link, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function SocialAndSupport() {
  return (
    <Box sx={{ mt: 10, mb: 6, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Find Us on Social Media
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Follow Unelma Platforms for news and updates.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 8 }}>
        <CircleIconButton href="https://www.linkedin.com/company/unelma">
          <LinkedInIcon />
        </CircleIconButton>
        <CircleIconButton href="https://x.com/unelmaplatforms">
          <XIcon />
        </CircleIconButton>
        <CircleIconButton href="https://facebook.com/unelmaplatforms">
          <FacebookIcon />
        </CircleIconButton>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Tech Support
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Technical issues with Unelma products? Contact our support team.
      </Typography>
      <Link href="https://unelmasupport.com" target="_blank" rel="noreferrer">
        https://unelmasupport.com
      </Link>
    </Box>
  );
}

function CircleIconButton({ children, href }) {
  return (
    <IconButton
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      sx={{
        width: 54,
        height: 54,
        borderRadius: "50%",
        border: "1px solid #9de0f2",
        backgroundColor: "#e4f8ff",
      }}
    >
      {children}
    </IconButton>
  );
}

