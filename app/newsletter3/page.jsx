"use client";

import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useEffect } from "react";

export default function SubscriptionBox() {
  useEffect(() => {
    const scripts = [
      "https://core.unelmamail.com/core/js/jquery-3.6.4.min.js",
      "https://core.unelmamail.com/core/js/jquery-migrate-3.4.1.min.js",
      "https://core.unelmamail.com/core/validate/jquery.validate.min.js",
      "https://core.unelmamail.com/jquery_validate_locale",
    ];

    // Load scripts sequentially to ensure jQuery is available
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    let currentIndex = 0;

    const loadNextScript = () => {
      if (currentIndex < scripts.length) {
        loadScript(scripts[currentIndex], loadNextScript);
        currentIndex++;
      } else {
        // Initialize form validation after all scripts are loaded
        const initJsScript = document.createElement("script");
        initJsScript.innerHTML = `
          jQuery(document).ready(function($) {
            $(".subscribe-embedded-form form").validate({
              rules: {
                EMAIL: {
                  required: true,
                  email: true,
                  remote: "${process.env.NEXT_PUBLIC_VALIDATE_EMAIL_URL}"
                },
              }
            });
            initJs($('.subscribe-embedded-form'));
          });
        `;
        document.body.appendChild(initJsScript);
      }
    };

    loadNextScript();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#C1FCFF",
        borderRadius: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "#2F2E2E",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Sign up for email updates!
      </Typography>

      <form
        action={process.env.NEXT_PUBLIC_EMBEDDED_FORM_URL}
        method="POST"
        className="form-validate-jqueryz"
      >
        {/* Hidden redirect_url field */}
        <input
          type="hidden"
          name="redirect_url"
          value={process.env.NEXT_PUBLIC_REDIRECT_URL}
        />
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{ color: "#555", fontSize: 14, mb: 1 }}
          >
            Email <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="EMAIL"
            placeholder="Enter your email"
            name="EMAIL"
            fullWidth
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#2F2E2E" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <input type="checkbox" name="acm_term" required />
          <Typography
            variant="body2"
            sx={{ color: "#2F2E2E", fontSize: 12, ml: 1 }}
          >
            By checking this box, I acknowledge that I have read and understood
            the{" "}
            <a href="" target="_blank" style={{ color: "#2F2E2E" }}>
              Terms and Conditions
            </a>{" "}
            governing this subscription service and agree to be bound by them.
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2F2E2E",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: 1,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          Subscribe
        </Button>
      </form>
    </Paper>
  );
}