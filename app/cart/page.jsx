"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CartPageHero from "@/components/common/HeroPage";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    setSelectedShipping,
    selectedShipping,
  } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const [banner, setBanner] = useState(null);
  const [delivery, setDelivery] = useState([]); // array
  const [orderSummary, setOrderSummary] = useState(null);

  const [cartTitle, setCartTitle] = useState("");
  const [serviceDeliveryTitle, setServiceDeliveryTitle] = useState("");

  // const [shippingCost, setShippingCost] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(
        `${API_URL}/api/cart-page?populate[CartBannerSection][populate]=*&populate[ServiceDelivery]=*&populate[OrderSummary]=*`
      )
      .then((res) => {
        const data = res.data?.data || {};

        setBanner(data.CartBannerSection || null);
        setDelivery(data.ServiceDelivery || null);
        setOrderSummary(data.OrderSummary || null);
        setCartTitle(data.cart_title || "Your Cart");
        setServiceDeliveryTitle(
          data.serviceDelivery_title || "Service Delivery"
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [API_URL]);

  useEffect(() => {
    if (!delivery || delivery.length === 0) return;

    const saved = localStorage.getItem("selectedShipping");

    if (saved) {
      setSelectedShipping(JSON.parse(saved));
    } else {
      setSelectedShipping(delivery[0]); // default to first option
    }
  }, [delivery, setSelectedShipping]);

  const { banner_title, banner_image } = banner || {};
  const {
    summary_title,
    subTotal_title,
    tax_title,
    deliveryCost_title,
    total_title,
  } = orderSummary || {};

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * (Number(item.unitPrice) || 0),
    0
  );

  const taxRate = 0.24;
  const taxAmount = totalPrice * taxRate;
  const shippingCost = Number(selectedShipping?.cost || 0); // read from context
  const grandTotal = totalPrice + taxAmount + shippingCost;

  const handleShippingChange = (option) => {
    setSelectedShipping(option);
    localStorage.setItem("selectedShipping", JSON.stringify(option));
  };

  return (
    <>
      <CartPageHero title={banner_title} image={banner_image} />
      <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          {cartTitle}
        </Typography>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Subtotal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) => {
                // prefer server documentId when available (stable for logged-in users)
                const itemKey = item.documentId ?? item.productId ?? item.id;

                return (
                  <TableRow key={itemKey}>
                    <TableCell>{item.name}</TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Math.max(
                              1,
                              Number(e.target.value || 1)
                            );
                            updateQuantity(itemKey, val);
                          }}
                          inputProps={{
                            min: 1,
                            style: { textAlign: "center", width: 60 },
                          }}
                          size="small"
                        />

                        <IconButton
                          aria-label="delete"
                          size="small"
                          sx={{
                            ml: 1,
                            backgroundColor: "transparent",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                              border: "1.5px solid black",
                            },
                          }}
                          onClick={() => removeFromCart(itemKey)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      ${Number(item.unitPrice || 0).toFixed(2)}
                    </TableCell>

                    <TableCell align="center">
                      $
                      {(item.quantity * Number(item.unitPrice || 0)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>

        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            mb: { xs: 3, md: 5 },
            p: { xs: 1, sm: 2 },
            backgroundColor: "#fafafa",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {serviceDeliveryTitle}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {delivery.map((option) => (
                  <TableRow key={option.id} hover>
                    <TableCell width={40}>
                      <input
                        type="radio"
                        checked={selectedShipping?.id === option.id}
                        onChange={() => handleShippingChange(option)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight:
                            selectedShipping?.id === option.id
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {option.delivery_type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.delivery_description}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      ${Number(option.cost).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {summary_title}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{subTotal_title}</TableCell>
                  <TableCell align="right">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{tax_title}</TableCell>
                  <TableCell align="right">+ ${taxAmount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{deliveryCost_title}</TableCell>
                  <TableCell align="right">
                    + ${Number(selectedShipping?.cost || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ${grandTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, minWidth: 200, width: { xs: "100%", sm: "auto" } }}
            onClick={() => {
              if (!user) {
                router.push("/login?next=/checkout");
              } else {
                router.push("/checkout");
              }
            }}
          >
            Process To Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
}
