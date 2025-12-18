"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useUserProfile } from "@/app/context/UserContext";
import HeroPage from "@/components/common/HeroPage";
import axios from "axios";

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!profile || profileLoading) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/orders?filters[user_profile][id][$eq]=${profile.id}&populate[order_items][populate]=*`,
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
    
        setOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, profile, profileLoading, router]);

  if (!user || profileLoading || loading) {
    return <Typography sx={{ textAlign: "center", mt: 8 }}>Loading...</Typography>;
  }

  return (
    <>
      <HeroPage title="My Orders" compact />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, maxWidth: 1200, mx: "auto" }}>
        {/* Back button always visible */}
        <Box sx={{ mb: 4 }}>
          <Button variant="outlined" onClick={() => router.push("/profile")}>
            Back to Dashboard
          </Button>
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You have no orders yet.
            </Typography>
            <Paper sx={{ p: 3, display: "inline-block" }}>
  <Box sx={{ display: "flex", gap: 2 }}>
    <Button variant="contained" onClick={() => router.push("/products")}>
      Shop Products
    </Button>
    
  </Box>
</Paper>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    Order ID: <span style={{ fontWeight: "normal" }}>{order.order_id}</span>
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    Status: <span style={{ fontWeight: "normal" }}>{order.order_status || "Pending"}</span>
                  </Typography>

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Products:</Typography>
                    {order.order_items && order.order_items.length > 0 ? (
                      order.order_items.map((item) => (
                        <Typography key={item.documentId}>
                          {item.product_name} × {item.quantity} (${item.subTotal.toFixed(2)})
                        </Typography>
                      ))
                    ) : (
                      <Typography>No items in this order.</Typography>
                    )}
                  </Box>

                  <Typography sx={{ fontWeight: "bold" }}>
                    Delivery Type: <span style={{ fontWeight: "normal" }}>{order.delivery_type}</span>
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Delivery Cost: <span style={{ fontWeight: "normal" }}>${order.delivery_cost?.toFixed(2) || "0.00"}</span>
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Subtotal: <span style={{ fontWeight: "normal" }}>${order.subTotal?.toFixed(2)}</span>
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Total: <span style={{ fontWeight: "normal" }}>${order.total?.toFixed(2)}</span>
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Payment Method: <span style={{ fontWeight: "normal" }}>{order.payment_method}</span>
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
