"use client"

import { Card, CardMedia, CardContent, Typography, useTheme } from "@mui/material"
import Link from "next/link"

export default function WorkProjectCard({ work, API_URL }) {
  const theme = useTheme()
  const { id, title, slug, image } = work || {}

  const imageUrl = image?.url ? (image.url.startsWith("http") ? image.url : `${API_URL}${image.url}`) : null

  return (
    <Link href={`/work/${slug}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: 450,
          width: 300,
          mt: 2,
          textAlign: "center",
          ...theme.mixins.borderStyle,
          boxShadow: `-8px -6px 0px  ${theme.palette.section.caseStudies.main}`, 
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          overflow: "hidden",
          cursor: "pointer",

          "&:hover": {
            transform: "translateY(-6px)",
              boxShadow: `-10px -8px 0px  ${theme.palette.section.caseStudies.vibrant}`,
             
          },

          "&:hover .workImage": {
            transform: "scale(1.05)",
            //boxShadow: `-5px -4px 0px ${theme.palette.primary.main}`,
          },

          "&:hover .workTitle": {
            color: theme.palette.primary.main,
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Large Cover Image */}
        <CardMedia
          className="workImage"
          component="img"
          height="86%"
          image={imageUrl || "/placeholder.svg?height=375&width=300"}
          style={{ objectFit: "cover" }}
          alt={title}
          sx={{
            transition: "transform 0.3s ease",
          }}
        />

        {/* Small Text Bar at Bottom */}
        <CardContent
          sx={{
            background: theme.palette.section.caseStudies.soft,
            py: 2,
            px: 3,
          }}
        >
          <Typography
            className="workTitle"
            sx={{
              ...theme.typography.bodyFont_M,
              fontWeight: 700,
              transition: "color 0.3s ease, transform 0.3s ease",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
