'use client';

import { supabase } from "@/lib/supabase/supabase";
import { Box, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";



const Login = () => {

    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

  const createStrapiProfile = async (user) => {
    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supabase_user_id: user.id,
          username: user.user_metadata.full_name || user.email,
        }),
      });

      const data = await response.json();
      console.log('Strapi profile created:', data);
    } catch (err) {
      console.error('Error creating Strapi profile:', err);
    }
  };
  
  useEffect(() => {
    const handleLogin = async () => {
      if (user) {
        await createStrapiProfile(user); // wait for profile creation
        const redirect = searchParams.get("redirect");
        router.push(redirect || "/");
      }
    };
  
    handleLogin();
  }, [user, router, searchParams]);
  
  
    if (user) {
      return null; 
    }

        
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
            <Paper
                elevation={3}
                sx={{
                p: 4,
                maxWidth: 400,
                width: "100%",
                }}
            >
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
      ? `${window.location.origin}/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : ""}`
      : undefined
  }
/>
            </Paper>
            </Box>
        );
}


export default Login;
