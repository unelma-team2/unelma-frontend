import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function ProductsPageHero({bannerSection}) {
    const{ productBanner_title, productBanner_image } = bannerSection || {};

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
                    fontSize: "72px",
                    flexGrow: 1, 
                    //marginLeft: "170px"
                }}
            >
                {productBanner_title} & <br />Services
            </Typography>
            <Box sx={{flexGrow: 1}}>
                <Image
                    src="/images/shop2.png"
                    alt="Blog Hero 1"
                    width={500}
                    height={500}
                />
                
            </Box>
        </Box>
    )
}