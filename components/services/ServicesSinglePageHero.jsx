import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function ServicesSinglePageHero() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#ffffff",
            px: 20,
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
                    fontSize: "72px",
                    flexGrow: 1, 
                }}
            >
                Services
            </Typography>
            <Box sx={{flexGrow: 1}}>
                <Image
                    src="/blog/blog-hero-1.png"
                    alt="Blog Hero 1"
                    width={245}
                    height={260}
                />
                <Image
                    src="/blog/blog-hero-2.png"
                    alt="Blog Hero 2"
                    width={270}
                    height={310}
                    loading="eager"
                />
            </Box>
        </Box>
    )
}
