"use client";

import { useState } from "react";
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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 260, p: 2 }}>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.href} disablePadding>
            <ListItemButton component={Link} href={link.href} onClick={() => setMobileOpen(false)}>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ textTransform: "uppercase", fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        padding: { xs: 1, md: 4 },
        mt: 12
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/images/logos/logo-unelma.png"
              alt="Unelma Platforms logo"
              width={180}
              height={60}
              priority
              style={{ cursor: "pointer", transition: "transform 0.25s ease" }}
            />
          </Link>

          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
            mt: -2
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search…"
              sx={{ maxWidth: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
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

            {user ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => router.push("/login")}>Login/Register</Button>
            )}

            <IconButton aria-label="shopping cart">
              <Image
                src="/images/icons/icons8-shopping-cart-64.png"
                alt="Shopping cart icon"
                width={30}
                height={30}
              />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            gap: 6,
            mt: 2.5,
            width: "88%",
            mx: "auto"
          }}
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography sx={{ textTransform: "uppercase", fontWeight: 600 }}>
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}
