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
        border: "4px solid #1D2340",
        borderRadius: "4px",
        overflow: "hidden",
        maxWidth: 550,
        width: "100%",
        mx: "auto",
        color: "primary.main",
        boxShadow: `-5px -5px 0px  ${theme.palette.section.careers.vibrant}, -10px -10px 0px ${theme.palette.section.careers.main}, -15px -15px 0px ${theme.palette.section.careers.pastel}`,
        backgroundColor: theme.palette.section.caseStudies.soft,
      }}
    >
      {/* Left Image */}
      <Box
        sx={{
          flex: { xs: 0.3, sm: 0.5 },
          position: "relative",
          minHeight: { xs: 150, sm: 180, md: 200 },
          width: "auto",
        }}
      >
        <Image src="/images/cat.png" alt="Subscribe Cat Image" fill style={{ objectFit: "contain" }} />
      </Box>

      {/* Right Form Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 1.5, sm: 3, md: 4 },
          paddingLeft: { xs: 1, sm: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            mb: { xs: 1.5, sm: 2.5, md: 3 },
            fontSize: { xs: 16, sm: 24, md: 26 },
            color: "primary.main",
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
            sx={{
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                border: "2px solid" + theme.palette.primary.main,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid" + theme.palette.primary.blue1,
                  borderRadius: "4px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid" + theme.palette.primary.blue1,
                  borderRadius: "4px",
                },
              },
              "& .MuiInputBase-input": {
                padding: { xs: "6px 8px", sm: "8px 12px" },
                fontSize: { xs: 13, sm: 14 },
              },
            }}
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
              fontWeight: 700,
              px: { xs: 1.5, sm: 2.5, md: 3 },
              py: 0.5,
              textTransform: "uppercase",
              fontSize: { xs: 13, sm: 17, md: 18 },
              transition: "0.25s ease",
              "&:hover": {
                boxShadow: "0px 6px 6px rgba(0,0,0,0.20)",
                backgroundColor: theme.palette.primary.violet,
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            Submit
          </Button>
        </Box>

        <Typography
          component="p"
          variant="body2"
          sx={{
            color: "primary.main",
            fontSize: { xs: 11, sm: 14, md: 15 },
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
