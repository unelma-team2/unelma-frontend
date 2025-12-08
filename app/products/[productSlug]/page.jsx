"use client";

import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductsSinglePageHero from "@/components/products/ProductsSinglePageHero";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCards";
import axios from "axios";

export default function ProductPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const { productSlug } = useParams();

  const productData = {
    id: 1,
    name: "UnelmaMail",
    product_type: "Email Marketing Software",
    detailedDescription: `
Meet UnelmaMail — the world’s first AI-powered, all-in-one email marketing automation platform designed to simplify how you reach and engage your audience. Built by Unelma Platforms, it blends powerful features, automation, and intelligent analytics into a user-friendly SaaS solution for businesses of any size.

What UnelmaMail offers:
- Comprehensive mailing list & contact management — handle single or double opt-in flows, import/export contacts, segment lists, manage subscriptions, and blacklist unwanted addresses to keep your lists clean.
- Flexible Email Builder & Templates — use the responsive editor and choose from dozens of pre-built layouts, or import your own email designs, to create attractive campaigns without coding.
- Automation & Autoresponders — trigger campaigns or follow-up emails based on subscriber behavior (opens, clicks), subscription events, or recurring schedules. Great for drip sequences, newsletters, or engagement follow-ups.
- Full delivery tracking & analytics — monitor opens, clicks, bounces, complaints; get real-time reports and insights on performance, list growth, and campaign effectiveness right from the dashboard.
- API & third-party integrations — integrate UnelmaMail with your websites or applications via RESTful API; works with major sending services such as Amazon SES, SendGrid, SparkPost, and Elastic Email — giving you flexibility and scalability.
- Easy start & affordable pricing — try the platform with a free plan supporting up to 2,500 contacts. Paid plans start affordably (e.g., a standard plan at $7.99 per month), with higher tiers and enterprise-ready options available for growing businesses.
- Open-source foundation — built using open-source technologies under a flexible framework, making maintenance easier and allowing for custom developments as business needs evolve.
- Support & long-term reliability — backed by Unelma Platforms’ commitment to support, maintenance, security updates, and bug fixes — giving you peace of mind as your campaigns scale.

Who is UnelmaMail for?
Whether you’re a solo entrepreneur, a marketing professional, or an enterprise-level company, UnelmaMail is built to suit your needs. It’s ideal if you want:
- A unified platform for managing your email marketing from list building to campaign analytics.
- Easy-to-use tools without needing deep technical skills — but with power available when you need it.
- Reliable software with active updates, technical support, and scalability for growing businesses.
- A cost-effective solution that works with composing an ROI-driven campaign strategy.

UnelmaMail SoftwareLive consumer software version is available at https://unelmamail.com.
`,
    unitPrice: 49.90,
    image: "/images/products/unelmamail-image.png",
    logo: "/images/products/unelmamail-logo.png",
    category: "Enterprise Software",
    gallery: [
      "/images/products/unelmamail-image.png",
      "/images/products/unelmamail-image2.png",
    ],
  };

  const [rating, setRating] = useState(0);

  const [quantity, setQuantity] = useState(1);
  // State to manage favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  // State to manage the currently selected image
  const [selectedImage, setSelectedImage] = useState(productData.image);

  const [relatedItems, setRelatedItems] = useState([]); // State for related items

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  useEffect(() => {
    // Fetch all products from the backend
    axios
      .get(`${API_URL}/api/home?populate[Products][populate]=*`)
      .then((res) => {
        const allProducts = res.data.data?.Products || [];

        // Filter out the current product
        const filteredProducts = allProducts.filter(
          (item) => item.slug !== productSlug
        );

        // Function to pick random 3 items
        const getRandomItems = (items, count) => {
          const shuffled = items.sort(() => 0.5 - Math.random()); // Shuffle the array
          return shuffled.slice(0, count); // Return the first 'count' items
        };

        // Set related items to random 3 products
        setRelatedItems(getRandomItems(filteredProducts, 3));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [API_URL, productSlug]);

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    console.log("Rating submitted:", newValue);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${productData.name} to the cart.`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(
      `${productData.name} is ${
        !isFavorite ? "added to" : "removed from"
      } favorites.`
    );
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <ProductsSinglePageHero />

      {/* Breadcrumb */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
          Products {">"} {productData.name}
        </Typography>
      </Box>

      {/* Product Details */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Product Image and Detailed Description (Left) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Main Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={selectedImage}
              alt={productData.name}
              width={665}
              height={401}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>

          {/* Detailed Description */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#555", whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: `
                  Meet UnelmaMail — the world’s first AI-powered, all-in-one email marketing automation platform designed to simplify how you reach and engage your audience. Built by Unelma Platforms, it blends powerful features, automation, and intelligent analytics into a user-friendly SaaS solution for businesses of any size.

                  <strong>What UnelmaMail offers</strong>

                  - <strong>Comprehensive mailing list & contact management</strong> — handle single or double opt-in flows, import/export contacts, segment lists, manage subscriptions, and blacklist unwanted addresses to keep your lists clean.
                  - <strong>Flexible Email Builder & Templates</strong> — use the responsive editor and choose from dozens of pre-built layouts, or import your own email designs, to create attractive campaigns without coding.
                  - <strong>Automation & Autoresponders</strong> — trigger campaigns or follow-up emails based on subscriber behavior (opens, clicks), subscription events, or recurring schedules. Great for drip sequences, newsletters, or engagement follow-ups.
                  - <strong>Full delivery tracking & analytics</strong> — monitor opens, clicks, bounces, complaints; get real-time reports and insights on performance, list growth, and campaign effectiveness right from the dashboard.
                  - <strong>API & third-party integrations</strong> — integrate UnelmaMail with your websites or applications via RESTful API; works with major sending services such as Amazon SES, SendGrid, SparkPost, and Elastic Email — giving you flexibility and scalability. 
                  - <strong>Easy start & affordable pricing</strong> — try the platform with a free plan supporting up to 2,500 contacts. Paid plans start affordably (e.g. a standard plan at $7.99 per month), with higher tiers and enterprise-ready options available for growing businesses.
                  - <strong>Open-source foundation</strong> — built using open-source technologies under a flexible framework, making maintenance easier and allowing for custom developments as business needs evolve.
                  - <strong>Support & long-term reliability</strong> — backed by Unelma Platforms’ commitment to support, maintenance, security updates and bug fixes — giving you peace of mind as your campaigns scale. 

                  <strong>Who is UnelmaMail for?</strong>

                  Whether you’re a solo entrepreneur, a marketing professional, or an enterprise-level company, UnelmaMail is built to scale with your needs. It’s ideal if you want:

                  - A unified platform for managing your email marketing from list building to campaign analytics.
                  - Easy-to-use tools without needing deep technical skills — but with power available when you need it.
                  - Flexible integration with existing systems, thanks to API support and compatibility with major email sending services.
                  - Cost-effective email marketing without compromising on automation or analytics.

                  With UnelmaMail, you do more than send emails — you build dynamic, data-driven campaigns that engage, convert, and grow with your business.

                  UnelmaMail SoftwareLive consumer software version is publicly available at: <strong>https://unelmamail.com/</strong>
                `,
              }}
            />
          </Box>

          {/* Gallery Section */}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {productData.gallery.slice(0, 2).map((image, index) => (
              <Box
                key={index}
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  boxShadow: selectedImage === image ? "0 0 10px #000" : "none",
                }}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Product Logo, Short Description, and Pricing (Right) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Product Logo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Image
              src={productData.logo}
              alt={`${productData.name} Logo`}
              width={301}
              height={47}
            />
            {/* Product Type */}
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                fontWeight: "bold",
                textAlign: "center",
                mt: 1, // Add spacing between logo and product type
              }}
            >
              {productData.product_type}
            </Typography>
          </Box>

          {/* Product Name */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
          >
            {productData.name}
          </Typography>

          {/* Ratings */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <Typography variant="body2" sx={{ color: "#555" }}>
              {rating} Stars
            </Typography>
          </Box>

          {/* Price */}
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
            }}
          >
            ${productData.unitPrice.toFixed(2)}
          </Typography>

          {/* Quantity Controller, Add to Cart, and Favorite Button */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ width: "60px" }}
              inputProps={{ min: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addToCart({ ...productData, quantity });
                router.push("/cart");
              }}
            >
              Add to Cart
            </Button>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              color="secondary"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          {/* Leave a Review Button */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="outlined" color="secondary">
              Leave a Review
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Related Items Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Related Items
        </Typography>
        <Grid container spacing={4}>
          {relatedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductCard product={item} apiUrl={API_URL} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
