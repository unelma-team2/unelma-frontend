// "use client";

// import React from "react"; 
// import ServiceCards from "@/components/ServiceCards.jsx";  
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
// import LoadingSpinner from "../LoadingSpinner";
// import Carousel from "../Carousel.jsx";


// export default function Services() {
//   const theme = useTheme();
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/home?populate[Services][populate]=*`)
//       .then((res) => setServices(res.data.data?.Services || null))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!services) return <p>No Service section found.</p>;

//   return (
//     <Box sx={{ backgroundColor: theme.palette.background.lightMint, py: 8, 
//     //px: 4
//      }}>
//       <Box sx={{ 
//       //maxWidth: "1200px", 
//        // mx: "auto" 
//         }}>
//         <Typography
//           variant="h2"
//           align="right"
//           sx={{ fontWeight: 700, mb: 6 }}
//         >
//           Our Services
//         </Typography>

//         <ServiceCards services={services} apiUrl={API_URL} />
//       </Box>
//     </Box>
//   );
// }

//  return (
// <Box sx={{ position: "relative", width: "100%", height: "1200px", py: 10, zIndex: 1, borderBottom: "2px solid #2F2E2E" }}>
//       <Box sx={{ ...theme.mixins.homeBoxLeft, backgroundColor: theme.palette.background.darkMint, borderBottom: "2px solid #2F2E2E", borderRight: "2px solid #2F2E2E" }} />
//           <Box sx={{ ...theme.mixins.homeTitleRight, backgroundColor: theme.palette.background.lightMint   }}>
      
//         <Typography
//           variant="h2"
//           align="right"
//           sx={{ fontWeight: 700, mb: 6 }}
//         >
//           Our Services
//         </Typography>

//         <ServiceCards services={services} apiUrl={API_URL} />
//       </Box>
//     </Box>

//   );
// }



// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";

// import LoadingSpinner from "../LoadingSpinner";
// import Carousel from "../Carousel.jsx";
// import ServiceCard from "@/components/ServiceCard.jsx";

// export default function Services() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const amount = direction === "left" ? -250 : 250;
//     scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/home?populate[Services][populate]=*`)
//       .then((res) => setServices(res.data.data?.Services || []))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!services.length) return <p>No services found.</p>;

//   return (
//     <Box sx={{ py: 8, px: 4 }}>
//       <Box sx={{ maxWidth: "1200px", mx: "auto" }}>

//         <Typography variant="h2" align="right" sx={{ fontWeight: 700, mb: 6 }}>
//           Our Services
//         </Typography>

//         {/* MOBILE — Carousel */}
//         {isMobile && (
//           <Carousel
//             items={services}
//             renderItem={(service) => (
//               <ServiceCard service={service} apiUrl={API_URL} />
//             )}
//           />
//         )}

//         {/* DESKTOP — 3 per row grid */}
//         {!isMobile && (
//           <Grid container spacing={8} justifyContent="center">
//             {services.map((service, index) => (
//               <Grid
//                 item
//                 md={4}
//                 key={index}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <ServiceCard service={service} apiUrl={API_URL} />
//               </Grid>
//             ))}
//           </Grid>
//         )}

//       </Box>
//     </Box>
//   );
// }

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";

// import LoadingSpinner from "../LoadingSpinner";
// import Carousel from "../Carousel.jsx";
// import ServiceCard from "@/components/ServiceCard.jsx";

// // Import your header shape
// //import ServicesHeaderShape from "@/components/ServicesHeaderShape.jsx";

// export default function Services() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const amount = direction === "left" ? -250 : 250;
//     scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/home?populate[Services][populate]=*`)
//       .then((res) => setServices(res.data.data?.Services || []))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!services.length) return <p>No services found.</p>;

//   // Header height for spacing the content below
//   const headerHeight = 180;
//   const headerRadius = 120;

//   return (
//     <Box sx={{ position: "relative" }}>
//   {/* Header */}
//   <ServicesHeaderShape title="Our Services" height={180} radius={120} />

//   {/* Content */}
//   <Box
//     sx={(theme) => ({
//       position: "relative",
//       // Pull content up to sit closer to the visible header curve
//      // mt: { xs: -60, md: -40 }, // tweak values to visually align
//       px: { xs: 2, md: 4 },
//       maxWidth: "1200px",
//       mx: "auto",
//     })}
//   >
//     {/* MOBILE — Carousel */}
//     {isMobile && (
//       <Carousel
//         items={services}
//         renderItem={(service) => <ServiceCard service={service} apiUrl={API_URL} />}
//       />
//     )}

//     {/* DESKTOP — 3 cards per row */}
//     {!isMobile && (
//       <Grid container spacing={8} justifyContent="center" mt={8}>
//         {services.map((service, index) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             key={index}
//             sx={{ display: "flex", justifyContent: "center" }}
//           >
//             <ServiceCard service={service} apiUrl={API_URL} />
//           </Grid>
//         ))}
//       </Grid>
//     )}
//   </Box>
// </Box>

  
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";

import LoadingSpinner from "../LoadingSpinner";
import Carousel from "../Carousel.jsx";
import ServiceCard from "@/components/ServiceCard.jsx";

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[Services][populate]=*`)
      .then((res) => setServices(res.data.data?.Services || []))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!services.length) return <p>No services found.</p>;

  // Header settings
  const headerHeight = 180;
  //const headerRadius = 120;

  return (
    <Box sx={{ width: "100%", mt: 8 }}>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          overflow: "visible",
        }}
      >
        {/* LEFT DARK BLOCK */}
        <Box
          sx={{
            ...theme.mixins.homeBoxLeft,
            boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightYellow}`,
          }}
        />

        {/* RIGHT WHITE CURVED PANEL */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
             boxShadow: `-10px -8px 0px ${theme.palette.background.lightYellow}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "28px", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "right" },
              color: theme.palette.text.primary,
              marginRight: { md: "170px"}
            }}
          >
            Our Services
          </Typography>
        </Box>

        {/* OPTIONAL TOP BORDER EXTENSION */}
        <Box
          sx={{
            ...theme.mixins.bottomLineLeft,
           //  boxShadow: `-10px -8px 0px ${theme.palette.primary.yellow}`,
          }}
        />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          //mt: { xs: Math.max(120, Math.round(headerHeight * 0.75)), md: headerHeight },
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
        {/* MOBILE — Carousel */}
        {isMobile && (
          <Carousel
            items={services}
            renderItem={(service) => <ServiceCard service={service} apiUrl={API_URL} />}
          />
        )}

        {/* DESKTOP — Grid */}
        {!isMobile && (
          <Grid container spacing={8} justifyContent="center">
            {services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ServiceCard service={service} apiUrl={API_URL} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
