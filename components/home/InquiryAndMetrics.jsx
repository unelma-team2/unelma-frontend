"use client";

import { Box } from "@mui/material";
import ProjectInquiry from "./ProjectInquiry";
import Metrics from "./Metrics";

export default function InquiryAndMetrics({metrics,projectInquiry}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderLeft: "2px solid #2F2E2E",
        borderBottom: "2px solid #2F2E2E",
        borderRight: "none",
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
        }}
      >
        <ProjectInquiry projectInquiry={projectInquiry}/>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
          px: { xs: 2, md: 4 },
          pt: { xs: 4, md: 10 },
          pb: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Metrics metrics={metrics}/>
      </Box>
    </Box>
  );
}