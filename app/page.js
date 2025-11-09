"use client";
import { Button, Typography, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h2" color="primary">
        Welcome to Unelma Platforms
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={2}>
        Frontend theme and MUI setup test
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
        Test Button
      </Button>
    </Box>
  );
}
