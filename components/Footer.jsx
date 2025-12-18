"use client"

import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import { Box, Link, useTheme } from "@mui/material"
import SocialButtons from "./SocialButtons"
import NewsletterSubscription from "./NewsletterSubscription"

export default function Footer() {
  const theme = useTheme()

  const linkSx = {
    color: theme.palette.primary.main,
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.25s ease",
    "&:hover": {
      color: theme.palette.section.caseStudies.main,
      transform: "scale(1.05)",
    },
  }

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #FFDDBB 0%, #FFBBBB 100%)",
        color: theme.palette.primary.main,
        borderTop: "2px solid #1D2340",
        boxShadow: `0px -2px 0px ${theme.palette.section.careers.soft}, 0px -4px 0px ${theme.palette.section.careers.pastel}, 0px -14px 0px ${theme.palette.section.careers.main}`,
        mt: { xs: 8, sm: 12, md: 18 },
      }}
    >
      <Box sx={{ maxWidth: 1500, mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 10 } }}>
        {/* Newsletter Subscription - Mobile/Tablet at top */}
        <Box sx={{ mb: { xs: 4, sm: 6 }, display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
          <NewsletterSubscription />
        </Box>

        <Grid container spacing={{ xs: 3, sm: 4, md: 3 }} justifyContent="space-between">
          {/* Column 1 - Logo and Main Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <Image
                src="/images/logos/logo-unelma.png"
                alt="Unelma Platforms"
                width={190}
                height={92}
                style={{
                  width: "100%",
                  maxWidth: "190px",
                  height: "auto",
                }}
              />
            </Box>

            <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
              <Link href="/products">
                <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, ...linkSx }}>&#x25B8; Products</Typography>
              </Link>
              <br />
              <Link href="/services">
                <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, ...linkSx, mt: { xs: 2, sm: 2, md: 3 } }}>
                  &#x25B8; Services
                </Typography>
              </Link>
            </Box>
          </Grid>

          {/* Column 2 - Resources & Company */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, mb: 2 }}>Resources</Typography>

            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <Link href="/blog">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Blog</Typography>
              </Link>
              <br />
              <Link href="/case-studies">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Case Studies</Typography>
              </Link>
              <br />
              <Link href="/case-studies">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Testimonials</Typography>
              </Link>
              <br />
              <Link href="https://unelmasupport.com/" target="_blank" rel="noopener noreferrer">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Tech Support</Typography>
              </Link>
            </Box>

            <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, mb: 2 }}>Company</Typography>

            <Box>
              <Link href="/about">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; About Us</Typography>
              </Link>
              <br />
              <Link href="/careers">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Careers</Typography>
              </Link>
              <br />
              <Link href="/careers#internships">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Internships</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Column 3 - Contact Us */}
          <Grid item xs={6} sm={3} md={4}>
            <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, mb: 2 }}>Contact Us</Typography>

            <Box>
            <Link href="/contact?contactType=Price%20quote%20request">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Price Quote</Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Send Message</Typography>
              </Link>
              <br />
              <Link href="/contact?contactType=Feedback/review">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Give Feedback</Typography>
              </Link>
              <br />
              <Link href="/contact?contactType=Book%20appointment">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Book Meeting</Typography>
              </Link>
              <br />
              <Link href="/contact#offices">
                <Typography sx={{ ...theme.typography.bodyFont_M, ...linkSx }}>&#x25B8; Our Offices</Typography>
              </Link>
              <br />

              {/* Indented office locations */}
              <Box component="span" sx={{ pl: 2.5, display: "block" }}>
                <Link href="/contact?map=Tallinn%20Estonia">
                  <Typography sx={{ ...theme.typography.bodyFont_S, ...linkSx }}>&#x25B8; Northern Europe</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Delaware%20USA">
                  <Typography sx={{ ...theme.typography.bodyFont_S, ...linkSx }}>&#x25B8; USA</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Barrie%20Ontario%20Canada">
                  <Typography sx={{ ...theme.typography.bodyFont_S, ...linkSx }}>&#x25B8; Canada</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Ratnanagar%20Chitwan%20Nepal">
                  <Typography sx={{ ...theme.typography.bodyFont_S, ...linkSx }}>&#x25B8; South Asia</Typography>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Subscription - Desktop only on right */}
          <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <NewsletterSubscription />
          </Grid>
        </Grid>

        {/* Social Media and Partner Logos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 6, sm: 8, md: 10 },
            gap: { xs: 4, md: 0 },
          }}
        >
          <SocialButtons />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 3, sm: 4, md: 5 },
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
            }}
          >
            {[
              { src: "/images/logos/logo-businessfinland.png", w: 112, h: 48 },
              { src: "/images/logos/logo-estonia.png", w: 193, h: 83 },
              { src: "/images/logos/logo-sortlist.png", w: 253, h: 89 },
              { src: "/images/logos/logo-gotd.png", w: 89, h: 105 },
              { src: "/images/logos/logo-drupal.png", w: 121, h: 95 },
            ].map((logo, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: { xs: 60, sm: 80, md: 100 },
                  maxWidth: { xs: 80, sm: 120, md: 150 },
                }}
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  width={logo.w}
                  height={logo.h}
                  alt="Partner logo"
                  style={{
                    width: "auto",
                    height: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: { xs: 4, sm: 5, md: 6 },
            flexWrap: "wrap",
          }}
        >
          <Typography sx={theme.typography.bodyFont_S}>© {new Date().getFullYear()} by Unelma Platforms</Typography>

          <Typography sx={theme.typography.bodyFont_S}>
            • Icons by{" "}
            <Link
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                ...theme.typography.bodyFont_S,
                color: theme.palette.primary.main,
                textDecoration: "underline",
                "&:hover": { color: theme.palette.section.caseStudies.main },
              }}
            >
              Icons8
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
