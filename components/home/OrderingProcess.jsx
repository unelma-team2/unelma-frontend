"use client"
import { Container, Typography, Stepper, Step, StepLabel, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingSpinner from "../LoadingSpinner"
import Badge from "@mui/material/Badge";
import { useCart } from "@/app/context/CartContext";
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
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ width: 260, p: 2 }}>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.href} disablePadding>
            <ListItemButton
              component={Link}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.section.shopOrder.soft,
        border: theme.mixins.borderStyle,
        color: theme.palette.primary.main,
         boxShadow: `-4px -2px 0px  ${theme.palette.section.shopOrder.pastel}, 
                -8px -4px 0px  ${theme.palette.section.shopOrder.vibrant}`,
        width: { xs: 55, sm: 60, md: 70 },
        height: { xs: 55, sm: 60, md: 70 },
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
        fontWeight: "bold",
        zIndex: 1,
      }}
    >
      {String(props.icon)}
    </Box>
  )
}

const NullStepConnector = () => <Box sx={{ display: "none" }} />

export default function OrderingProcess({ orderProcess }) {
  const theme = useTheme()

  const [orderingSteps, setOrderingSteps] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[OrderingProcess][populate]=*`)
      .then((res) => setOrderingSteps(res.data.data?.OrderingProcess || null))
      .catch((err) => setError(err))
  }, [API_URL])

  //if (loading) return <LoadingSpinner />
  //if (error) return <p>Error: {error.message}</p>
  if (!orderProcess) return <p>No Product section found.</p>

  const { number, title } = orderProcess

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        borderTop: theme.mixins.borderStyle,
        borderBottom: "none",
        mt: { xs: 6, md: 12 },
        boxShadow: ` 0px -8px 0px ${theme.palette.section.shopOrder.main},  -0px -12px 0px ${theme.palette.section.shopOrder.vibrant}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            ...theme.typography.headingFont_S,
            marginBottom: { xs: 6, md: 12 },
          }}
        >
          Ordering Process
        </Typography>

        <Stepper
          activeStep={-1}
          orientation="vertical"
          connector={<NullStepConnector />}
          sx={{
            display: { xs: "flex", md: "none" },
            "& .MuiStep-root": {
              marginBottom: 4,
            },
            "& .MuiStepLabel-root": {
              flexDirection: "row",
              alignItems: "flex-start",
            },
            "& .MuiStepLabel-iconContainer": {
              paddingRight: 2,
               
            },
            "& .MuiStepLabel-label": {
              fontSize: theme.typography.bodyFontTitle_L,
              
            },
          }}
        >
          {orderingSteps.map((process, i) => (
            <Step key={process.number || i}>
              <StepLabel StepIconComponent={CustomStepIcon}>{process.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stepper
          activeStep={-1}
          orientation="horizontal"
          alternativeLabel
          connector={<NullStepConnector />}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            "& .MuiStep-root": {
              flex: 1,
            },
            "& .MuiStepLabel-root": {
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiStepLabel-labelContainer": {
              marginTop: 3,
            },
            "& .MuiStepLabel-label": {
             ...theme.typography.bodyFontTitle_S,
              color: theme.palette.primary.main,
            },
          }}
        >
          {orderingSteps.map((process, i) => (
            <Step key={process.number || i}>
              <StepLabel StepIconComponent={CustomStepIcon}>{process.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  )
}
