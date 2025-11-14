import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

const services = [
  {
    title: "Cyber Security",
    icon: "/services/icons8-lock-100.png",
    description:
      "We help protect your business with advanced cyber security tools and services — keeping your data and systems safe from evolving digital threats.",
  },
  {
    title: "AI & Machine Learning",
    icon: "/services/icons8-ai-100.png",
    description:
      "We provide AI and machine learning solutions — from computer vision to natural language processing — to help businesses harness intelligent automation.",
  },
  {
    title: "Cloud Services",
    icon: "/services/icons8-cloud-100.png",
    description:
      "We are experts in cloud services, offering secure, scalable, and efficient cloud solutions tailored to your needs.",
  },
  {
    title: "Data Management",
    icon: "/services/icons8-data-management-100.png",
    description:
      "We provide powerful data management products and services to help you organize, protect, and utilize your data effectively.",
  },
  {
    title: "Data Science",
    icon: "/services/icons8-data-science-100.png",
    description:
      "Our expertise in data science and AI helps you turn complex data into real-world intelligence.",
  },
  {
    title: "Web & Mobile Development",
    icon: "/services/icons8-computer-100.png",
    description:
      "We build fast, reliable, and user-focused web and mobile applications that help businesses scale.",
  },
];

export default function ServicesSection() {
  return (
    <Box sx={{ backgroundColor: "background.lightmint", py: 8, px: 4 }}>
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
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "background.darkmint",
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
                  width={40}     
                  height={40}    
                  objectFit="contain"
                    />
                  </Box>

                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
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
