"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

export default function ProductsSection() {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    const API_URL = "http://localhost:1337";
    

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => setProducts(res.data.data?.Products || null))
      .catch((err) => setError(err))
  }, [API_URL]);

  
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!products) return <p>No Product section found.</p>;
  
  const { image, title, description, link, link_description } = products;

  const cardSx = {
    height: 320,
    width: 480,
    //border: `2px solid ${theme.palette.primary.main}`,
    // borderRadius: "10px",
    //boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  };

  const imageContainerSx = {
    backgroundColor: theme.palette.background.lightMint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //py: 4,
    //px: 3,
    height: 320,
    width: 180,
    //objectFit: "fill",
 // overflow: "hidden",
 };

  const imageSx = {
    flexGrow: 1,
    maxWidth: "180px",
    maxHeight: "320px",
   objectFit: "cover",
   overflow: "hidden",
  };

  return (
    <Box sx= {{ display: "flex", flexDirection: "column", width: "100%", height: "1200px", borderBottom: "2px solid #2F2E2E" }} >
      <Box sx= {{ flexGrow: 1,  position: "relative" }} >
         <Box sx={{ ...theme.mixins.homeTitleLeft,  backgroundColor: theme.palette.background.default }}>
          <Typography
          variant="h2"
          //component="h2"
          align="left"
          sx={{ marginLeft: "170px", marginY: "5rem" }}>
      
          Our Products
        </Typography>
        </Box>
        <Box sx={{ ...theme.mixins.homeBoxRight, backgroundColor: theme.palette.background.lightMint, borderBottom: "2px solid #2F2E2E", }} />
       
      </Box>
   {/*</Box> <Box
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
            mb: 10,
            fontSize: { xs: "2.35rem", md: theme.typography.h2.fontSize },
          }}
        >
          Our Products
        </Typography>*/}

      <Box sx={{ flexGrow: 1, backgroundColor: theme.palette.background.default, pt: 14 }}>
      {/*<Container maxWidth="lg">*/}
        <Grid
          //container
          //spacing={2}
          sx={{
            //flexGrow: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
            justifyItems: "center",
            alignItems: "center",
            marginX: "170px",
            //maxWidth: "1100px"          
            }}
        >
         
          {products.map((product, i) => {

            const imageUrl = product.image?.url
                ? product.image.url.startsWith("http")
                ? product.image.url
                : `${API_URL}${product.image.url}`
                : null;

         return (
          <Card sx={cardSx} key={i}>
            <Box sx={imageContainerSx} >
              <Box
                component="img"
                src={imageUrl}
                alt={product.title}
                sx={imageSx}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
               //px: { xs: 3, md: 4 },
               px: 4,
                py: 4,
              }}
            >
              <Typography
                variant="h3"
                align="center"
               // mb={"0.5rem"}
                //sx={{ fontWeight: "bold" }}
              >
                {product.title}
              </Typography>
            {/*</Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "#faffff",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
              }}
            >*/}
              <Typography
                variant="body2"
                sx={{
            
                  lineHeight: 1.2,
                  textAlign: "justify",
                  //minHeight: 120,
                }}
              >
                {product.description}
              </Typography>

              <Button
                //component="MUI_Button"
                href={product.link || "/products"}
                //variant="contained"
                //color="primary"
                sx={{
                  alignSelf: "center",
                  px: 2,
                  py: 1,
                  //mt: "auto",
                  //px: 4,
                  //py: 1,
                  //backgroundColor:
                  //  theme.palette.primary.main,
                  //color: "#fff",
               //   borderRadius: "8px",
                //  fontSize: "0.85rem",
                 // boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
                 // "&:hover": {
                 //   backgroundColor:
                 //     theme.palette.mode === "dark" ? "grey.600" : "grey.700",
                 // },*/}
                }}
              >
                {product.link_description}
              </Button>
             
            </Box>
          </Card>

    )})}
        </Grid>
      </Box>
    </Box>
  );
}