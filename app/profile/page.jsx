"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Box, Typography, Button } from "@mui/material";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (typeof loading === "boolean") {
      if (!loading && !user) router.push("/login");
      return;
    }
    if (user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

  return (
    <Box component="main" sx={{ p: 6, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        My Profile
      </Typography>
      <Typography sx={{ mb: 4 }}>
        Welcome, {user?.name || user?.email || "user"}.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => router.push("/profile/orders")}>
          View Orders
        </Button>
        <Button variant="outlined" onClick={() => router.push("/profile/settings")}>
          Profile Settings
        </Button>
      </Box>
    </Box>
  );
}