"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Box, TextField, Button, Paper, useTheme, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SocialButtons from "./SocialButtons";
import NewsletterSubscription from "./NewsletterSubscription";


export default function Footer() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{
      bgcolor:  theme.palette.background.lightMint,
      color: theme.palette.primary.main,
      borderTop: 1, borderColor: "theme.palette.primary.main", mt: 4,
    }}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          alignItems="flex-start"
          justifyContent="space-between"
          wrap="wrap"
        >

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Image src="/images/logos/logo-unelma.png"alt="Unelma Platforms" width={174} height={92} />
            </Box>
            <Typography component="div" sx={{ fontWeight: 700, mt: 4, fontSize: 24, color: theme.palette.primary.main }}>
              <span>&gt; </span>Products
            </Typography>
            <Typography component="div" sx={{ fontWeight: 700, mt: 2, fontSize: 24, color: theme.palette.primary.main }}>
              <span>&gt; </span>Services
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography fontWeight="700" sx={{ fontSize: 28, mb: 2, color: theme.palette.primary.main }}>Resources</Typography>
            <Box sx={{ fontSize: 22, mb: 4 }}>
              <Link href="/blog">&gt; Blog</Link><br />
              <Link href="/case-studies">&gt; Case Studies</Link><br />
              <a href="#">&gt; Customer Testimonials</a><br />
              <a href="#">&gt; Tech Support</a>
            </Box>
            <Typography fontWeight="700" sx={{ mt: 3, mb: 2, fontSize: 28, color: theme.palette.primary.main }}>Company</Typography>
            <Box sx={{ fontSize: 22 }}>
              <Link href="/about">&gt; About Us</Link><br />
              <Link href="/careers">&gt; Careers</Link><br />
              <a href="#">&gt; Internship/Traineeship</a>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography fontWeight="700" sx={{ fontSize: 28, mb: 2, color: theme.palette.primary.main }}>Contact Us</Typography>
            <Box sx={{ fontSize: 22 }}>
              <a href="#">&gt; Request a Price Quote</a><br />
              <Link href="/contact">&gt; Send a Message/Question</Link><br />
              <a href="#">&gt; Give Feedback</a><br />
              <a href="#">&gt; Book a Meeting</a><br />
              <a href="#">&gt; Our Offices</a><br />
              <span style={{ display: 'block', paddingLeft: 22 }}>&gt; South Asia</span>
              <span style={{ display: 'block', paddingLeft: 22 }}>&gt; USA</span>
              <span style={{ display: 'block', paddingLeft: 22 }}>&gt; Canada</span>
              <span style={{ display: 'block', paddingLeft: 22 }}>&gt; Northern Europe</span>
            </Box>
          </Grid>

          <Grid
  size={{ xs: 12, md: 3 }}
  sx={{
    display: "flex",
    justifyContent: { xs: "center", md: "flex-end" },
    alignItems: { xs: "center", md: "flex-start" },
    mt: { xs: 3, md: 0 },
    order: { xs: 4, md: 4 },
  }}
>
  <NewsletterSubscription />
</Grid>

        </Grid>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 4, md: 0 },
          mt: { xs: 4, md: 6 },
          mb: 2,
        }}>

         <SocialButtons />
         
  
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 6 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
            <Image src="/images/logos/logo-businessfinland.png" width={112} height={48} alt="Business Finland" />
            <Image src="/images/logos/logo-estonia.png" width={193} height={83} alt="Estonia" />
            <Image src="/images/logos/logo-sortlist.png" width={253} height={89} alt="sortlist" />
            <Image src="/images/logos/logo-gotd.png" width={98} height={116} alt="Gotd" />
            <Image src="/images/logos/logo-drupal.png" width={121} height={95} alt="Drupal" />
          </Box>
        </Box>

        <Typography align="center" sx={{ mt: 2, fontSize: 17, color: theme.palette.primary.main, fontWeight: 500 }}>
          © {new Date().getFullYear()} by Unelma Platforms
        </Typography>
      </Box>
    </Box>
  );
}
