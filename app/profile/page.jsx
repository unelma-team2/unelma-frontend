"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; 
import { Box, Typography, Button, Paper, Grid, Avatar, Divider } from "@mui/material";
import HeroPage from "@/components/common/HeroPage";

/*
  TODO: Replace/augment this client-side display with backend profile data
  (call your /api/user-profiles route or store profile in AuthContext) when ready.
*/

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

  const name = user?.name || user?.user_metadata?.name || "";
  const email = user?.email || "";
  const phone = user?.phone || user?.user_metadata?.phone || "";
  const address = user?.address || "";
  const joined = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "";

  return (
    <>
      <HeroPage title="My Profile" compact /> {/* compact hero */}
      <Box component="main" sx={{ p: { xs: 3, md: 6 }, maxWidth: 1100, mx: "auto" }}>
        {/* removed duplicate H4 heading to avoid repetition */}
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Avatar sx={{ width: 96, height: 96, bgcolor: "primary.main", fontSize: 32 }}>
                {name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>

            <Grid item xs>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {name || email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
              {phone && (
                <Typography variant="body2" color="text.secondary">
                  {phone}
                </Typography>
              )}
              {joined && (
                <Typography variant="body2" color="text.secondary">
                  Joined: {joined}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Address
            </Typography>
            <Typography variant="body2" color={address ? "text.primary" : "text.secondary"}>
              {address || "No address on file"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={() => router.push("/profile/orders")}>
              View Orders
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}