"use client";

import Badge from "@mui/material/Badge";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useFavorites } from "@/app/context/FavoritesContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  Avatar,        
  Tooltip,       
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products & Services", href: "/products", multiline: true },
  { label: "Our Work", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const router = useRouter();
  const theme = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites?.length || 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        boxShadow: "none",
        padding: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: { xs: 0.5, sm: 1, md: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/images/logos/logo-unelma.png"
                alt="Unelma Platforms logo"
                width={isMobile ? 120 : isTablet ? 160 : 220}
                height={isMobile ? 60 : isTablet ? 80 : 108}
                priority
                style={{
                  cursor: "pointer",
                  transition: "transform 0.25s ease",
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
              gap: { xs: 1.5, sm: 2, md: 3 },
              mr: { xs: 1, sm: 3, md: 10 },
              mt: { xs: -0.5, sm: -1, md: -2 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                px: { sm: 1, md: 1.5 },
                gap: { sm: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  maxWidth: 400,
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search…"
                  sx={{
                    maxWidth: { sm: 150, md: 200 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                      backgroundColor: theme.palette.background.paper,
                      border: "2px solid" + theme.palette.primary.main,
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid" + theme.palette.primary.blue,
                        borderRadius: "4px",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid" + theme.palette.primary.blue,
                        borderRadius: "4px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "8px 12px",
                    },
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
                              border: "2px solid" + theme.palette.primary.blue,
                              backgroundColor:
                                theme.palette.background.lightBlue,
                              transform: "scale(1.1)",
                            },
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
                    ),
                  }}
                />
              </Box>

              {user ? (
                <>
                  {/* Profile avatar button (click -> /profile) */}
                  <Tooltip title={user?.name || user?.email || "Profile"}>
                    <IconButton
                      onClick={() => {
                        router.push("/profile");
                        setMobileMenuOpen(false);
                      }}
                      sx={{ p: 0, mr: 1 }}
                      aria-label="Profile"
                    >
                      <Avatar
                        src={user?.avatar || user?.photoURL || undefined}
                        alt={user?.name || user?.email}
                        sx={{
                          width: { xs: 34, sm: 36 },
                          height: { xs: 34, sm: 36 },
                          fontSize: 14,
                          bgcolor: "primary.main",
                        }}
                      >
                        {(user?.name && user.name.charAt(0).toUpperCase()) ||
                          (user?.email && user.email.charAt(0).toUpperCase()) ||
                          "U"}
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  {/* Logout */}
                  <Button
                    variant="text"
                    disableRipple
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    sx={{
                      textTransform: "uppercase",
                      fontSize: { sm: "0.65rem", md: "1rem" },
                      fontWeight: 600,
                      padding: { sm: "6px 12px", md: "8px 16px" },
                      color: theme.palette.text.primary,
                      backgroundColor: "transparent !important",
                      border: "none",
                      boxShadow: "none !important",
                      transition: "transform 0.25s ease, color 0.25s ease",
                      "&:hover": {
                        color: theme.palette.primary.blue,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                  <IconButton
                    aria-label="favourites"
                    sx={{
                      height: 45,
                      width: 45,
                      transition: "transform 0.25s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.background.lightBlue,
                        transform: "scale(1.2)",
                      },
                    }}
                    onClick={() => router.push("/favourites")}
                  >
                    <Badge
                      badgeContent={favCount}
                      color="error"
                      overlap="circular"
                      invisible={favCount === 0}
                    >
                      {favCount > 0 ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: theme.palette.grey[700] }} />
                      )}
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <Button
                  variant="text"
                  disableRipple
                  onClick={() => {
                    router.push("/login");
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    textTransform: "uppercase",
                    fontSize: { sm: "0.65rem", md: "1rem" },
                    fontWeight: 600,
                    padding: { sm: "6px 12px", md: "8px 16px" },
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent !important",
                    border: "none",
                    boxShadow: "none !important",
                    transition: "transform 0.25s ease, color 0.25s ease",
                    "&:hover, &:focus, &:active, &.Mui-focusVisible": {
                      backgroundColor: "transparent !important",
                      boxShadow: "none !important",
                      color: theme.palette.primary.blue,
                      transform: "scale(1.1)",
                    },
                    "&.MuiButton-root": {
                      backgroundColor: "transparent !important",
                      boxShadow: "none !important",
                    },
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
                    transform: "scale(1.2)",
                  },
                }}
                onClick={() => router.push("/cart")}
              >
                <Badge
                  badgeContent={totalQuantity}
                  color="error"
                  overlap="circular"
                  invisible={totalQuantity === 0}
                >
                  <Image
                    src="/images/icons/icons8-shopping-cart-64.png"
                    alt="Shopping cart icon"
                    width={30}
                    height={30}
                    priority
                  />
                </Badge>
              </IconButton>
            </Box>

            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  aria-label="shopping cart"
                  sx={{
                    height: 40,
                    width: 40,
                    transition: "transform 0.25s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.background.lightBlue,
                      transform: "scale(1.2)",
                    },
                  }}
                  onClick={() => router.push("/cart")}
                >
                  <Badge
                    badgeContent={totalQuantity}
                    color="error"
                    overlap="circular"
                    invisible={totalQuantity === 0}
                  >
                    <Image
                      src="/images/icons/icons8-shopping-cart-64.png"
                      alt="Shopping cart icon"
                      width={24}
                      height={24}
                      priority
                    />
                  </Badge>
                </IconButton>

                <IconButton
                  aria-label="menu"
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{
                    height: 40,
                    width: 40,
                    color: theme.palette.text.primary,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            gap: { sm: 2.5, md: 6 },
            mt: { sm: 1.5, md: 2.5 },
            width: { sm: "100%", md: "88%" },
            mx: "auto",
            flexWrap: "wrap",
            rowGap: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2, md: 4 } }}>
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
                    fontSize: { sm: "0.65rem", md: "1.2rem" },
                    transition: "transform 0.25s ease, color 0.25s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      color: theme.palette.primary.blue,
                    },
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
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.default,
            width: "100%",
            maxWidth: 300,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Mobile search */}
        <Box sx={{ padding: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search…"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                backgroundColor: theme.palette.background.paper,
                border: "2px solid " + theme.palette.primary.main,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid " + theme.palette.primary.blue,
                  borderRadius: "4px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid " + theme.palette.primary.blue,
                  borderRadius: "4px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
              },
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
                        border: "2px solid " + theme.palette.primary.blue,
                        backgroundColor: theme.palette.background.lightBlue,
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Image
                      src="/images/icons/icons8-search-32.png"
                      alt="Search Icon"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />

        {/* Mobile nav links */}
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  transition: "color 0.25s ease",
                  "&:hover": {
                    color: theme.palette.primary.blue,
                  },
                }}
              >
                {link.multiline ? "PRODUCTS & SERVICES" : link.label}
              </Typography>
            </Link>
          ))}
        </Box>
        <Divider />

        <Box
          sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}
        >
          {user ? (
            <Button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              sx={{
                textTransform: "uppercase",
                fontSize: { sm: "0.65rem", md: "1rem" },
                fontWeight: 600,
                padding: { sm: "6px 12px", md: "8px 16px" },
                color: theme.palette.text.primary,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.25s ease, color 0.25s ease",
                "&:hover": {
                  backgroundColor: "transparent !important", // <-- force transparent
                  color: theme.palette.primary.blue,
                  transform: "scale(1.1)",
                },
                "&:active": {
                  backgroundColor: "transparent !important", // <-- also for active state
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login");
                setMobileMenuOpen(false);
              }}
              sx={{
                textTransform: "uppercase",
                fontSize: { sm: "0.65rem", md: "1rem" },
                fontWeight: 600,
                padding: { sm: "6px 12px", md: "8px 16px" },
                color: theme.palette.text.primary,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.25s ease, color 0.25s ease",
                "&:hover": {
                  backgroundColor: "transparent !important", // <-- force transparent
                  color: theme.palette.primary.blue,
                  transform: "scale(1.1)",
                },
                "&:active": {
                  backgroundColor: "transparent !important", // <-- also for active state
                },
              }}
            >
              Login/Register
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
