"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Box, TextField, Button, Paper, useTheme, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{
      bgcolor: theme.palette.background.footer,
      color: theme.palette.primary.main,
      borderTop: 1, borderColor: "#000000ff", mt: 4,
    }}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          alignItems="flex-start"
          justifyContent="space-between"
          wrap="wrap"
        >

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Image src="/logo/unelma-logo.svg" alt="Unelma Platforms" width={120} height={90} />
            </Box>
            <Typography component="div" sx={{ fontWeight: 700, mt: 4, fontSize: 24, color: theme.palette.primary.main }}>
              <span>&gt; </span>Products
            </Typography>
            <Typography component="div" sx={{ fontWeight: 700, mt: 2, fontSize: 24, color: theme.palette.primary.main }}>
              <span>&gt; </span>Services
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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

          <Grid item xs={12} sm={6} md={3}>
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
            item xs={12} md={3}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: { xs: 'center', md: 'flex-start' },
              mt: { xs: 3, md: 0 },
              order: { xs: 4, md: 4 },
            }}
          >
            <Paper elevation={5} sx={{
              p: 4,
              minWidth: 320,
              background: '#C1FCFF',
              border: '2px solid #222',
              maxWidth: 400,
              color: '#000',
              width: '100%'
            }}>
              <Typography fontWeight="700" sx={{ mb: 2, fontSize: 22, color: '#000', letterSpacing: .6 }}>Sign up for email updates!</Typography>
              <Box component="form" sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Email"
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 1, '& .MuiInputBase-input': { color: '#000' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#000' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="submit" variant="contained" sx={{ ml: 2, bgcolor: '#222', color: '#fff', fontWeight: 700, px: 3, py: 0.5, borderRadius: 1, textTransform: 'none', boxShadow: 'none', fontSize: 18, ':hover': { bgcolor: '#444' } }}>SUBMIT</Button>
              </Box>
              <Typography component="p" variant="body2" sx={{ color: '#000', fontSize: 15, mt: 1 }}>
                In accordance with GDPR, we will contact you only when necessary, and all personal data collected will be anonymized.
              </Typography>
            </Paper>
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

          <Box sx={{ display: 'flex', gap: 3, mb: { xs: 3, md: 0 } }}>
            <Image src="/logo/linkedin.svg" alt="LinkedIn" width={60} height={60} />
            <Image src="/logo/twitter.svg" alt="Twitter" width={60} height={60} />
            <Image src="/logo/facebook.svg" alt="Facebook" width={60} height={60} />
          </Box>
  
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 6 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
            <Image src="/logo/business_finland.svg" width={120} height={40} alt="Business Finland" />
            <Image src="/logo/estonia.svg" width={140} height={135} alt="Estonia" />
            <Image src="/logo/sortlist.svg" width={140} height={135} alt="sortlist" />
            <Image src="/logo/winner.svg" width={90} height={95} alt="Winner" />
            <Image src="/logo/award.svg" width={100} height={70} alt="Award" />
          </Box>
        </Box>

        <Typography align="center" sx={{ mt: 2, fontSize: 17, color: theme.palette.primary.main, fontWeight: 500 }}>
          © {new Date().getFullYear()} by Unelma Platforms
        </Typography>
      </Box>
    </Box>
  );
}