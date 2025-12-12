"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/context/AuthContext";
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
import CartPageHero from "./components/HeroPage";
import DeleteIcon from "@mui/icons-material/Delete";

const shippingOptions = [
  { label: "Free Delivery", description: "Delivery will be within 10-15 Days", cost: 0 },
  { label: "Standard Delivery", description: "Delivery will be within 5-10 Days.", cost: 5 },
  { label: "2-Day Delivery", description: "Delivery will be within 2 Days.", cost: 10 },
  { label: "Same Day Delivery", description: "Delivery will be within 1 Day.", cost: 20 },
];

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [shippingCost, setShippingCost] = useState(shippingOptions[0].cost);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * (Number(item.unitPrice) || 0),
    0
  );

  const taxRate = 0.24;
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + taxAmount + shippingCost;

  const handleShippingChange = (option) => {
    setSelectedShipping(option);
    setShippingCost(option.cost);
  };

  return (
    <>
      <CartPageHero />
      <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          Your Cart
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
              {cartItems.map((item) => (
                <TableRow key={item.id}>
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
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Number(e.target.value) - item.quantity
                          )
                        }
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
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    $
                    {item.unitPrice
                      ? Number(item.unitPrice).toFixed(2)
                      : "0.00"}
                  </TableCell>

                  <TableCell align="center">
                    $
                    {(item.quantity * (Number(item.unitPrice) || 0)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
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
            Service Delivery
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {shippingOptions.map((option) => (
                  <TableRow key={option.label} hover>
                    <TableCell width={40}>
                      <input
                        type="radio"
                        checked={selectedShipping.label === option.label}
                        onChange={() => handleShippingChange(option)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: selectedShipping.label === option.label ? "bold" : "normal" }}>
                        {option.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      ${option.cost} 
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax (24%)</TableCell>
                  <TableCell align="right">+ ${taxAmount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivery Cost</TableCell>
                  <TableCell align="right">
                    + ${shippingCost.toFixed(2)}
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
                router.push("/login?redirect=/checkout");
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
