"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  useTheme
} from "@mui/material";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products & Services", href: "/products", multiline: true },
  { label: "Our Work", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" }
];

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        boxShadow: "none",
        padding: { xs: 1, md: 4 }
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2.5
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/images/logos/logo-unelma.png"
                alt="Unelma Platforms logo"
                width={220}
                height={108}
                priority
                style={{
                  cursor: "pointer",
                  transition: "transform 0.25s ease"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.0)")
                }
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mr: { xs: 3, md: 10 },
              mt: { xs: -1, md: -2 }
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                px: 1.5,
                gap: 3
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  maxWidth: 400,
                  width: "100%"
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search…"
                  sx={{
                    maxWidth: 200,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                      backgroundColor: theme.palette.background.paper,
                      border: "2px solid" + theme.palette.primary.main,
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid" + theme.palette.primary.blue,
                        borderRadius: "4px"
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid" + theme.palette.primary.blue,
                        borderRadius: "4px"
                      }
                    },
                    "& .MuiInputBase-input": {
                      padding: "8px 12px"
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          sx={{
                            height: 40,
                            width: 40,
                            borderRadius: "6px",
                            transition: "transform 0.25s ease",
                            "&:hover": {
                              border:
                                "2px solid" + theme.palette.primary.blue,
                              backgroundColor:
                                theme.palette.background.lightBlue,
                              transform: "scale(1.1)"
                            }
                          }}
                        >
                          <Image
                            src="/images/icons/icons8-search-32.png"
                            alt="Search Icon"
                            width={30}
                            height={30}
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              {user ? (
                <Button
                  onClick={() => signOut()}
                  sx={{
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    fontSize: "14pt",
                    fontWeight: 600,
                    border: "none",
                    boxShadow: "none",
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "transparent",
                      opacity: 0.7
                    }
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  sx={{
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    fontSize: "12pt",
                    fontWeight: 600,
                    border: "none",
                    boxShadow: "none",
                    textTransform: "uppercase",
                    "&:hover": {
                      color: theme.palette.primary.blue,
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      transition: "0.25s ease"
                    }
                  }}
                >
                  Login/Register
                </Button>
              )}

              <IconButton
                aria-label="shopping cart"
                sx={{
                  height: 45,
                  width: 45,
                  transition: "transform 0.25s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.background.lightBlue,
                    transform: "scale(1.2)"
                  }
                }}
              >
                <Image
                  src="/images/icons/icons8-shopping-cart-64.png"
                  alt="Shopping cart icon"
                  width={30}
                  height={30}
                  priority
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: { xs: 3.5, md: 6 },
            mt: 2.5,
            width: { xs: "100%", md: "88%" },
            mx: "auto"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body14bold"
                sx={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  whiteSpace: link.multiline ? "pre-line" : "normal",
                  lineHeight: 1.2,
                  letterSpacing: "0.5px",
                  display: "inline-block",
                  transition: "transform 0.25s ease, color 0.25s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: theme.palette.primary.blue
                  }
                }}
              >
                {link.multiline ? (
                  <>
                    PRODUCTS &<br />
                    SERVICES
                  </>
                ) : (
                  link.label
                )}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
