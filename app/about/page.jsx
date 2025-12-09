"use client";

import AboutPageHero from "@/components/about/AboutPageHero";
import BulletPoints from "@/components/about/BulletPoints";
import AboutImageList from "@/components/about/AboutImageList";
import { Box, Container, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AboutPage() {
  const theme = useTheme();
  //  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    const API_URL = "http://localhost:1337";

   const [bannerSection, setBannerSection] = useState(null);
   const [welcomeSection, setWelcomeSection] = useState(null);
   const [bulletPoints, setBulletPoints] = useState(null);
   const [philosophySection, setPhilosophySection] = useState(null);
   const [networkSection, setNetworkSection] = useState(null);
   const [innovationSection, setInnovationSection] = useState(null);
   const [promiseSection, setPromiseSection] = useState(null);
   const [imageList, setImageList] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_URL}/api/about?populate[AboutBannerSection][populate]=*&populate[WelcomeSection]=*&populate[BulletPoints]=*&populate[PhilosophySection]=*&populate[NetworkSection][populate]=*&populate[InnovationSection]=*&populate[PromiseSection][populate]=*&populate[AboutImageList][populate]=*`
      )
      .then((res) => {
        const data = res.data?.data || {};
        setBannerSection(data.AboutBannerSection || null);
        setWelcomeSection(data.WelcomeSection || null);
        setBulletPoints(data.BulletPoints || null);
        setPhilosophySection(data.PhilosophySection || null);
        setNetworkSection(data.NetworkSection || null);
        setInnovationSection(data.InnovationSection || null);
        setPromiseSection(data.PromiseSection || null);
        setImageList(data.AboutImageList || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading)
    return <LoadingSpinner />;
  if (error)
    return (
      <Container sx={{ py: 8 }}>
        Error loading contact page: {error.message}
      </Container>
    );

  const { banner_description1, banner_description2, banner_description3} = bannerSection;

  const {welcome_title1, welcome_title2,welcome_title3,welcome_description1, welcome_description2}= welcomeSection;

  const {point1, point2, point3, point4} = bulletPoints;

  const {philosophy_title, philosophy_description1, philosophy_description2}= philosophySection;

  const {network_title, network_description1, network_description2, video_image, network_image}= networkSection;

  const {innovation_title1, innovation_title2, innovation_description1, innovation_description2,innovation_description3 }= innovationSection;

  const {promise_title, promise_description1, promise_description2, promise_description3, promise_image}= promiseSection;


  const imageUrl = (image) => {

    if (!image) return null;
  
    const img = Array.isArray(image) ? image[0] : image;
  
    if (img?.data?.attributes?.url) {
      const url = img.data.attributes.url;
      return url.startsWith("http") ? url : `${API_URL}${url}`;
    }
  
    if (img?.url) {
      return img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`;
    }
  
    return null;
  };
  
  

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AboutPageHero bannerSection={bannerSection} imageUrl={imageUrl}/>

      <Typography variant="h1" fontSize={"60pt"} align="right" mb={12} gutterBottom>
        {banner_description1}
        <br />
       {banner_description2}
        <br />
       {banner_description3}
      </Typography>

      {/* Main Section Wrapper */}
      <Box sx={{ display: "flex", position: "relative", gap: 6, minHeight: 2600  }}>
        {/* LEFT COLUMN */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* Empowerment Section */}
          <Box sx={{ position: "absolute", top: 100, width: "100%" }}>
            <Typography variant="h2" mb={12}>
              {welcome_title1}
              <br />
              {welcome_title2}
              <br />
              {welcome_title3}
            </Typography>
            <Typography
              variant="body14med"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
               {welcome_description1}
              <br />
              <br />
              {welcome_description2}
            </Typography>
          </Box>

          {/* Bullet Points */}
          <Box sx={{ position: "absolute", top: 800, width: "100%", height: "100%" }}>
            <BulletPoints
              text={point1}
              gradient="linear-gradient(135deg, #B060FF, #FF62CE)"
            />
            <BulletPoints
              text={point2}
              gradient="linear-gradient(135deg, #8469FF, #C862FF)"
            />
            <BulletPoints
              text={point3}
              gradient="linear-gradient(135deg, #597BFF, #7C5CFF)"
            />
            <BulletPoints
              text={point4}
              gradient="linear-gradient(135deg, #6FEAFF, #A7F0FF)"
            />
          </Box>

          {/* Philosophy */}
          <Box sx={{ position: "absolute", top: 1300, width: "100%" }}>
            <Typography variant="h2" mb={4}>
             {philosophy_title}
            </Typography>
            <Typography
              variant="body14reg"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
             {philosophy_description1}
             <br /><br />
            {philosophy_description2}
            </Typography>
          </Box>

          {/* Global Network */}
          <Box sx={{ position: "absolute", top: 1650, width: "100%" }}>
            <Typography variant="h2" mb={4}>
              {network_title}
            </Typography>
            <Typography
              variant="body14reg"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
              {network_description1}
              <br /><br />
              {network_description2}
            </Typography>
          </Box>

          {/* Video */}
          <Box sx={{ position: "absolute", top: 2000, width: "100%" }}>
            <Box
              component="img"
              src={imageUrl(video_image)}
              alt="Team"
              sx={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* Image List Grid */}
          <Box
            alt="Images of Team and Workspaces"
            sx={{ position: "absolute", top: 0, display: "flex", justifyContent: "flex-end", right: 0, width: "100%", borderRadius: "10px" }}
          >
            <AboutImageList imageUrl={imageUrl} imageList={imageList}/>
          </Box>

          {/* Products */}
          <Box 
            sx={{ 
              position: "absolute",
              top: 1100,
              right: 0,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h2" mb={4} align="right">
                {innovation_title1}
                <br />
                {innovation_title2}
              </Typography>

              <Typography variant="body14reg" color="text.primary" align="justify">
                {innovation_description1} 
                <br /><br />
                {innovation_description2} 
                <br /><br />
                {innovation_description3}
              </Typography>
            </Box>
          </Box>
          {/* Map Image */}
          <Box
            component="img"
            src={imageUrl(network_image)}
            alt="Global Map"
            sx={{
              position: "absolute",
              top: 1650,
              width: "100%",
              borderRadius: "10px",
              opacity: 0.8,
              scale: "1.1",
            }}
          />

          {/* Promise Section */}
          <Box 
            sx={{ 
              position: "absolute",
              top: 2050,
              right: 0,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h2" mb={4} align="right">
                {promise_title}
              </Typography>

              <Typography variant="body14reg" color="text.primary" align="justify">
                {promise_description1}
                <br /><br />
                {promise_description2}
                <br /><br />
                {promise_description3}
              </Typography>
            </Box>
         <Box
            component="img"
            src={imageUrl(promise_image)}
            alt="Signature"
            sx={{
              position: "absolute",
              bottom: "-100px",
              width: "110px",
              height: "65px",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>
    </Box>
    </Container>
  );
}
