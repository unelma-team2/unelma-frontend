// "use client";

// import { Box, Typography } from "@mui/material";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Metrics({metrics}) {

//   //   const [metrics, setMetrics] = useState([]);
//   //   const [error, setError] = useState(null);
  
//   //   const API_URL =
//   //   process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    
  
//   // useEffect(() => {
//   //   axios
//   //     .get(`${API_URL}/api/home?populate[Metrics][populate]=*`)
//   //     .then((res) => setMetrics(res.data.data?.Metrics || null))
//   //     .catch((err) => setError(err))
//   // }, [API_URL]);
  
//   // if (error) return <p>Error: {error.message}</p>;
//   // if (!metrics) return <p>No Metrics section found.</p>;
  
//   const { number, label1, label2 } = metrics;
//   console.log("Metrics data:", metrics);

//   return (
//      <Box
//       sx={{
//         ml: { xs: 0, md: -15 },   
//         mt: { xs: 4, md: 0 },     
//       }}
//     >
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(2, 1fr)" },
//         gap: { xs: 6, md: 8 },
//       }}
//     >
//       {metrics.map((item, i) => (
//         <Box
//           key={i}
//           sx={{
//             width: 150,
//             height: 150,
//             borderRadius: "50%",
//             border: "3px solid #2F2E2E",
//             bgcolor: "#E9FCFF",
//             position: "relative",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             fontFamily: "Outfit, sans-serif",
//             mx: "auto",
//           }}
//         >
//           <Image
//             src="/icons/smile.svg" 
//             alt="smile"
//             width={52}      
//             height={52}
//             style={{
//               position: "absolute",
//               top: -5,
//               left: -5,
//             }}
//           />

//           <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
//             {item.number}
//           </Typography>
//           <Typography sx={{ fontSize: 15 }}>{item.label1}</Typography>
//           <Typography sx={{ fontSize: 15 }}>{item.label2}</Typography>
//         </Box>
//       ))}
//     </Box>
//     </Box>
//   );
// }

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export default function Metrics() {
  const theme = useTheme();

  const metrics = [
  { number: "1 M+", label1: "Happy", label2: "Users", top: "2%", left: "43%", icon: "/images/icons/icons8-winner-64.png" },
  { number: "3 M+", label1: "Total", label2: "Downloads", top: "28%", left: "23%", icon: "/images/icons/icons8-downloads-48.png" },
  { number: 2, label1: "Awards", label2: "Won", top: "52%", left: "43%", icon: "/images/icons/icons8-award-64.png" },
  { number: 17, label1: "Total", label2: "Agents", top: "28%", left: "62.5%", icon: "/images/icons/icons8-support-64.png" },
];


  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 400, md: 600 }, // adjust as needed
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/home/hero/green.png"

        alt="Background"
        fill
        style={{ objectFit: "contain" }}
      />

      {/* Ellipses on top of the image */}
      {metrics.map((item, i) => (
        <Box
          key={i}
          sx={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "2px solid #1D2340",
            bgcolor: theme.palette.background.lightGreen,
            position: "absolute",
            top: item.top,    // e.g., "50px" or "20%"
            left: item.left,  // e.g., "100px" or "30%"
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Outfit, sans-serif",
            textAlign: "center",
          }}
        >
          {/* Icon on top-left of the ellipse */}
           <Box
            sx={{
              width: 55,
              height: 55,
              borderRadius: "50%",
              bgcolor: "#FFFFFF",
              border: "2px solid" + theme.palette.primary.main,
              position: "absolute",
              top: -15,
              left: -15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Icon on top of small ellipse */}
            <Image
              src={item.icon || "/icons/smile.svg"}
              alt="icon"
              width={35}
              height={35}
            />
          </Box>

          {/* Text inside the ellipse */}
          <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
            {item.number}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{item.label1}</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{item.label2}</Typography>
        </Box>
      ))}
    </Box>
  );
}
