"use client";

import { useCart } from "@/context/CartContext";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import CartPageHero from "./components/HeroPage";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  console.log(cartItems); // Debug cartItems to ensure unitPrice is present

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.quantity * (Number(item.unitPrice) || 0)),
    0
  );

  return (
    <>
      <CartPageHero />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Your Cart
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    ${item.unitPrice ? Number(item.unitPrice).toFixed(2) : "0.00"}
                  </TableCell>
                  <TableCell align="center">
                    ${(item.quantity * (Number(item.unitPrice) || 0)).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
}