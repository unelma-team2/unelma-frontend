"use client";
import Image from "next/image";
import Link from "next/link";
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
  { label: "Products & Services", href: "/products" },
  { label: "Our Work", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.text.primary,
        boxShadow: "none",
        py: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/logo/unelma-logo.svg"
            alt="Unelma Platforms"
            width={120}
            height={40}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {label}
              </Typography>
            </Link>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              px: 1,
              border: "1px solid #000",
            }}
          >
            <Search fontSize="small" />
            <InputBase
              placeholder="SEARCH"
              sx={{ ml: 1, fontWeight: 600, width: "120px" }}
            />
          </Box>
          <Button sx={{ color: "text.primary", fontWeight: 700 }}>
            LOGIN/REGISTER
          </Button>
          <IconButton>
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
