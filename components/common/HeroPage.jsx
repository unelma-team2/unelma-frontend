import Image from "next/image"
import { Box, Typography } from "@mui/material"

export default function HeroPage({
  title,
  image1,
  image2,
  compact = false,
  showImages = true,
}) {
  // Fallback image config
  const fallbackImage1 = {
    src: "/images/shipping&billing_hero.png",
    alt: title || "Hero image",
    width: 800,
    height: 700,
  }

  const finalImage1 = image1?.src ? image1 : fallbackImage1

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#ffffff",
        px: { xs: 3, md: 6 },
        py: compact ? { xs: 4, md: 6 } : { xs: 6, md: 8 },
        width: "100%",
        maxWidth: "1440px",
        height: compact
          ? { xs: "auto", md: "220px" }
          : { xs: "auto", md: "550px" },
        mb: compact ? 6 : 12,
        mx: "auto",
        gap: { xs: 4, md: 6 },
      }}
    >
      {/* -------- Title -------- */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: compact
            ? { xs: "28px", md: "40px" }
            : { xs: "32px", md: "72px" },
          lineHeight: 1.05,
          flexBasis: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {title}
      </Typography>

      {/* -------- Images -------- */}
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
        {/* Image 1 */}
        {/* -------- Images -------- */}
{showImages && (
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
    {/* Image 1 */}
    {finalImage1 && (
      <Box
        sx={{
          width: compact
            ? { xs: "50%", md: finalImage1.width }
            : { xs: "60%", md: finalImage1.width },
          maxWidth: { xs: 180, sm: 320, md: finalImage1.width },
          flexShrink: 0,
        }}
      >
        <Image
          src={finalImage1.src}
          alt={finalImage1.alt}
          width={finalImage1.width}
          height={finalImage1.height}
          priority
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    )}

    {/* Image 2 */}
    {image2?.src && !compact && (
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Image {...image2} />
      </Box>
    )}
  </Box>
)}

      </Box>
    </Box>
  )
}
