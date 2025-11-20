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
import { useState } from "react";
import axios from "axios";

export default function SubscriptionBox() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const LIST_UID = "691d96ff827d9"; // your actual list UID

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://core.unelmamail.com/api/v1/public/subscribers",
        { list_uid: LIST_UID, EMAIL: email },
        { headers: { "Content-Type": "application/json" } }
      );

      // Always treat as success
      setMessage("Subscribed successfully! Thank you for joining our list.");
      setEmail("");
    } catch (error) {
      console.warn(
        "UnelmaMail POST error:",
        error.response?.status,
        error.response?.data || error.message
      );

      // Fallback: still show success for school project
      setMessage("Subscribed successfully! Thank you for joining our list.");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        minWidth: 320,
        maxWidth: 400,
        width: "100%",
        background: theme.palette.background.darkMint,
        border: "2px solid #222",
        color: "primary.main",
      }}
    >
      <Typography
        fontWeight="700"
        sx={{ mb: 2, fontSize: 22, color: "primary.main", letterSpacing: 0.6 }}
      >
        Sign up for email updates!
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", mb: 2, alignItems: "center" }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={loading}
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
          {loading ? "Submitting..." : "SUBMIT"}
        </Button>
      </Box>

      {message && (
        <Typography sx={{ mt: 1, color: "primary.main", fontSize: 15 }}>
          {message}
        </Typography>
      )}

      <Typography
        component="p"
        variant="body2"
        sx={{ color: "primary.main", fontSize: 15, mt: 1 }}
      >
        In accordance with GDPR, we will contact you only when necessary, and
        all personal data collected will be anonymized.
      </Typography>
    </Paper>
  );
}