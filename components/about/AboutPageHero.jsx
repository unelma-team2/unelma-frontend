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
            mb: 12,
        }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: "72pt",
                    flexGrow: 1,
                }}
                >
                    About Us
                </Typography>
            <Box sx={{  

                 flexGrow: 1 }}>
                <Image
                    src="/images/about/about-hero.png"
                    alt="About Hero"
                    width={304}
                    height={404}
                    />
            </Box>
        </Box>
    )
}