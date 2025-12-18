"use client";

import { Box, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProfile } from "../context/UserContext";
import { supabase } from "@/lib/supabase/supabase";

const STORAGE_KEY = "post_login_next";

const Login = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramNext = searchParams.get("next");

  useEffect(() => {
    if (!paramNext) return;
    localStorage.setItem(STORAGE_KEY, paramNext);
  }, [paramNext]);

  const storedNext =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

  const next = paramNext || storedNext || "/";

  useEffect(() => {
    if (!user) return;
    if (profileLoading) return;

    router.replace(next);
    localStorage.removeItem(STORAGE_KEY);
  }, [user, profileLoading, next, router]);

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
        backgroundColor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: "100%" }}>
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
                  brand: "#1f2a44",
                  brandAccent: "#15203a",
                },
              },
            },
          }}
          providers={["google", "github", "linkedin_oidc", "facebook"]}
          socialLayout="vertical"
          view="sign_in"
          // keep redirectTo pointing at this page and let localStorage preserve next across provider callback
          redirectTo={
            typeof window !== "undefined"
              ? `${window.location.origin}/login${
                  paramNext ? `?next=${encodeURIComponent(paramNext)}` : ""
                }`
              : undefined
          }
        />
      </Paper>
    </Box>
  );
};

export default Login;
