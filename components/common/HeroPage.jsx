import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function HeroPage({ title, image1, image2 }) {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#ffffff",
            px: 6,
            py: 8,
            width: "100%",
            maxWidth: "1440px",
            height: "550px",
            mb: 12,
        }}>
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: "72px",
                    flexGrow: 1, 
                }}
            >
                {title}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                {image1 && (
                    <Image
                        src={image1.src}
                        alt={image1.alt}
                        width={image1.width}
                        height={image1.height}
                    />
                )}
                {image2 && (
                    <Image
                        src={image2.src}
                        alt={image2.alt}
                        width={image2.width}
                        height={image2.height}
                        loading="eager"
                    />
                )}
            </Box>
        </Box>
    );
}