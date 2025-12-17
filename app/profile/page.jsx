"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; 
import { Box, Typography, Button, Paper, Grid, Avatar, Divider, TextField, IconButton } from "@mui/material";
import HeroPage from "@/components/common/HeroPage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function ProfilePage() {
  const router = useRouter();
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

  // Load profile data from localStorage if exists
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
    // Save profile and avatar to localStorage
    const profileToSave = { ...formData, avatar: avatarPreview };
    localStorage.setItem("profileData", JSON.stringify(profileToSave));
    setEditMode(false);
  };

  return (
    <>
      <HeroPage title="My Profile" compact />
      <Box component="main" sx={{ p: { xs: 3, md: 6 }, maxWidth: 1100, mx: "auto" }}>
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={avatarPreview || undefined}
                  sx={{ width: 96, height: 96, bgcolor: "primary.main", fontSize: 32 }}
                >
                  {formData.name ? formData.name.charAt(0).toUpperCase() : formData.email.charAt(0).toUpperCase()}
                </Avatar>
                {editMode && (
                  <IconButton
                    component="label"
                    sx={{ position: "absolute", bottom: -5, right: -5, bgcolor: "background.paper", border: "1px solid #ccc" }}
                  >
                    <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                    <PhotoCameraIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>

            <Grid item xs>
              {editMode ? (
                <>
                  <TextField fullWidth label="Name" value={formData.name} onChange={handleChange("name")} sx={{ mb: 1 }} />
                  <TextField fullWidth label="Email" value={formData.email} onChange={handleChange("email")} sx={{ mb: 1 }} />
                  <TextField fullWidth label="Phone" value={formData.phone} onChange={handleChange("phone")} sx={{ mb: 1 }} />
                  <TextField fullWidth label="Address" value={formData.address} onChange={handleChange("address")} sx={{ mb: 1 }} />
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{formData.name || formData.email}</Typography>
                  <Typography variant="body2" color="text.secondary">{formData.email}</Typography>
                  {formData.phone && <Typography variant="body2" color="text.secondary">{formData.phone}</Typography>}
                  {formData.address && <Typography variant="body2" color="text.secondary">{formData.address}</Typography>}
                  {joined && <Typography variant="body2" color="text.secondary">Joined: {joined}</Typography>}
                </>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {editMode ? (
              <>
                <Button variant="contained" onClick={handleSave}>Save</Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button variant="contained" onClick={() => router.push("/profile/orders")}>View Orders</Button>
                <Button variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
}



// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext"; 
// import { Box, Typography, Button, Paper, Grid, Avatar, Divider } from "@mui/material";
// import HeroPage from "@/components/common/HeroPage";

// /*
//   TODO: Replace/augment this client-side display with backend profile data
//   (call your /api/user-profiles route or store profile in AuthContext) when ready.
// */

// export default function ProfilePage() {
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (typeof loading === "boolean") {
//       if (!loading && !user) router.push("/login");
//       return;
//     }
//     if (user === null) {
//       router.push("/login");
//     }
//   }, [user, loading, router]);

//   if (!user) return null;

//   const name = user?.name || user?.user_metadata?.name || "";
//   const email = user?.email || "";
//   const phone = user?.phone || user?.user_metadata?.phone || "";
//   const address = user?.address || "";
//   const joined = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "";

//   return (
//     <>
//       <HeroPage title="My Profile" compact /> {/* compact hero */}
//       <Box component="main" sx={{ p: { xs: 3, md: 6 }, maxWidth: 1100, mx: "auto" }}>
//         {/* removed duplicate H4 heading to avoid repetition */}
//         <Paper sx={{ p: { xs: 2, md: 4 } }}>
//           <Grid container spacing={3} alignItems="center">
//             <Grid item xs={12} sm="auto">
//               <Avatar sx={{ width: 96, height: 96, bgcolor: "primary.main", fontSize: 32 }}>
//                 {name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
//               </Avatar>
//             </Grid>

//             <Grid item xs>
//               <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                 {name || email}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {email}
//               </Typography>
//               {phone && (
//                 <Typography variant="body2" color="text.secondary">
//                   {phone}
//                 </Typography>
//               )}
//               {joined && (
//                 <Typography variant="body2" color="text.secondary">
//                   Joined: {joined}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 3 }} />

//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
//               Address
//             </Typography>
//             <Typography variant="body2" color={address ? "text.primary" : "text.secondary"}>
//               {address || "No address on file"}
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//             <Button variant="contained" onClick={() => router.push("/profile/orders")}>
//               View Orders
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// }