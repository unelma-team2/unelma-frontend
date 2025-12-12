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
        justifyContent: "space-between",
        alignItems: "stretch", 
        mt: 0,
        minHeight: { xs: "600px", sm: "700px", md: "750px" }, 
        my: { xs: 4, sm: 6, md: 8 }, 
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
        }}
      >
        <ProjectInquiry projectInquiry={projectInquiry} />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: "50%" },
          px: { xs: 2, md: 4 },
          pt: { xs: 4, md: 10 },
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Metrics metrics={metrics} />
      </Box>
    </Box>
  )
}
