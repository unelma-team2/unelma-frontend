// "use client";

// import axios from "axios";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Box, Card, CardContent, Typography, IconButton, Stack, useTheme } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ShareIcon from "@mui/icons-material/Share";
// import CommentIcon from "@mui/icons-material/Comment";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import Carousel from "@/components/Carousel.jsx";

// export default function RecentBlogPosts() {
//   const theme = useTheme();
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/blogs?populate=*`)
//       .then((res) => setBlogs(res.data.data))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [API_URL]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>Error loading blogs: {error.message}</p>;
//   if (!blogs?.length) return <p>No blogs found.</p>;

//   const renderBlogCard = (blog) => {
//     const { id, Title, Description, slug, blog_image, createdAt } = blog.attributes || blog;

//     const imageUrl = blog_image?.data?.attributes?.url
//       ? blog_image.data.attributes.url.startsWith("http")
//         ? blog_image.data.attributes.url
//         : `${API_URL}${blog_image.data.attributes.url}`
//       : "/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png";

//     const date = new Date(createdAt);
//     const dayMonth = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
//     const year = date.getFullYear();

//     return (
//       <Card
//         key={id}
//         sx={{
//           width: 300,
//           minWidth: 300,
//           height: 700,
//           borderRadius: "10px",
//           border: `2px solid ${theme.palette.primary.main}`,
//           //boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           boxShadow: `-10px -8px 0px ${theme.palette.primary.green}`,
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           mt: 2,
//         }}
//       > 
//         {/* Image */}
//         <Box sx={{ position: "relative", height: 240 }}>
//           {imageUrl && (
//             <Image
//               src={imageUrl}
//               alt={Title || "Blog Image"}
//               fill
//               style={{ objectFit: "contain" }}
//             />
//           )}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 10,
//               left: 10,
//               background: theme.palette.background.lightBlue,
//               width: 90,
//               height: 90,
//               borderRadius: "50%",
//               border: `2px solid ${theme.palette.primary.main}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: 700,
//               fontSize: "0.7rem",
//             }}
//           >
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: "14pt", fontWeight: "bold" }}>{dayMonth}</div>
//               <div style={{ fontSize: "12pt" }}>{year}</div>
//             </div>
//           </Box>
//         </Box>

//         {/* Content */}
//         <CardContent sx={{ flexGrow: 1 }}>
//           <Stack direction="row" spacing={2} mb={4}>
//             <Stack direction="row" spacing={0.5} alignItems="center">
//               <Image src="/images/icons/icons8-writing-64.png" alt="Author" width={24} height={24} />
//               <Typography variant="bodyreg12" color={theme.palette.primary.blue1}>Author</Typography>
//             </Stack>
//             <Stack direction="row" spacing={0.5} alignItems="center">
//               <Image src="/images/icons/icons8-opened-folder-26.png" alt="Category" width={24} height={24} />
//               <Typography variant="bodyreg12" color={theme.palette.primary.blue1}>Category</Typography>
//             </Stack>
//           </Stack>

//           <Typography variant="h4" fontWeight={600} mb={2} align="center" >
//             {Title}
//           </Typography>
//           <Typography variant="body14reg" align="justify">
//             {Description?.slice(0, 300)}...
//           </Typography>
//         </CardContent>

//         {/* Bottom Bar */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             px: 2,
//             pb: 2,
//             mt: "auto",
//           }}
//         >
//           <Stack direction="row" spacing={1.5}>
//             <IconButton size="small">
//               <ShareIcon fontSize="small" sx={{ color: '#9D00A0' }} />
//             </IconButton>
//             <IconButton size="small">
//               <CommentIcon fontSize="small" sx={{ color: '#9D00A0' }} />
//             </IconButton>
//           </Stack>

//           <Link href={`/blog/${slug}`} passHref>
//             <Typography
//               sx={{
//                 fontSize: 20,
//                 color: "#9D00A0",
//                 textDecoration: "none",
//                 textTransform: "uppercase",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "3px",
//               }}
//             >
//               Read More <ArrowForwardIcon sx={{ fontSize: 24 }} />
//             </Typography>
//           </Link>
//         </Box>
//       </Card>
//     );
//   };

