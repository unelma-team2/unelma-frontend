"use client";

import { Box, Typography, TextField, Button, Paper, InputAdornment, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function SubscriptionBox() {
  const theme = useTheme();

  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        minWidth: 320,
        background: theme.palette.background.darkMint,
        border: "2px solid #222",
        maxWidth: 400,
        color: "primary.main",
        width: "100%",
      }}
    >
      <Typography
        fontWeight="700"
        sx={{
          mb: 2,
          fontSize: 22,
          color: "primary.main",
          letterSpacing: 0.6,
        }}
      >
        Sign up for email updates!
      </Typography>

      <Box component="form" sx={{ display: "flex", mb: 2, alignItems: "center" }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Email"
          fullWidth
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "primary.main" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            ml: 2,
            bgcolor: "#222",
            color: "#fff",
            fontWeight: 700,
            px: 3,
            py: 0.5,
            borderRadius: 1,
            textTransform: "none",
            boxShadow: "none",
            fontSize: 18,
            ":hover": { bgcolor: "#444" },
          }}
        >
          SUBMIT
        </Button>
      </Box>

      <Typography component="p" variant="body2" sx={{ color: "primary.main", fontSize: 15, mt: 1 }}>
        In accordance with GDPR, we will contact you only when necessary, and all personal data collected will be anonymized.
      </Typography>
    </Paper>
  );
}
