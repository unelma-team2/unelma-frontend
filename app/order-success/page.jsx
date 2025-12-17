"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import HeroPage from "@/components/common/HeroPage";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      localStorage.removeItem("lastOrder"); // clear after reading
    }
  }, []);

  if (!order) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5">No order found.</Typography>
        <Button onClick={() => router.push("/products")}>Go Shopping</Button>
      </Box>
    );
  }

  return (
    <>
      <HeroPage
        title="Order Success"
        image1={{ src: "/blog/blog-hero-1.png", alt: "Order Success Hero 1", width: 244, height: 261 }}
        image2={{ src: "/blog/blog-hero-2.png", alt: "Order Success Hero 2", width: 272, height: 309 }}
      />

      <Box sx={{ py: 8, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
          🎉 Order Placed Successfully!
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, textAlign: "center" }}>
          Thank you for your order. Here are your order details:
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Order ID: <strong>{order.orderId}</strong>
        </Typography>

        {/* Ordered Products Table */}
        <Box sx={{ mb: 4, maxWidth: 700, mx: "auto"}}>
          <Typography variant="h5" sx={{ mb: 2 }}>Ordered Products:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.productId || item.documentId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">${(item.unitPrice * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {order.shipping && (
          <TableRow>
            <TableCell>
              Delivery – {order.shipping.delivery_type}
            </TableCell>
            <TableCell align="center">—</TableCell>
            <TableCell align="right">
              ${Number(order.shipping.cost).toFixed(2)}
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          <TableCell />
          <TableCell align="right" sx={{ fontWeight: "bold" }}>
            ${order.total.toFixed(2)}
          </TableCell>
        </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

       
{order.billingAddress && (
  <Box sx={{ mb: 4, maxWidth: 700, mx: "auto" }}>
    <Grid container spacing={4}>
      
      {/* Billing Address */}
      <Grid item xs={12} md={order.deliveryAddress ? 6 : 12}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Billing Address
        </Typography>
        <Typography>{order.billingAddress.name}</Typography>
        <Typography>{order.billingAddress.email}</Typography>
        <Typography>{order.billingAddress.phone}</Typography>
        <Typography>
          {order.billingAddress.street}, {order.billingAddress.city}
        </Typography>
        <Typography>
          {order.billingAddress.state} – {order.billingAddress.postalCode}
        </Typography>
        <Typography>{order.billingAddress.country}</Typography>
      </Grid>

      {/* Delivery Address (only if exists) */}
      {order.deliveryAddress && (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Delivery Address
          </Typography>
          <Typography>{order.deliveryAddress.name}</Typography>
          <Typography>{order.deliveryAddress.email}</Typography>
          <Typography>
            {order.deliveryAddress.street}, {order.deliveryAddress.city}
          </Typography>
          <Typography>
            {order.deliveryAddress.state} – {order.deliveryAddress.postalCode}
          </Typography>
          <Typography>{order.deliveryAddress.country}</Typography>
        </Grid>
      )}

    </Grid>
  </Box>
)}


        {/* Total Paid */}
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => router.push("/profile")}>
            Dashboard
          </Button>
          <Button variant="outlined" color="primary" onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </>
  );
}


