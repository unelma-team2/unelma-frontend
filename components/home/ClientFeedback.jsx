"use client";

import { Box, Typography, Avatar, useTheme } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import FeedbackCard from "../FeedbackCard.jsx";
import Carousel from "../Carousel.jsx"; // your reusable carousel


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

// function FeedbackCard({ name, message, avatar }) {
//   const theme = useTheme();

//   const avatarUrl = avatar?.url
//     ? avatar.url.startsWith("http")
//       ? avatar.url
//       : `${API_URL}${avatar.url}`
//     : "/images/avatars/avatar_placeholder.png";

//   return (
//     <Box
//       sx={{
//         p: 4,
//         width: 300,
//         height: 400,
//         flex: "0 0 auto",
//         textAlign: "center",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         border: `2px solid ${theme.palette.primary.main}`,
//         borderRadius: 2,
//         backgroundColor: theme.palette.background.paper,
//       }}
//     >
//       <Box
//         sx={{
//           mx: "auto",
//           mb: 2,
//           width: 70,
//           height: 70,
//          // borderRadius: "50%",
//          // border: `2px solid ${theme.palette.primary.main}`,
//          // backgroundColor: theme.palette.background.darkMint,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//         }}
//       >
//         <Image
//           src="/images/icons/icons8-quote-100.png"
//           alt="quote"
//           width={70}
//           height={70}
//           style={{ objectFit: "contain" }}
//         />
//       </Box>

//       <Typography
//         variant="body1"
//         sx={{
//           mb: 2,
//           fontSize: 14,
//           textAlign: "justify",
//           flexGrow: 1,
//         }}
//       >
//         {message}
//       </Typography>

//       <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//         <Avatar src={avatarUrl} sx={{ width: 55, height: 55, mr: 2, border: `2px solid ${theme.palette.primary.main}`, borderRadius: "50%" }} />
//         <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//           {name}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

export default function ClientFeedback() {
  const theme = useTheme();
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/feedback-forms?populate=*`)
      .then((res) => setFeedback(res.data.data || []))
      .catch((err) => setError(err));
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (!feedback?.length) return <p>No feedback found.</p>;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.background.lightMint,
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        borderRadius: "0 0 48px 48px",
        mt: { xs: 6, md: 10 },
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, fontSize: { xs: "2rem", md: "2.75rem" }, mb: 6 }}
      >
        Feedback From
        <br />
        Our Clients
      </Typography>

      <Carousel
        items={feedback}
        renderItem={(item) => (
          <FeedbackCard
            key={item.id}
            name={item.name}
            message={item.message}
            avatar={item.avatar}
          />
        )}
      />
    </Box>
  );
}
