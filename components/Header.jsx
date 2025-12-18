"use client"

import Badge from "@mui/material/Badge"
import { useCart } from "@/app/context/CartContext"
import { useAuth } from "@/app/context/AuthContext"
import { useFavorites } from "@/app/context/FavoritesContext"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SearchInput from "./SearchInput"

const navLinks = [
  { label: "Home", href: "/", underline: "#d0478bff" },
  { label: "About Us", href: "/about", underline: "#8E24AA" },
  {
    label: "Products & Services",
    href: "/products",
    multiline: true,
    underline: "linear-gradient(90deg, #5E35B1, #3949AB, #1E88E5)",
  },
  {
    label: "Our Work",
    href: "/case-studies",
    underline: "linear-gradient(90deg, #26C6DA, #43A047)",
  },
  { label: "Blog", href: "/blog", underline: "#FFEB3B" },
  { label: "Careers", href: "/careers", underline: "#FB8C00" },
  { label: "Contact Us", href: "/contact", underline: "#E53935" },
]

export default function Header() {
  const { user, signOut } = useAuth()
  const { cartItems } = useCart()
  const { favorites } = useFavorites()
  const router = useRouter()
  const theme = useTheme()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const favCount = useMemo(() => {
    if (!favorites || !favorites.length) return 0
    const seen = new Set()
    for (const fav of favorites) {
      if (!fav) continue
      let key = fav.key
      const item = fav.item
      if (!key && item) {
        key = item.slug || item.id || item.attributes?.slug || item.attributes?.id || null
      }
      if (key) seen.add(String(key))
    }
    return seen.size
  }, [favorites])

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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
          {/* Logo */}
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
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
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
              <SearchInput />

              {user ? (
                <>
                  <Tooltip title={user?.name || user?.email || "Profile"}>
                    <IconButton
                      onClick={() => {
                        router.push("/profile")
                        setMobileMenuOpen(false)
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

                  <Button
                    variant="text"
                    disableRipple
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    sx={{
                      ...theme.typography.bodyFont_M,
                      textTransform: "uppercase",
                      fontSize: { sm: "0.65rem", md: "1rem" },
                      padding: { sm: "6px 12px", md: "8px 16px" },
                      color: theme.palette.text.primary,
                      backgroundColor: "transparent !important",
                      border: "none",
                      boxShadow: "none !important",
                      transition: "transform 0.25s ease, color 0.25s ease",
                      "&:hover": {
                        color: theme.palette.section.products.vibrant,
                        transform: "scale(1.15)",
                        border: "none !important",
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
                        //backgroundColor: theme.palette.section.products.soft,
                        transform: "scale(1.3)",
                      },
                    }}
                    onClick={() => router.push("/favourites")}
                  >
                    <Badge badgeContent={favCount} color="error" overlap="circular" invisible={favCount === 0}>
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
                    router.push("/login")
                    setMobileMenuOpen(false)
                  }}
                  sx={{
                    ...theme.typography.bodyFont_M,
                    textTransform: "uppercase",
                    fontSize: { sm: "0.65rem", md: "1rem" },
                    padding: { sm: "6px 12px", md: "8px 16px" },
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent !important",
                    border: "none",
                    boxShadow: "none !important",
                    transition: "transform 0.25s ease, color 0.25s ease",
                    "&:hover, &:focus, &:active, &.Mui-focusVisible": {
                      backgroundColor: "transparent !important",
                      boxShadow: "none !important",
                      border: "none !important",
                      color: theme.palette.section.products.vibrant,
                      transform: "scale(1.15)",
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
                    //backgroundColor: theme.palette.section.products.soft,
                    border: `2px solid ${theme.palette.section.products.vibrant}`,
                    borderRadius: 100,
                    padding: 3,
                    boxShadow: "none",
                    backgroundColor: "transparent !important",
                    transform: "scale(1.3)",
                  },
                }}
                onClick={() => router.push("/cart")}
              >
                <Badge badgeContent={totalQuantity} color="error" overlap="circular" invisible={totalQuantity === 0}>
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
                      backgroundColor: theme.palette.section.products.soft,
                      transform: "scale(1.2)",
                    },
                  }}
                  onClick={() => router.push("/cart")}
                >
                  <Badge badgeContent={totalQuantity} color="error" overlap="circular" invisible={totalQuantity === 0}>
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
              <Link key={link.href} href={link.href} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  sx={{
                    ...theme.typography.bodyFont_M,
                    position: "relative",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textAlign: "center",
                    whiteSpace: link.multiline ? "pre-line" : "normal",
                    lineHeight: 1.2,
                    letterSpacing: "0.5px",
                    display: "inline-block",
                    fontSize: { sm: "0.65rem", md: "1.2rem" },
                    transition: "transform 0.25s ease, color 0.25s ease",

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -16,
                      width: "100%",
                      height: "8px",
                      background: link.underline,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease",
                      //borderRadius: 2,
                    },

                    "&:hover": {
                      transform: "scale(1.1)",
                      color: theme.palette.primary.main,
                    },

                    "&:hover::after": {
                      transform: "scaleX(1)",
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

      {/* Mobile Drawer */}
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
          <Typography sx={{ ...theme.typography.bodyFontTitle_M }}>Menu</Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Mobile search */}
        <Box sx={{ padding: 2 }}>
          <SearchInput size="small" />
        </Box>
        <Divider />

        {/* Mobile nav links with colored underlines */}
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {navLinks.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                position: "relative",
                textDecoration: "none",
                color: "inherit",
                display: "inline-block",

                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -6,
                  width: "100%",
                  height: "3px",
                  background: link.underline,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                  borderRadius: 2,
                },

                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
            >
              <Typography
                sx={{
                  ...theme.typography.bodyFont_M,
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  letterSpacing: "0.5px",
                  transition: "transform 0.25s ease, color 0.25s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {link.multiline ? "PRODUCTS & SERVICES" : link.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />

        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {user ? (
            <Button
              onClick={() => {
                signOut()
                setMobileMenuOpen(false)
              }}
              sx={{
                ...theme.typography.bodyFont_M,
                textTransform: "uppercase",
                fontSize: "0.875rem",
                padding: "8px 16px",
                color: theme.palette.text.primary,
                backgroundColor: "transparent !important",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.25s ease, color 0.25s ease",
                "&:hover, &:active": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.section.careers.vibrant,
                  transform: "scale(1.1)",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login")
                setMobileMenuOpen(false)
              }}
              sx={{
                ...theme.typography.bodyFont_M,
                textTransform: "uppercase",
                fontSize: "0.875rem",
                padding: "8px 16px",
                color: theme.palette.text.primary,
                backgroundColor: "transparent !important",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.25s ease, color 0.25s ease",
                "&:hover, &:active": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.section.careers.vibrant,
                  transform: "scale(1.1)",
                },
              }}
            >
              Login/Register
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}
