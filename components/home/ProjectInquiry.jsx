"use client"

import { Box, Typography, Button, useTheme } from "@mui/material"

export default function ProjectInquiry({ projectInquiry }) {
  const theme = useTheme()

  const { title1, title2, description1, description2, link, link_description } = projectInquiry

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: "600px", sm: "700px", md: "750px" },
        m: 0,
        p: 0,
      }}
    >
      <Box
        sx={{
          bgcolor: "#181b2b",
          borderTop: theme.mixins.borderStyle,
          borderLeft: theme.mixins.borderStyle,
          borderRight: theme.mixins.borderStyle,
          borderTopRightRadius: { xs: "60px", sm: "90px", md: "120px" },
          borderBottom: { xs: theme.mixins.borderStyle, sm: theme.mixins.borderStyle, md: "none" },
          boxShadow: `-10px -8px 0px ${theme.palette.text.secondary}`,
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: { xs: "100%", sm: "90%", md: "calc(100% + 245px)" },
          display: "flex",
          alignItems: { xs: "center", sm: "center", md: "flex-start" },
          justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          pl: 0,
          pr: { xs: 3, sm: 4, md: 6 },
          py: { xs: 4, sm: 6, md: "20%" },
        }}
      >
        <Box
          sx={{
            ml: { xs: 2, sm: "80px", md: "175px" },
            maxWidth: { xs: "100%", sm: 420, md: 380 },
          }}
        >
          <Box sx={{ ml: 1 }}>
            <Typography
              sx={{
                fontFamily: theme.typography.fontFamily.bodyFont,
                fontSize: { xs: 36, sm: 40, md: 44 },
                fontWeight: 700,
                mb: { xs: 3, sm: 4, md: 5 },
                color: theme.palette.text.contrast,
              }}
            >
              {title1} <br /> {title2}
            </Typography>

            <Typography
              sx={{
                fontFamily: theme.typography.fontFamily.bodyFont,
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: 500,
                lineHeight: 1.6,
                mb: { xs: 3, sm: 4, md: 5 },
                color: theme.palette.text.contrast,
              }}
            >
              {description1}
              <br />
              <br />
              {description2}
            </Typography>

            <Button
              href={link}
              sx={{
                px: 4,
                py: 1,
                mt: 2,
                fontSize: { xs: 14, sm: 16, md: 18 },
                backgroundColor: theme.palette.section.blog.main,
                color: theme.palette.primary.main,
                 "&:hover": {
                  backgroundColor: theme.palette.section.caseStudies.main,
              }}
            }
            >
              {link_description}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
