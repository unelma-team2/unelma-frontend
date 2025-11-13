"use client";

import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ProductsSection() {
  const theme = useTheme();

  const cardSx = {
    height: "100%",
    border: '2px solid black',
    borderRadius: '20px',
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: theme.palette.background,
        py: { xs: 12, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="left"
          sx={{
            mb: 3,
            fontSize: { xs: "2.35rem", md: theme.typography.h2.fontSize },
          }}
        >
          Our Products
        </Typography>

        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          sx={{ maxWidth: 400, mx: "auto", justifyContent: "center" }}
        >
          {/* --- Card 1: UnelmaMail --- */}
          <Grid item xs={12} sm={6}>
            <Card sx={cardSx}>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[800]' : '#f0faff',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4,
                  px: 3,
                  minHeight: 160,
                }}
              >
                <Box
                  component="img"
                  src="/products/mail.svg"
                  alt="UnelmaMail illustration"
                  sx={{ width: 300, height: "auto" }}
                />
              </Box>

              <Box sx={{ 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[700]' : '#cffafe',
                py: 2 
              }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                  UnelmaMail
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[900]' : '#faffff',
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  px: { xs: 3, md: 4 },
                  py: { xs: 4, md: 5 },
                }}
              >
                <Typography variant="body2" sx={{ 
                  color: "#4C4C4C", 
                  lineHeight: 1.6, 
                  textAlign: 'left',
                  minHeight: 120,
                }}>
                  Experience the future of email marketing with UnelmaMail., the world's first AI-powered email marketing platform. Offering user-friendly and efficient solutions, UnelmaMail revolutionizes the way businesses engage in email marketing strategies for ultimate growth and expansion.
                </Typography>

                <Button
                  component="a"
                  href="/products"
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: "flex-end",
                    mt: "auto",
                    px: 4,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.900',
                    borderRadius: '8px',
                    fontSize: "0.85rem",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    "&:hover": { backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.700' },
                  }}
                >
                  BUY ONLINE
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* --- Card 2: UnelmaCRM --- */}
          <Grid item xs={12} sm={6}>
            <Card sx={cardSx}>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[800]' : '#f0faff',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4, 
                  px: 3,
                  minHeight: 160, 
                }}
              >
                <Box
                  component="img"
                  src="/products/crm.svg"
                  alt="UnelmaCRM cover"
                  sx={{ width: 300, height: "auto" }} 
                />
              </Box>

              <Box sx={{ 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[700]' : '#cffafe', 
                py: 2 
              }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                  UnelmaCRM
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[900]' : '#faffff',
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  px: { xs: 3, md: 4 },
                  py: { xs: 4, md: 5 },
                }}
              >
                <Typography variant="body2" sx={{ 
                  color: "#4C4C4C", 
                  lineHeight: 1.6, 
                  textAlign: 'left',
                  minHeight: 120,
                }}>
                 When you choose UnelmaCRM, you choose a comprehensive CRM solution that offers 1 year of full support, maintenance, hosting, SaaS, top-notch security, and bug fixes.
                </Typography>

                <Button
                  component="a"
                  href="/products"
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: "flex-end",
                    mt: "auto",
                    px: 4,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.900',
                    borderRadius: '8px',
                    fontSize: "0.85rem",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    "&:hover": { backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.700' },
                  }}
                >
                  BUY ONLINE
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* --- Card 3: UnelmaCloud --- */}
          <Grid item xs={12} sm={6}>
            <Card sx={cardSx}>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[800]' : '#f0faff',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4, 
                  px: 3,
                  minHeight: 160, 
                }}
              >
                <Box
                  component="img"
                  src="/products/cloud.svg"
                  alt="UnelmaCloud badge"
                  sx={{ width: 160, height: "auto" }} 
                />
              </Box>

              <Box sx={{ 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[700]' : '#cffafe', 
                py: 2 
              }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                  UnelmaCloud
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[900]' : '#faffff',
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  px: { xs: 3, md: 4 },
                  py: { xs: 4, md: 5 },
                }}
              >
                <Typography variant="body2" sx={{ 
                  color: "#4C4C4C", 
                  lineHeight: 1.6, 
                  textAlign: 'left',
                  minHeight: 120,
                }}>
                  With UnelmaCloud, we offer more than just storage space. Our product comes with a comprehensive package that includes one year of full support, maintenance, and security, along with free bug fixes from our experienced team of developers.
                </Typography>

                <Button
                  component="a"
                  href="/products"
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: "flex-end",
                    mt: "auto",
                    px: 4,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.900',
                    borderRadius: '8px',
                    fontSize: "0.85rem",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    "&:hover": { backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.700' },
                  }}
                >
                  BUY ONLINE
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* --- Card 4: Open-Source --- */}
          <Grid item xs={12} sm={6}>
            <Card sx={cardSx}>
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[800]' : '#f0faff',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4,
                  px: 3,
                  minHeight: 160,
                }}
              >
                <Box
                  component="img"
                  src="/products/open-source.svg"
                  alt="Open-source logo"
                  sx={{ width: 140, height: "auto" }}
                />
              </Box>

              <Box sx={{ 
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[700]' : '#cffafe', 
                py: 2 
              }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
                  Open-Source Software
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey[900]' : '#faffff',
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  px: { xs: 3, md: 4 },
                  py: { xs: 4, md: 5 },
                }}
              >
                <Typography variant="body2" sx={{ 
                  color: "#4C4C4C", 
                  lineHeight: 1.6, 
                  textAlign: 'left',
                  minHeight: 120,
                }}>
                  Unelma Platforms brings to you UnelmaBrowser and Unelma-Code Translator - innovative software designed for optimized user experience. With open-source access, full support, maintenance, security provisions, and bug fixes, we ensure a smooth, secure and efficient digital journey.
                </Typography>

                <Button
                  component="a"
                  href="/products"
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: "flex-end",
                    mt: "auto",
                    px: 4,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.900',
                    borderRadius: '8px',
                    fontSize: "0.85rem",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    "&:hover": { backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.700' },
                  }}
                >
                  BUY ONLINE
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}