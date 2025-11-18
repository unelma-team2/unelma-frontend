import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import theme from "@/theme";

const services = [
  {
    title: "Cyber Security",
    icon: "/images/homepage-services/icons8-lock-100.png",
    description:
      "We help protect your business with advanced cyber security tools and services — keeping your data and systems safe from evolving digital threats.",
  },
  {
    title: "AI & Machine Learning",
    icon:  "/images/homepage-services/icons8-ai-100.png",
    description:
      "We provide AI and machine learning solutions — from computer vision to natural language processing — to help businesses harness intelligent automation.",
  },
  {
    title: "Cloud Services",
    icon:  "/images/homepage-services/icons8-cloud-100.png",
    description:
      "We are experts in cloud services, offering secure, scalable, and efficient cloud solutions tailored to your needs.",
  },
  {
    title: "Data Management",
    icon:  "/images/homepage-services/icons8-data-management-100.png",
    description:
      "We provide powerful data management products and services to help you organize, protect, and utilize your data effectively.",
  },
  {
    title: "Data Science",
    icon:  "/images/homepage-services/icons8-data-science-100.png",
    description:
      "Our expertise in data science and AI helps you turn complex data into real-world intelligence.",
  },
  {
    title: "Web & Mobile Development",
    icon:  "/images/homepage-services/icons8-computer-100.png",
    description:
      "We build fast, reliable, and user-focused web and mobile applications that help businesses scale.",
  },
];

export default function ServicesSection() {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.lightMint, py: 8, px: 4 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h2"
          component="h2"
          align="right"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Our Services
        </Typography>

        <Grid container spacing={8} justifyContent="center">
          {services.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: 300,
                  height: 320,
                  borderRadius: "10px",
                  p: 2,
                  textAlign: "center",
                  border: "2px solid #2F2E2E",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.background.darkMint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      border: "2px solid #2F2E2E",
                      overflow: "hidden",
                    }}
                  >
               <Image
                  src={service.icon}
                  alt={service.title}
                  width={45}     
                  height={45}    
                  objectFit="contain"
                    />
                  </Box>

                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    sx={{ textAlign: "justify" }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
