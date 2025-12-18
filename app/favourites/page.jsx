"use client";

import { useMemo, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography, Button } from "@mui/material";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import { useFavorites } from "@/app/context/FavoritesContext";
import { useAuth } from "@/app/context/AuthContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

export default function FavouritesPage() {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  const getKey = (item) => {
    if (!item) return null;
    return (
      item.slug || item.id || item.attributes?.slug || item.attributes?.id || null
    );
  };

  const favouriteProducts = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const fav of favorites) {
      if (fav.type !== "product") continue;
      const item = fav.item;
      const key = getKey(item);
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
    return out;
  }, [favorites]);

  const favouriteServices = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const fav of favorites) {
      if (fav.type !== "service") continue;
      const item = fav.item;
      const key = getKey(item);
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
    return out;
  }, [favorites]);

  if (!user) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Favourites
        </Typography>
        <Typography variant="body16reg" sx={{ mb: 3 }}>
          Please log in to view the services and products you have saved.
        </Typography>
        <Button component={Link} href="/login" variant="contained">
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
  <Box
    sx={{
      py: 6,
      px: { xs: 2, sm: 3, md: 1 },
      maxWidth: "1450px",
      mx: "auto",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h2">Favourites</Typography>

      <Button
        component={Link}
        href="/products"
        variant="outlined"
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          px: 3,
          py: 1,
        }}
      >
        Back to Products & Services
      </Button>
    </Box>

    <Typography variant="body16reg" sx={{ color: "text.secondary", mb: 6 }}>
      Access your favourite services and products below
    </Typography>

    <Tabs value={tab} onChange={(_e, value) => setTab(value)} sx={{ mb: 4 }}>
      <Tab label="Products" />
      <Tab label="Services" />
    </Tabs>

    {tab === 0 ? (
      <FavouriteProducts items={favouriteProducts} />
    ) : (
      <FavouriteServices items={favouriteServices} />
    )}
  </Box>
);
}

function FavouriteProducts({ items }) {
  if (!items.length) return <EmptyState message="You have not saved any products yet." />;

  return (
    <Grid container spacing={4}>
      {items.map((product) => {
        const imageUrl = product?.product_logo?.url
          ? product.product_logo.url.startsWith("http")
            ? product.product_logo.url
            : `${API_URL}${product.product_logo.url}`
          : null;

        return (
                <Grid item xs={12} sm={6} md={4} key={`product-${product.id}`}>
                  <ProductCard product={product} imageUrl={imageUrl} apiUrl={API_URL} />
                </Grid>
              );
      })}
    </Grid>
  );
}

function FavouriteServices({ items }) {
  if (!items.length) return <EmptyState message="You have not saved any services yet." />;

  return (
    <Grid container spacing={4}>
      {items.map((service) => {
        const imageUrl = service?.service_logo?.url
          ? service.service_logo.url.startsWith("http")
            ? service.service_logo.url
            : `${API_URL}${service.service_logo.url}`
          : null;

        return (
          <Grid item xs={12} sm={6} md={4} key={`service-${service.id}`}>
            <ServiceCard service={service} imageUrl={imageUrl} apiUrl={API_URL} />
          </Grid>
        );
      })}
    </Grid>
  );
}

function EmptyState({ message }) {
  return (
    <Box
      sx={{
        py: 6,
        border: "1px dashed",
        borderColor: "divider",
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Typography variant="body16reg">{message}</Typography>
      <Typography variant="body14reg" sx={{ m: 3, color: "text.secondary" , display: 'block'}}>
        Browse products or services and tap the heart icon to save your favourites.
      </Typography>
    </Box>
  );
}
