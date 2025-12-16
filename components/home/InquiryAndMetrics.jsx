"use client"

import { Box } from "@mui/material"
import ProjectInquiry from "./ProjectInquiry"
import Metrics from "./Metrics"

export default function InquiryAndMetrics({ metrics, projectInquiry }) {
  return (
    <Box
  sx={{
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "stretch",
    my: { xs: 4, sm: 6, md: 8 },
  }}
>
  {/* Left: Project Inquiry */}
  <Box
    sx={{
      flex: 1,
      minWidth: { xs: "100%", md: "50%" },
    }}
  >
    <ProjectInquiry projectInquiry={projectInquiry} />
  </Box>

  {/* Right: Metrics column */}
  <Box
    sx={{
      flex: 1,
      minWidth: { xs: "100%", md: "50%" },

      // spacing ONLY lives here
      px: { xs: 2, sm: 3, md: 0 },
      pt: { xs: 10, sm: 6, md: 20 },

      display: "flex",
      justifyContent: "center",
    }}
  >
    {/* centering wrapper (NO padding) */}
    <Box
      sx={{
        width: "100%",
        maxWidth: 700, // controls visual width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Metrics metrics={metrics} />
    </Box>
  </Box>
</Box>
  );
}
