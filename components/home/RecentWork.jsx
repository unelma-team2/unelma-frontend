// "use client";

// import React from "react";
// import { Box, Typography, Tabs, Tab, Card, CardMedia, CardContent, useTheme } from "@mui/material";
// import Carousel from "@/components/Carousel.jsx";

// export default function RecentWorkSection({ works = [], categories = [], API_URL }) {
//   const theme = useTheme();
//   const [tab, setTab] = React.useState(0);

//   const handleChange = (e, newVal) => setTab(newVal);

//   const filteredWorks = tab === 0 ? works : works.filter(work => work.type === categories[tab]?.name);

//   const renderWorkCard = (work) => {
//     const imageUrl = work.image?.url
//       ? work.image.url.startsWith("http")
//         ? work.image.url
//         : `${API_URL}${work.image.url}`
//       : null;

//     return (
//       <Card
//         key={work.id || work.title}
//         sx={{
//           mt: 2,
//           textAlign: "center",
//           border: `2px solid ${theme.palette.primary.main}`,
//           borderRadius: "10px",
//           width: 300,
//           boxShadow: 3,
//           boxShadow: `-10px -8px 0px ${theme.palette.primary.blue}`,
//           transition: "0.3s",
//           '&:hover': {
//             transform: 'translateY(-6px)',
//             boxShadow: 6,
//           },
//         }}
//       >
//         <CardMedia component="img" height="335px" image={imageUrl} />
//         <CardContent sx={{ background: theme.palette.background.lightMint }}>
//           <Typography fontWeight={700} align="center">{work.title}</Typography>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <Box sx={{ p: 0, minWidth: 0, color: 'black' }}>
//       <Typography variant="h2" component="h2" align="right" sx={{ fontWeight: 700, mb: 6 }}>
//         Our Recent Works
//       </Typography>

//       <Tabs
//         value={tab}
//         onChange={handleChange}
//         centered
//         sx={{
//           mb: 6,
//           '& .MuiTabs-indicator': {
//             height: 4,
//             backgroundColor: 'primary.main',
//           },
//         }}
//       >
//         {categories.map((category, index) => (
//           <Tab
//             key={index}
//             label={category.name}
//             sx={{
//               fontSize: 16,
//               fontWeight: 700,
//               textTransform: 'none',
//             }}
//           />
//         ))}
//       </Tabs>

//       <Box sx={{ mt: 4 }}>
//         <Carousel
//           items={filteredWorks}
//           renderItem={renderWorkCard}
//         />
//       </Box>
//     </Box>
//   );
// }

"use client";

import React from "react";
import { Box, Typography, Tabs, Tab, useTheme } from "@mui/material";
import Carousel from "@/components/Carousel.jsx";
import WorkProjectCard from "@/components/WorkProjectCard.jsx";

export default function RecentWorkSection({ works = [], categories = [], API_URL }) {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);

  const handleChange = (e, newVal) => setTab(newVal);

  const filteredWorks =
    tab === 0 ? works : works.filter(work => work.type === categories[tab]?.name);

  return (
    <Box sx={{ p: 0, minWidth: 0, color: "black" }}>
      <Typography variant="h2" component="h2" align="right" sx={{ fontWeight: 700, mb: 6 }}>
        Our Recent Works
      </Typography>

      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        sx={{
          mb: 6,
          "& .MuiTabs-indicator": {
            height: 4,
            backgroundColor: "primary.main",
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={category.name}
            sx={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 4 }}>
        <Carousel
          items={filteredWorks}
          renderItem={(work) => <WorkProjectCard work={work} API_URL={API_URL} />}
        />
      </Box>
    </Box>
  );
}
