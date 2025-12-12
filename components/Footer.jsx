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
    fontSize: { xs: "12pt", sm: "11pt", md: "14pt" },
    color: theme.palette.primary.main,
    textDecoration: "none",
    display: "inline-block",
    transition: "color 0.18s ease",
    "&:hover": {
      color: theme.palette.primary.blue,
      transform: "scale(1.05)",
    },
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.lightBlue2,
        color: theme.palette.primary.main,
        borderTop: 2,
        borderColor: theme.palette.primary.main,
        boxShadow: `-10px -8px 0px ${theme.palette.primary.blue2}`,
        mt: { xs: 8, sm: 12, md: 18 },
      }}
    >
      <Box sx={{ maxWidth: 1500, mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, sm: 8, md: 10 } }}>
        {/* Newsletter Subscription - Mobile/Tablet only */}
        <Box sx={{ mb: { xs: 4, sm: 6 }, display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
          <NewsletterSubscription />
        </Box>

        <Grid container spacing={{ xs: 4, sm: 2, md: 3 }} justifyContent="space-between">
          {/* Column 1 */}
          <Grid item xs={12} sm={4} md={2} sx={{ order: { xs: 1, sm: 0, md: 0 } }}>
            <Box sx={{ mb: 2 }}>
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

            <Box sx={{ mt: { xs: 4, sm: 8, md: 12 }  }}>
            <Link href="#">
              <Typography
                variant="h4"
                sx={{ ...linkSx, fontSize: { xs: "16pt", sm: "15pt", md: "20pt" }, mt: { xs: 4, sm: 6, md: 4 } }}
              >
                &#x25B8; Products
              </Typography>
            </Link>
            <br />
            <Link href="#">
              <Typography
                variant="h4"
                sx={{ ...linkSx, fontSize:{ xs: "16pt", sm: "15pt", md: "20pt" }, mt: { xs: 2, sm: 3, md: 4 } }}
              >
                &#x25B8; Services
              </Typography>
            </Link>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={4} md={2} sx={{ order: { xs: 2, sm: 1, md: 1 } }}>
            <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: "16pt", sm: "15pt", md: "20pt" } }}>
              Resources
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Link href="/blog">
                <Typography sx={{ ...linkSx }}>&#x25B8; Blog</Typography>
              </Link>
              <br />
              <Link href="/case-studies">
                <Typography sx={{ ...linkSx }}>&#x25B8; Case Studies</Typography>
              </Link>
              <br />
              <Link href="/customer-testimonials">
                <Typography sx={{ ...linkSx }}>&#x25B8; Customer Testimonials</Typography>
              </Link>
              <br />
              <Link href="https://unelmasupport.com/">
                <Typography sx={{ ...linkSx }}>&#x25B8; Tech Support</Typography>
              </Link>
            </Box>

            <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: "16pt", sm: "15pt", md: "20pt" } }}>
              Company
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Link href="/about">
                <Typography sx={{ ...linkSx }}>&#x25B8; About Us</Typography>
              </Link>
              <br />
              <Link href="/careers">
                <Typography sx={{ ...linkSx }}>&#x25B8; Careers</Typography>
              </Link>
              <br />
              <Link href="/careers">
                <Typography sx={{ ...linkSx }}>&#x25B8; Internship/Traineeship</Typography>
              </Link>
            </Box>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={4} md={4} sx={{ order: { xs: 3, sm: 2, md: 2 } }}>
            <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: "16pt", sm: "15pt", md: "20pt" } }}>
              Contact Us
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Link href="/about">
                <Typography sx={{ ...linkSx }}>&#x25B8; Request a Price Quote</Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography sx={{ ...linkSx }}>&#x25B8; Send a Message/Question</Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography sx={{ ...linkSx }}>&#x25B8; Give Feedback</Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography sx={{ ...linkSx }}>&#x25B8; Book a Meeting</Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography sx={{ ...linkSx }}>&#x25B8; Our Offices</Typography>
              </Link>
              <br />

              {/* Indented office items */}
              <Box component="span" sx={{ paddingLeft: 2.75, display: "block" }}>
                <Link href="/contact?map=Tallinn%20Estonia">
                  <Typography sx={{ ...linkSx }}>&#x25B8; Northern Europe</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Delaware%20USA">
                  <Typography sx={{ ...linkSx }}>&#x25B8; USA</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Barrie%20Ontario%20Canada">
                  <Typography sx={{ ...linkSx }}>&#x25B8; Canada</Typography>
                </Link>
                <br />
                <Link href="/contact?map=Ratnanagar%20Chitwan%20Nepal">
                  <Typography sx={{ ...linkSx }}>&#x25B8; South Asia</Typography>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Subscription - Desktop only */}
          <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" }, order: 3 }}>
            <NewsletterSubscription />
          </Grid>
        </Grid>

        {/* Bottom Logos */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 4, md: 8 },
            gap: { xs: 4, md: 0 },
          }}
        >
          <SocialButtons />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 5 },
              justifyContent: { xs: "center", md: "flex-end" },
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
                  height: { xs: 80, sm: 100, md: 120 },
                }}
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  width={logo.w}
                  height={logo.h}
                  alt=""
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
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
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ fontSize: { xs: 10, sm: 11, md: 12 }, fontWeight: 500 }}>
            © {new Date().getFullYear()} by Unelma Platforms
          </Typography>

          <Typography sx={{ fontSize: { xs: 10, sm: 11, md: 12 }, fontWeight: 500 }}>
            • Icons by{" "}
            <Link
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Icons8
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