//   return (
//     <Box sx={{ py: 10, px: 3, maxWidth: "1400px", mx: "auto", textAlign: "right" }}>
//       <Typography variant="h2" fontWeight={700} mb={6}>
//         Recent Blog Posts
//       </Typography>

//       <Carousel items={blogs} renderItem={renderBlogCard} />
//     </Box>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Box, Card, CardContent, Typography, IconButton, Stack, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Carousel from "@/components/Carousel.jsx";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RecentBlogPosts() {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs?populate=*`)
      .then((res) => setBlogs(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading blogs: {error.message}</p>;
  if (!blogs?.length) return <p>No blogs found.</p>;

  const headerHeight = 180;

  const renderBlogCard = (blog) => {
    const { id, Title, Description, slug, blog_image, createdAt } = blog.attributes || blog;

    const imageUrl = blog_image?.data?.attributes?.url
      ? blog_image.data.attributes.url.startsWith("http")
        ? blog_image.data.attributes.url
        : `${API_URL}${blog_image.data.attributes.url}`
      : "/images/blog/pngwing.com - 2025-11-17T021857.109 copy.png";

    const date = new Date(createdAt);
    const dayMonth = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
    const year = date.getFullYear();

    return (
      <Card
        key={id}
        sx={{
          width: 300,
          minWidth: 300,
          height: 700,
          boxShadow: `-10px -8px 0px ${theme.palette.primary.green2}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 240 }}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={Title || "Blog Image"}
              fill
              style={{ objectFit: "contain" }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              background: theme.palette.background.lightGreen,
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `2px solid ${theme.palette.primary.main}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.7rem",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "14pt", fontWeight: "bold" }}>{dayMonth}</div>
              <div style={{ fontSize: "12pt" }}>{year}</div>
            </div>
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={2} mb={4}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Image src="/images/icons/icons8-writing-64.png" alt="Author" width={24} height={24} />
              <Typography variant="bodyreg12" color={theme.palette.primary.blue1}>Author</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Image src="/images/icons/icons8-opened-folder-26.png" alt="Category" width={24} height={24} />
              <Typography variant="bodyreg12" color={theme.palette.primary.blue1}>Category</Typography>
            </Stack>
          </Stack>

          <Typography variant="h4" fontWeight={600} mb={2} align="center">{Title}</Typography>
          <Typography variant="body14reg" align="justify">
            {Description?.slice(0, 300)}...
          </Typography>
        </CardContent>

        {/* Bottom Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 2, mt: "auto" }}>
          <Stack direction="row" spacing={1.5}>
            <IconButton size="small"><ShareIcon fontSize="small" sx={{ color: theme.palette.primary.violet }} /></IconButton>
            <IconButton size="small"><CommentIcon fontSize="small" sx={{ color: theme.palette.primary.violet }} /></IconButton>
          </Stack>

          <Link href={`/blog/${slug}`} passHref>
            <Typography
              sx={{
                fontSize: 20,
                color: theme.palette.primary.violet,
                textDecoration: "none",
                textTransform: "uppercase",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              Read More <ArrowForwardIcon sx={{ fontSize: 24 }} />
            </Typography>
          </Link>
        </Box>
      </Card>
    );
  };

  return (
    <Box sx={{ width: "100%", mt: 16 }}>
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
            boxShadow: `inset 0px -8px 0px ${theme.palette.background.lightGreen}`,
          }}
        />

        {/* RIGHT WHITE CURVED PANEL WITH TITLE */}
        <Box
          sx={{
            ...theme.mixins.homeTitleRight,
            boxShadow: `-10px -8px 0px ${theme.palette.background.lightGreen}`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "28px", md: theme.typography.h2?.fontSize || "38pt" },
              textAlign: { xs: "center", md: "right" },
              color: theme.palette.text.primary,
              marginRight: { md: "170px" },
            }}
          >
            Recent Blog Posts
          </Typography>
        </Box>

        {/* BOTTOM LINE */}
        <Box sx={{ ...theme.mixins.bottomLineLeft }} />
      </Box>

      {/* CONTENT BELOW HEADER */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          mt: 18,
        }}
      >
        <Carousel items={blogs} renderItem={renderBlogCard} />
      </Box>
    </Box>
  );
}
