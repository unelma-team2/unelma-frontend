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
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: { xs: 6, md: 4 },
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#C1FCFF",
            border: "2px solid #2F2E2E",
            borderTopRightRadius: "120px",
            borderBottom: "none",
            p: { xs: 3, md: 5 },
            maxWidth: 600,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 26, md: 32 },
              fontWeight: 700,
              mb: 3,
              color: "#2F2E2E",
            }}
          >
            Have a project <br /> in mind?
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.6,
              mb: 3,
              color: "#2F2E2E",
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

          <Button
            variant="contained"
            sx={{
              bgcolor: "#2F2E2E",
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              ":hover": { bgcolor: "#444" },
            }}
          >
            GET IN TOUCH
          </Button>
        </Box>

        {/* RIGHT SIDE METRICS */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(2, 1fr)" },
            rowGap: 5,
            columnGap: { xs: 3, md: 6 },
            alignItems: "center",
            justifyContent: "center",
            pt: { xs: 2, md: 5 },
          }}
        >
          {/* Metric Item */}
          {[
            { number: "1 M+", label1: "Happy", label2: "Users" },
            { number: "3 M+", label1: "Total", label2: "Downloads" },
            { number: "2", label1: "Awards", label2: "Won" },
            { number: "18", label1: "Total", label2: "Agents" },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                border: "2px solid #2F2E2E",
                bgcolor: "#E9FCFF",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                textAlign: "center",
                color: "#2F2E2E",
                fontWeight: 600,
              }}
            >
              {/* Smile icon bubble */}
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "2px solid #2F2E2E",
                  bgcolor: "#C1FCFF",
                  position: "absolute",
                  top: -18,
                  left: -18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🙂
              </Box>

              <Typography sx={{ fontWeight: 700 }}>{item.number}</Typography>
              <Typography sx={{ fontSize: 14 }}>{item.label1}</Typography>
              <Typography sx={{ fontSize: 14 }}>{item.label2}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}