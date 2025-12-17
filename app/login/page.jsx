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

  // try query param first; if missing, we'll read localStorage fallback below
  const paramNext = searchParams.get("next");

  // persist paramNext to localStorage so provider callbacks that drop the query still remember it
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (paramNext) {
      try {
        localStorage.setItem(STORAGE_KEY, paramNext);
      } catch (e) {
        console.warn("failed to store post-login next", e);
      }
    }
  }, [paramNext]);

  // resolve final next (param > stored > fallback "/")
  const storedNext =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const next = paramNext || storedNext || "/";

  useEffect(() => {
    // debug log to see what's happening during redirect
    console.debug("Login page state:", {
      user,
      profile,
      profileLoading,
      next,
      paramNext,
      storedNext,
    });

    if (user && profile && !profileLoading) {
      // navigate back to intended page and clear the stored next
      try {
        router.replace(next);
        if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
      } catch {
        if (typeof window !== "undefined") {
          window.location.href = next;
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, [user, profile, profileLoading, router, next, paramNext, storedNext]);

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
