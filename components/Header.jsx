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
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";

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
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.text.primary,
        boxShadow: "none",
        py: 2.5,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
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
              mt: 2.5,
            }}
          >
            <Image
              src="/logo/unelma-logo.svg"
              alt="Unelma Platforms"
              width={190}
              height={60}
              priority
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              mr: { xs: 3, md: 10 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: (theme) => theme.palette.background.paper,
                px: 1.5,
              }}
            >
              <Search fontSize="small" />
              <InputBase
                placeholder="SEARCH"
                sx={{ ml: 1, fontWeight: 600, width: "130px" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>

            {user ? (
              <Button
                onClick={() => signOut()}
                sx={{
                  backgroundColor: "transparent",
                  color: "#000",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                sx={{
                  backgroundColor: "transparent",
                  color: "#000",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
                }}
              >
                Login/Register
              </Button>
            )}

            <IconButton aria-label="shopping cart">
              <ShoppingCart />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: { xs: 3.5, md: 6 },
            mt: 2.5,
            width: { xs: "100%", md: "88%" },
            mx: "auto",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  textAlign: "center",
                  whiteSpace: link.multiline ? "pre-line" : "normal",
                  lineHeight: 1.2,
                  letterSpacing: "0.5px",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}