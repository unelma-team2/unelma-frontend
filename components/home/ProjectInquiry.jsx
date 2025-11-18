"use client";

import { Box, Typography, Button, useTheme } from "@mui/material";

export default function ProjectInquiry() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          maxWidth: 1650,
          mx: "auto",
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "center",  
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.darkMint,
            border: `2px solid ${theme.palette.primary.main}`,
            borderTopRightRadius: "120px",
            borderBottom: "none",
            p: { xs: 3, md: 6 },
            maxWidth: { xs: "100%", md: "650px" },
            mt: { md: -4 },
            marginLeft: {md: "10%"},
          }}
        >
          <Typography
            sx={{
              fontFamily: "StackSansNotch, sans-serif",
              fontSize: { xs: 26, md: 32 },
              fontWeight: 700,
              mb: 3,
              color: theme.palette.text.primary,
            }}
          >
            Have a project <br /> in mind?
          </Typography>

          <Typography
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              mb: 3,
              color: theme.palette.text.primary,
              maxWidth: 420,
            }}
          >
            We’d love to hear about it. Whether you're developing a new idea or
            seeking guidance on a proposal, our experts are here to help.
            <br />
            <br />
            Get in touch — our initial advice and recommendations are always
            free.
          </Typography>

          <Button href="/contact"
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Quicksand, sans-serif",
              ":hover": { bgcolor: "#444" },
            }}
          >
            GET IN TOUCH
          </Button>
        </Box>
      </Box>
    </Box>
  );
}