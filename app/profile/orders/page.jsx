"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import HeroPage from "@/components/common/HeroPage"; // added import

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders] = useState([]); // replace with fetch when backend ready

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <HeroPage title="My Orders" compact /> 
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, maxWidth: 1200, mx: "auto" }}>
        <Paper sx={{ p: 3 }}>
          {orders.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You have no orders yet.
              </Typography>
              <Button variant="contained" onClick={() => router.push("/products")}>
                Shop Products
              </Button>
            </Box>
          ) : (
            <Typography>Order list (implement when backend ready)</Typography>
          )}
        </Paper>
      </Box>
    </>
  );
}