// "use client";

// import Badge from "@mui/material/Badge";
// import { useCart } from "@/context/CartContext";
// import { useState } from "react";
// import { useAuth } from "@/app/context/AuthContext";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Button,
//   useTheme
// } from "@mui/material";


// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "About Us", href: "/about" },
//   { label: "Products & Services", href: "/products", multiline: true },
//   { label: "Our Work", href: "/case-studies" },
//   { label: "Blog", href: "/blog" },
//   { label: "Careers", href: "/careers" },
//   { label: "Contact Us", href: "/contact" }
// ];

// export default function Header() {
//   const { user, signOut } = useAuth();
//   const { cartItems } = useCart();
//   const router = useRouter();
//   const theme = useTheme();

//   const totalQuantity = cartItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   return (
//     <AppBar
//       position="static"
//       elevation={0}
//       sx={{
//         backgroundColor: (theme) => theme.palette.background.default,
//         color: (theme) => theme.palette.text.primary,
//         boxShadow: "none",
//         padding: { xs: 1, md: 4 }
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 2
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             flexWrap: "wrap"
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mt: 2.5
//             }}
//           >
//             <Link href="/" style={{ display: "flex", alignItems: "center" }}>
//               <Image
//                 src="/images/logos/logo-unelma.png"
//                 alt="Unelma Platforms logo"
//                 width={220}
//                 height={108}
//                 priority
//                 style={{
//                   cursor: "pointer",
//                   transition: "transform 0.25s ease"
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.05)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.0)")
//                 }
//               />
//             </Link>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 3,
//               mr: { xs: 3, md: 10 },
//               mt: { xs: -1, md: -2 }
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: theme.palette.background.paper,
//                 px: 1.5,
//                 gap: 3
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   maxWidth: 400,
//                   width: "100%"
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Search…"
//                   sx={{
//                     maxWidth: 200,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "6px",
//                       backgroundColor: theme.palette.background.paper,
//                       border: "2px solid" + theme.palette.primary.main,
//                       "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                       "&:hover .MuiOutlinedInput-notchedOutline": {
//                         border: "2px solid" + theme.palette.primary.blue,
//                         borderRadius: "4px"
//                       },
//                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                         border: "2px solid" + theme.palette.primary.blue,
//                         borderRadius: "4px"
//                       }
//                     },
//                     "& .MuiInputBase-input": {
//                       padding: "8px 12px"
//                     }
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           edge="end"
//                           sx={{
//                             height: 40,
//                             width: 40,
//                             borderRadius: "6px",
//                             transition: "transform 0.25s ease",
//                             "&:hover": {
//                               border:
//                                 "2px solid" + theme.palette.primary.blue,
//                               backgroundColor:
//                                 theme.palette.background.lightBlue,
//                               transform: "scale(1.1)"
//                             }
//                           }}
//                         >
//                           <Image
//                             src="/images/icons/icons8-search-32.png"
//                             alt="Search Icon"
//                             width={30}
//                             height={30}
//                           />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Box>

//               {user ? (
//                 <Button
//                   onClick={() => signOut()}
//                   sx={{
//                     backgroundColor: "transparent",
//                     color: theme.palette.text.primary,
//                     fontSize: "14pt",
//                     fontWeight: 600,
//                     border: "none",
//                     boxShadow: "none",
//                     textTransform: "uppercase",
//                     "&:hover": {
//                       backgroundColor: "transparent",
//                       opacity: 0.7
//                     }
//                   }}
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => router.push("/login")}
//                   sx={{
//                     backgroundColor: "transparent",
//                     color: theme.palette.text.primary,
//                     fontSize: "12pt",
//                     fontWeight: 600,
//                     border: "none",
//                     boxShadow: "none",
//                     textTransform: "uppercase",
//                     "&:hover": {
//                       color: theme.palette.primary.blue,
//                       backgroundColor: "transparent",
//                       boxShadow: "none",
//                       transition: "0.25s ease"
//                     }
//                   }}
//                 >
//                   Login/Register
//                 </Button>
//               )}

//               <IconButton
//               aria-label="shopping cart"
//               sx={{
//                 height: 45,
//                 width: 45,
//                 transition: "transform 0.25s ease",
//                 "&:hover": {
//                   backgroundColor: theme.palette.background.lightBlue,
//                   transform: "scale(1.2)",
//                 },
//               }}
//               onClick={() => router.push("/cart")}
//             >
//               <Badge
//                 badgeContent={totalQuantity}
//                 color="error"
//                 overlap="circular"
//                 invisible={totalQuantity === 0}
//               >
//                 <Image
//                   src="/images/icons/icons8-shopping-cart-64.png"
//                   alt="Shopping cart icon"
//                   width={30}
//                   height={30}
//                   priority
//                 />
//               </Badge>
//             </IconButton>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: { xs: 3.5, md: 6 },
//             mt: 2.5,
//             width: { xs: "100%", md: "88%" },
//             mx: "auto"
//           }}
//         >
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <Typography
//                 variant="body14bold"
//                 sx={{
//                   textTransform: "uppercase",
//                   textAlign: "center",
//                   whiteSpace: link.multiline ? "pre-line" : "normal",
//                   lineHeight: 1.2,
//                   letterSpacing: "0.5px",
//                   display: "inline-block",
//                   transition: "transform 0.25s ease, color 0.25s ease",
//                   "&:hover": {
//                     transform: "scale(1.1)",
//                     color: theme.palette.primary.blue
//                   }
//                 }}
//               >
//                 {link.multiline ? (
//                   <>
//                     PRODUCTS &<br />
//                     SERVICES
//                   </>
//                 ) : (
//                   link.label
//                 )}
//               </Typography>
//             </Link>
//           ))}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


"use client"

import Badge from "@mui/material/Badge"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/app/context/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products & Services", href: "/products", multiline: true },
  { label: "Our Work", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
]

export default function Header() {
  const { user, signOut } = useAuth()
  const { cartItems } = useCart()
  const router = useRouter()
  const theme = useTheme()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
                              backgroundColor: theme.palette.background.lightBlue,
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <Image src="/images/icons/icons8-search-32.png" alt="Search Icon" width={30} height={30} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {user ? (
                <Button
                  onClick={() => signOut()}
                  sx={{
                    textTransform: "uppercase",
                    fontSize: { sm: "0.65rem", md: "1rem" },
                    fontWeight: 600,
                    padding: { sm: "6px 12px", md: "8px 16px" },
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.blue,
                    },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  sx={{
                    textTransform: "uppercase",
                    fontSize: { sm: "0.65rem", md: "1rem" },
                    fontWeight: 600,
                    padding: { sm: "6px 12px", md: "8px 16px" },
                    color: theme.palette.text.primary,
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.blue,
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
                      backgroundColor: theme.palette.background.lightBlue,
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
                    <Image src="/images/icons/icons8-search-32.png" alt="Search Icon" width={24} height={24} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />

        {/* Mobile nav links */}
        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
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

        <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {user ? (
            <Button
              onClick={() => {
                signOut()
                setMobileMenuOpen(false)
              }}
              sx={{
                backgroundColor: "transparent",
                color: theme.palette.text.primary,
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                boxShadow: "none",
                textTransform: "uppercase",
                justifyContent: "flex-start",
                padding: "8px 0",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.blue,
                  opacity: 0.9,
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
                backgroundColor: "transparent",
                color: theme.palette.text.primary,
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                boxShadow: "none",
                textTransform: "uppercase",
                justifyContent: "flex-start",
                padding: "8px 0",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.blue,
                  transition: "0.25s ease",
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
