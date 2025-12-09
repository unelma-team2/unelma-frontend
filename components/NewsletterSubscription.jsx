"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";

export default function SubscriptionBox() {
  const theme = useTheme();

  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: 550,
        display: "flex",
        flexDirection: { xs: "row", md: "row" }, 
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        border: "2px solid #1D2340",
        borderRadius: "4px",
        overflow: "hidden",
        maxWidth: 700,
        width: "100%",
        mx: "auto",
        color: "primary.main",
      }}
    >
      {/* Left Image */}
      <Box sx={{ flex: 0.5, position: "relative", minHeight: 200 }}>
        <Image
          src="/images/cat.png" // replace with your image path
          alt="Subscribe Cat Image"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      {/* Right Form Content */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          paddingLeft: 0,
        
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            mb: 3,
            fontSize: 26,
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
        sx={{ display: "flex", mb: 2, alignItems: "center" }}
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
                padding: "8px 12px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
          />

        {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              ml: 2,
              fontWeight: 700,
              px: 3,
              py: 0.5,
              textTransform: "uppercase",
              fontSize: 18,
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
        sx={{ color: "primary.main", fontSize: 15, mt: 1 }}
      >
          In accordance with GDPR, we will contact you only when necessary, and
        all personal data collected will be anonymized.
        </Typography>
      </Box>
    </Paper>
  );
}