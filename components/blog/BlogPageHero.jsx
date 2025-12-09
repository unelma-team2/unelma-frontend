"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { use } from "react";

export default function BlogPageHero({bannerSection, imageUrl}) {
    //const { banner_title, banner_image } = bannerSection;
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#ffffff",
            px: 6,
            py: 8,
            width: "1440px",
            height: "550px",
            mb: 12,
        }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: "72pt",
                    flexGrow: 1,
                    marginLeft: "170px"
                }}
                >
                    Blog
                </Typography>
            <Box sx={{  
                  scale: 0.7,
                 flexGrow: 1 }}>
                <Image
                    src="/images/blog2.png"
                    alt="Blog Hero"
                    width={592}
                    height={640}
                    
                    
                    scale= {0.7}
                    />
            </Box>
        </Box>
    )
}