"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { use } from "react";

export default function AboutPageHero() {
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
            mb: 4,
        }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: "72px",
                    flexGrow: 1,
                   // marginLeft: "170px",
                }}
                >
                    About Us
                </Typography>
            <Box sx={{  
                 //marginRight: "170px", 
                 flexGrow: 1 }}>
                <Image
                    src="/images/about/about-hero.png"
                    alt="About Hero"
                    width={412}
                    height={548}
                    />
            </Box>
        </Box>
    )
}