"use client";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 8,
      }}
    >
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
        🎉 Order Placed Successfully!
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Thank you for your order. We’ve received your request and will process it soon.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/profile/orders")}
        sx={{ mb: 2 }}
      >
        View My Orders
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push("/products")}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}