"use client";

import AboutPageHero from "@/components/about/AboutPageHero";
import BulletPoints from "@/components/about/BulletPoints";
import AboutImageList from "@/components/about/AboutImageList";
import { Box, Container, Typography, useTheme } from "@mui/material";

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AboutPageHero />

      <Typography variant="h1" fontSize={"60pt"} align="right" mb={12} gutterBottom>
        We Have 15 Years of
        <br />
        Experience in
        <br />
        IT Solutions.
      </Typography>

      {/* Main Section Wrapper */}
      <Box sx={{ display: "flex", position: "relative", gap: 6, minHeight: 2600  }}>
        {/* LEFT COLUMN */}
        <Box sx={{ flex: 1, position: "relative" }}>
          {/* Empowerment Section */}
          <Box sx={{ position: "absolute", top: 100, width: "100%" }}>
            <Typography variant="h2" mb={12}>
              Welcome to
              <br />
              Unelma Platforms
              <br />
              — Empowering People Through Technology
            </Typography>
            <Typography
              variant="body14med"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
               At Unelma Platforms, our mission has always been simple yet
              powerful: to empower people through technology. With over 15
              years of innovation and excellence, we build trusted, user-focused,
              and purpose-driven digital solutions.
              <br />
              <br />
              Our solutions are designed to create meaningful change and help
              organizations thrive in the digital era. From cybersecurity to
              workflow optimization, we deliver results.
            </Typography>
          </Box>

          {/* Bullet Points */}
          <Box sx={{ position: "absolute", top: 800, width: "100%", height: "100%" }}>
            <BulletPoints
              text="End-to-end IT services tailored for your business"
              gradient="linear-gradient(135deg, #B060FF, #FF62CE)"
            />
            <BulletPoints
              text="Complete cyber security solutions for all industries"
              gradient="linear-gradient(135deg, #8469FF, #C862FF)"
            />
            <BulletPoints
              text="Skilled professionals delivering trusted results"
              gradient="linear-gradient(135deg, #597BFF, #7C5CFF)"
            />
            <BulletPoints
              text="Worldwide support & service, at any hour"
              gradient="linear-gradient(135deg, #6FEAFF, #A7F0FF)"
            />
          </Box>

          {/* Philosophy */}
          <Box sx={{ position: "absolute", top: 1300, width: "100%" }}>
            <Typography variant="h2" mb={4}>
              Our Philosophy
            </Typography>
            <Typography
              variant="body14reg"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
             We believe in the boundless potential of technology to create positive change.
             <br /><br />
            Our passionate team of professionals develops intuitive, efficient, and groundbreaking platforms that help organizations optimize workflows, solve challenges, and thrive in the digital era.
            </Typography>
          </Box>

          {/* Global Network */}
          <Box sx={{ position: "absolute", top: 1650, width: "100%" }}>
            <Typography variant="h2" mb={4}>
              A Global Network
            </Typography>
            <Typography
              variant="body14reg"
              color="text.primary"
              maxWidth="400px"
              align="justify"
            >
              From local startups to global enterprises, we proudly serve a diverse network of clients worldwide.
              <br /><br />
              Our consistent innovation, reliability, and exceptional service have earned us trust across continents — a true reflection of our mission to empower people through technology, beyond boundaries.
            </Typography>
          </Box>

          {/* Video */}
          <Box sx={{ position: "absolute", top: 2000, width: "100%" }}>
            <Box
              component="img"
              src="/images/about/video-image.png"
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
            <AboutImageList />
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
                Our Products
                <br />
                and Innovations
              </Typography>

              <Typography variant="body14reg" color="text.primary" align="justify">
                Our suite of products — including UnelmaMail, UnelmaBrowser, and Unelma Code Translator — reflects our commitment to creating technology that truly makes a difference. 
                <br /><br />
                Each solution is built around the user, offering continuous support, security, and a seamless experience. 
                <br /><br />
                At Unelma, we don’t just build technology — we build opportunities that empower individuals and businesses to grow and succeed.
              </Typography>
            </Box>
          </Box>
          {/* Map Image */}
          <Box
            component="img"
            src="/images/about/map.png"
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
                Our Promise
              </Typography>

              <Typography variant="body14reg" color="text.primary" align="justify">
                For more than 15 years, Unelma Platforms has been at the forefront of helping businesses harness the power of technology to drive success. Our broad range of innovative and user-friendly software solutions have enabled businesses to operate more efficiently, reach their customers effectively, and ultimately, boost their bottom line.
                <br /><br />
                With a rich experience spanning over a decade, Unelma Platforms stands as a reliable partner in the journey of businesses toward growth and success. Our goal has, and always will be, to empower businesses with the best tech tools and services.
                <br /><br />
                Join us on this journey. Together, let's build technology that inspires and transforms.
              </Typography>
            </Box>
         <Box
            component="img"
            src="/images/about/signature.png"
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
