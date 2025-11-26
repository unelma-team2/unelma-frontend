"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import Image from "next/image";
import { Box, Link, useTheme } from "@mui/material";
import SocialButtons from "./SocialButtons";
import NewsletterSubscription from "./NewsletterSubscription";

export default function Footer() {
  const theme = useTheme();

  const linkSx = {
    fontSize: "14pt",
    color: theme.palette.primary.main,
    textDecoration: "none",
    display: "inline-block",
    transition: "color 0.18s ease",
    "&:hover": {
      color: theme.palette.primary.blue,
      transform: "scale(1.05)",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.lightMint,
        color: theme.palette.primary.main,
        borderTop: 2,
        borderColor: theme.palette.primary.main,
        mt: 4,
      }}
    >
      <Box sx={{ maxWidth: 1500, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="space-between">
          {/* Column 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Image
                src="/images/logos/logo-unelma.png"
                alt="Unelma Platforms"
                width={190}
                height={92}
              />
            </Box>

            <Link href="#">
              <Typography variant="h4" sx={{ ...linkSx, fontSize: "18pt", mt: 10 }} >
              &#x25B8; Products
            </Typography>
            </Link>
            <br />
            <Link href="#">
              <Typography variant="h4" sx={{ ...linkSx, fontSize: "18pt", mt: 4 }} >
              &#x25B8; Services
            </Typography>
            </Link>

          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Resources
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Link href="/blog">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Blog
                </Typography>
              </Link>
              <br />
              <Link href="/case-studies">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Case Studies
                </Typography>
              </Link>
               <br />
              <Link href="/customer-testimonials">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Customer Testimonials
                </Typography>
              </Link>
              <br />
              <Link href="https://unelmasupport.com/">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Tech Support
                </Typography>
              </Link>
            </Box>

            <Typography variant="h4" sx={{ mb: 2 }}>
              Company
            </Typography>

            <Box sx={{  mb: 4  }}>
              <Link href="/about">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; About Us
                </Typography>
              </Link>
               <br />
              <Link href="/careers">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Careers  
                </Typography>
              </Link>
              <br />
              <Link href="/careers">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Internship/Traineeship
                </Typography>
              </Link>
            </Box>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contact Us
            </Typography>

            <Box sx={{  mb: 4  }}>
              <Link href="/about">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Request a Price Quote
                </Typography>
              </Link>
               <br />
              <Link href="/contact">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Send a Message/Question
                </Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Give Feedback
                </Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Book a Meeting
                </Typography>
              </Link>
              <br />
              <Link href="/contact">
                <Typography  sx={{ ...linkSx }} >
                  &#x25B8; Our Offices
                </Typography>
              </Link>
              <br />

              {/* Indented office items */}
              <Box component="span" sx={{ paddingLeft: 2.75, display: "block" }}>
                <Link href="/contact">
                  <Typography  sx={{ ...linkSx }} >
                    &#x25B8; Northern Europe
                  </Typography>
                </Link>
                <br />
                <Link href="/contact">
                  <Typography  sx={{ ...linkSx }} >
                    &#x25B8; USA
                  </Typography>
                </Link>
                <br />
                <Link href="/contact">
                  <Typography  sx={{ ...linkSx }} >
                    &#x25B8; Canada
                  </Typography>
                </Link>
                <br />
                <Link href="/contact">
                  <Typography  sx={{ ...linkSx }} >
                    &#x25B8; South Asia
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter Subscription*/}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
            }}
          >
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
          height: 120, 
        }}
      >
        <Image src={logo.src} width={logo.w} height={logo.h} alt="" />
      </Box>
    ))}
  </Box>
</Box>


        <Typography align="center" sx={{ mt: 2, fontSize: 12, fontWeight: 500,  }}>
          © {new Date().getFullYear()} by Unelma Platforms
        </Typography>
      </Box>
    </Box>
  );
}
