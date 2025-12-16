'use client';

import { Box, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProfile } from "../context/UserContext";
import { supabase } from "@/lib/supabase/supabase";

const Login = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user && profile && !profileLoading) {
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    }
  }, [user, profile, profileLoading, router, searchParams]);

  if (user && profileLoading) return null;
  if (user && profile) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Welcome
        </Typography>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1976d2",
                  brandAccent: "#1565c0",
                },
              },
            },
          }}
          providers={["google", "github", "linkedin_oidc", "facebook"]}
          socialLayout="vertical"
          view="sign_in"
          redirectTo={
            typeof window !== "undefined"
              ? `${window.location.origin}/login${
                  searchParams.get("redirect")
                    ? `?redirect=${encodeURIComponent(searchParams.get("redirect"))}`
                    : ""
                }`
              : undefined
          }
        />
      </Paper>
    </Box>
  );
};

export default Login;
