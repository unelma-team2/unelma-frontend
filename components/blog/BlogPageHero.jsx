import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function BlogPageHero() {
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
                }}
                >
                    Blog
                </Typography>
                <Box sx={{display: "flex", gap: 4}}>
                    <Image
                        src="/blog/blog-hero-1.png"
                        alt="Blog Hero 1"
                        width={244}
                        height={261}
                        />
                    <Image
                        src="/blog/blog-hero-2.png"
                        alt="Blog Hero 2"
                        width={272}
                        height={309}
                        loading="eager"
                        />
                    
                </Box>
        </Box>
    )
}