"use client"

import { Box, Typography, TextField, Button, Paper, InputAdornment, useTheme } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import Image from "next/image"

export default function SubscriptionBox() {
  const theme = useTheme()

  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { xs: "100%", sm: 500, md: 550 },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0.5, sm: 1, md: 1 },
        border: "2px solid #1D2340",
        overflow: "hidden",
        maxWidth: 550,
        width: "100%",
        mx: "auto",
        color: theme.palette.primary.main,
        boxShadow: `-4px -4px 0px  ${theme.palette.section.contact.pastel}, -14px -12px 0px ${theme.palette.section.contact.main}`,
        backgroundColor: theme.palette.section.caseStudies.soft,
      }}
    >
      {/* Left Image */}
      <Box
        sx={{
          flex: { xs: 0.3, sm: 0.5, md: 0.5 },
          position: "relative",
          minHeight: { xs: 150, sm: 180, md: 250 },
          width: "auto",
        }}
      >
        <Image src="/images/cat.png" alt="Subscribe Cat Image" fill style={{ objectFit: "contain" }} />
      </Box>

      {/* Right Form Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 1.5, sm: 3, md: 3 },
          paddingLeft: { xs: 1, sm: 0, md: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            ...theme.typography.bodyFontTitle_M_Card,
            mb: { xs: 1.5, sm: 2.5, md: 3 },
            fontSize: { xs: 16, sm: 24, md: 26 },
            color: theme.palette.primary.main,  
            letterSpacing: 0.8,
          }}
        >
          Sign up for email updates!
        </Typography>

        <Box
          component="form"
          action="https://core.unelmamail.com/lists/691d96ff827d9/691d89899267f/embedded-form-subscribe-captcha"
          method="POST"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 2,
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          {/* Email Input */}
          <TextField
            size="small"
            variant="outlined"
            placeholder="Email"
            name="EMAIL"
            fullWidth
       
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "primary.main", fontSize: { xs: 18, sm: 24 } }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              ml: { xs: 0, sm: 2 },
              mt: { xs: 2, sm: 0 },
              fontWeight: 600,
              px: { xs: 1.5, sm: 2.5, md: 3 },
              py: 0.5,
              fontSize: { xs: 13, sm: 17, md: 18 },
            }}
          >
            Submit
          </Button>
        </Box>

        <Typography
          sx={{
            ...theme.typography.bodyFont_S,
            color: theme.palette.text.secondary,
            mt: 1,
          }}
        >
          In accordance with GDPR, we will contact you only when necessary, and all personal data collected will be
          anonymized.
        </Typography>
      </Box>
    </Paper>
  )
}
