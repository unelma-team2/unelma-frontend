"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; 
import { Box, Typography, Button, Card, CardContent, Grid, Avatar, Divider, TextField, IconButton, useTheme } from "@mui/material";
import HeroPage from "@/components/common/HeroPage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function ProfilePage() {
  const router = useRouter();
  const theme = useTheme();
  const { user, loading } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      const data = JSON.parse(savedProfile);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });
      setAvatarPreview(data.avatar || null);
    } else if (user) {
      setFormData({
        name: user?.name || user?.user_metadata?.name || "",
        email: user?.email || "",
        phone: user?.phone || user?.user_metadata?.phone || "",
        address: user?.address || "",
      });
      setAvatarPreview(user?.avatar || null);
    }
  }, [user]);

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

  const joined = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "";

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
    }
  };

  const handleSave = () => {
    const profileToSave = { ...formData, avatar: avatarPreview };
    localStorage.setItem("profileData", JSON.stringify(profileToSave));
    setEditMode(false);
  };

  return (
    <>
      <HeroPage title="My Profile" compact />
      <Box component="main" sx={{ px: { xs: 2, md: 6 }, py: 8, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4} sx={{ display: "flex" }}>

          <Grid item xs={12} md={9.6} sx={{ flex: "0 0 60%" }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: `2px 2px 2px 2px ${theme.palette.section.products.main}`,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",

              }}
            >
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

                <Box sx={{ position: "relative", mb: 3 }}>
                  <Avatar
                    src={avatarPreview || undefined}
                    sx={{
                      width: 140,
                      height: 140,
                      bgcolor: theme.palette.section.products.soft,
                      fontSize: 48,
                      fontWeight: 700,
                      border: theme.mixins.borderStyle.border,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {formData.name ? formData.name.charAt(0).toUpperCase() : formData.email.charAt(0).toUpperCase()}
                  </Avatar>
                  {editMode && (
                    <IconButton
                      component="label"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: theme.palette.section.products.main,
                        color: "#FFFFFF",
                        border: theme.mixins.borderStyle.border,
                        width: 50,
                        height: 50,
                        transition: "all 0.25s ease",
                        "&:hover": {
                          bgcolor: theme.palette.section.products.vibrant,
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                      <PhotoCameraIcon />
                    </IconButton>
                  )}
                </Box>

                {editMode ? (
                  <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: theme.palette.background.paper,
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      variant="outlined"
                      disabled
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      value={formData.address}
                      onChange={handleChange("address")}
                      variant="outlined"
                      multiline
                      rows={3}
                    />
                  </Box>
                ) : (
                  <Box sx={{ width: "100%" }}>
                    <Typography sx={{ ...theme.typography.bodyFontTitle_L, mb: 1, color: theme.palette.primary.main }}>
                      {formData.name || "User"}
                    </Typography>
                    <Divider sx={{ my: 2, borderColor: theme.palette.section.products.soft }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, justifyContent: "center" }}>
                      <EmailIcon sx={{ color: theme.palette.section.products.main }} />
                      <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.primary.main }}>
                        {formData.email}
                      </Typography>
                    </Box>

                    {formData.phone && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, justifyContent: "center" }}>
                        <PhoneIcon sx={{ color: theme.palette.section.products.main }} />
                        <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.primary.main }}>
                          {formData.phone}
                        </Typography>
                      </Box>
                    )}

                    {formData.address && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, justifyContent: "center" }}>
                        <LocationOnIcon sx={{ color: theme.palette.section.products.main }} />
                        <Typography sx={{ ...theme.typography.bodyFont_M, color: theme.palette.primary.main }}>
                          {formData.address}
                        </Typography>
                      </Box>
                    )}

                    {joined && (
                      <>
                        <Divider sx={{ my: 2, borderColor: theme.palette.section.products.soft }} />
                        <Typography sx={{ ...theme.typography.bodyFont_S, color: theme.palette.text.secondary }}>
                          Member since {joined}
                        </Typography>
                      </>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={2.4} sx={{ flex: "0 0 25%" }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: `2px 2px 2px 2px ${theme.palette.section.shopOrder.main}`,

              }}
            >
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <PersonIcon sx={{ color: theme.palette.section.shopOrder.main, fontSize: 28 }} />
                    <Typography sx={{ ...theme.typography.bodyFontTitle_L, color: theme.palette.primary.main }}>
                      Account Settings
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: theme.palette.section.shopOrder.soft }} />

                  {editMode ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Button
                        onClick={handleSave}
                        sx={{
                          py: 1.5,
                          backgroundColor: theme.palette.section.products.soft,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setEditMode(false)}
                        sx={{
                          py: 1.5,
                          backgroundColor: theme.palette.section.products.soft,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Button
                        onClick={() => router.push("/profile/orders")}
                        sx={{
                          py: 1.5,
                          display: "flex",
                          gap: 1,
                          backgroundColor: theme.palette.section.products.soft,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.section.products.pastel,
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <ShoppingBagIcon />
                        View Orders
                      </Button>
                      <Button
                        onClick={() => setEditMode(true)}
                        sx={{
                          py: 1.5,
                          display: "flex",
                          gap: 1,
                          backgroundColor: theme.palette.section.products.soft,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.section.products.pastel,
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <PersonIcon />
                        Edit Profile
                      </Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}