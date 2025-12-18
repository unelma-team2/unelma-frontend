"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Grid, Card, CardContent, Chip, Divider, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useUserProfile } from "@/app/context/UserContext";
import HeroPage from "@/components/common/HeroPage";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios";

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export default function OrdersPage() {
  const router = useRouter();
  const theme = useTheme();
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "completed":
        return theme.palette.section.feedback.main;
      case "processing":
      case "pending":
        return theme.palette.section.careers.main;
      case "shipped":
        return theme.palette.section.shopOrder.main;
      case "cancelled":
        return theme.palette.section.contact.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  if (!user || profileLoading || loading) {
    return <Typography sx={{ textAlign: "center", mt: 8 }}>Loading...</Typography>;
  }

  return (
    <>
      <HeroPage title="My Orders" compact />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 1, maxWidth: 1200, mx: "auto" }}>
        {/* Back button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" , pb: 2}}>
          <Button onClick={() => router.push("/profile")}>
            Back to Dashboard
          </Button>
        </Box>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <ShoppingBagIcon sx={{ fontSize: 80, color: theme.palette.section.feedback.soft, mb: 2 }} />
            <Typography 
              sx={{ 
                ...theme.typography.bodyFontTitle_L, 
                mb: 2,
                color: theme.palette.primary.main 
              }}
            >
              You have no orders yet.
            </Typography>
            <Typography sx={{ ...theme.typography.bodyFont_M, mb: 4, color: theme.palette.text.secondary }}>
              Start shopping to see your orders here!
            </Typography>
            <Button onClick={() => router.push("/products")}>
              Shop Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: `-8px -6px 0px ${theme.palette.section.feedback.main}`,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `-10px -8px 0px ${theme.palette.section.feedback.vibrant}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Order Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ReceiptIcon sx={{ color: theme.palette.section.feedback.main }} />
                        <Typography sx={{ ...theme.typography.bodyFontTitle_M_Card, color: theme.palette.primary.main }}>
                          #{order.order_id}
                        </Typography>
                      </Box>
                      <Chip 
                        label={order.order_status || "Pending"} 
                        size="small"
                        sx={{ 
                          backgroundColor: getStatusColor(order.order_status),
                          color: "#FFFFFF",
                          fontWeight: 600,
                          border: theme.mixins.borderStyle.border,
                          px: 1
                        }}
                      />
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: theme.palette.text.primary }} />

                    {/* Order Items */}
                    <Box sx={{ mb: 2, flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <ShoppingBagIcon sx={{ fontSize: 18, color: theme.palette.section.feedback.main }} />
                        <Typography sx={{ ...theme.typography.bodyFontTitle_S, color: theme.palette.primary.main }}>
                          Items
                        </Typography>
                      </Box>
                      {order.order_items && order.order_items.length > 0 ? (
                        <Box sx={{ pl: 1 }}>
                          {order.order_items.map((item) => (
                            <Box 
                              key={item.documentId}
                              sx={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                py: 0.5,
                                borderBottom: `1px solid ${theme.palette.section.feedback.soft}`,
                                "&:last-child": { borderBottom: "none" }
                              }}
                            >
                              <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.primary.main }}>
                                {item.product_name} <span style={{ color: theme.palette.text.secondary }}>× {item.quantity}</span>
                              </Typography>
                              <Typography sx={{ ...theme.typography.bodyFont_M, fontWeight: 600, color: theme.palette.primary.main }}>
                                ${item.subTotal.toFixed(2)}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.text.secondary, pl: 1 }}>
                          No items in this order.
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: theme.palette.text.primary }} />

                    {/* Delivery Info */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <LocalShippingIcon sx={{ fontSize: 18, color: theme.palette.section.feedback.main }} />
                        <Typography sx={{ ...theme.typography.bodyFont_M, fontWeight: 600, color: theme.palette.primary.main }}>
                          {order.delivery_type}
                        </Typography>
                        <Typography sx={{ ...theme.typography.bodyFont_M, ml: "auto", color: theme.palette.primary.main }}>
                          ${order.delivery_cost?.toFixed(2) || "0.00"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: theme.palette.text.primary }} />

                    {/* Payment & Total */}
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <PaymentIcon sx={{ fontSize: 18, color: theme.palette.section.feedback.main }} />
                        <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.primary.main }}>
                          {order.payment_method}
                        </Typography>
                      </Box>
                      
                      <Box 
                        sx={{ 
                          display: "flex", 
                          justifyContent: "space-between",
                          p: 2,
                          backgroundColor: theme.palette.section.feedback.soft,
                          borderRadius: 2,
                          border: theme.mixins.borderStyle.border
                        }}
                      >
                        <Typography sx={{ ...theme.typography.bodyFontTitle_S, color: theme.palette.primary.main }}>
                          Total
                        </Typography>
                        <Typography 
                          sx={{ 
                            ...theme.typography.bodyFontTitle_S, 
                            fontWeight: 700,
                            color: theme.palette.section.feedback.main 
                          }}
                        >
                          ${order.total?.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
