import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function HeroPage({ title, image1, image2, compact = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "center" },
        justifyContent: "space-between",
        bgcolor: "#ffffff",
        px: { xs: 3, md: 6 },
        py: compact ? { xs: 4, md: 6 } : { xs: 6, md: 8 },
        width: "100%",
        maxWidth: "1440px",
        height: compact ? { xs: "auto", md: "220px" } : { xs: "auto", md: "550px" },
        mb: compact ? 6 : 12,
        mx: "auto",
        gap: { xs: 4, md: 6 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: compact ? { xs: "28px", md: "40px" } : { xs: "32px", md: "72px" },
          lineHeight: 1.05,
          flexBasis: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-end" },
          flexBasis: { xs: "100%", md: "50%" },
          width: "100%",
        }}
      >
        {image1 && (
          <Box
            sx={{
              width: compact ? { xs: "50%", md: `${image1.width}px` } : { xs: "60%", md: `${image1.width}px` },
              maxWidth: { xs: 180, sm: 320, md: image1.width ? `${image1.width}px` : "100%" },
              flexShrink: 0,
            }}
          >
            <Image
              src={image1.src}
              alt={image1.alt}
              width={image1.width}
              height={image1.height}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Box>
        )}

        {image2 && !compact && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: image2.width ? `${image2.width}px` : "auto",
              maxWidth: { md: image2.width ? `${image2.width}px` : "100%" },
              flexShrink: 0,
            }}
          >
            <Image
              src={image2.src}
              alt={image2.alt}
              width={image2.width}
              height={image2.height}
              loading="eager"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}