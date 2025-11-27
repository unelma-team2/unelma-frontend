import {
    Box,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Button,
  } from "@mui/material";
  import { AttachFile } from "@mui/icons-material";
  import { useState } from "react";
  import axios from "axios";
  
  export default function MessageQuestionSection({contactForm, countryCodes}) {

    // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

    const API_URL =  "http://localhost:1337";
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      countryCode: "+358",
      message: "",
      file: null,
    });
  
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState({
      loading: false,
      message: "",
      error: false,
    });

    const selectedCountry = countryCodes.find((cc) => cc.code === formData.countryCode);

    const {message_title, attachement_title, attachement_description,phone_number_title} = contactForm;
  
    
    const handleChange = (field) => (e) => {
      if (field === "file") {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, file }));
        setFileName(file ? file.name : "");
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      }
    };
  
    
    const uploadFile = async () => {
      if (!formData.file) return null;
  
      const fileData = new FormData();
      fileData.append("files", formData.file);
  
      const uploadRes = await axios.post(`${API_URL}/api/upload`, fileData);
      return uploadRes.data[0].id; 
    };
  
    
    const handleSubmit = async () => {
      setStatus({ loading: true, message: "Sending...", error: false });
  
      try {
        let uploadedFileId = await uploadFile();
  
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          message: formData.message,
          attachement: uploadedFileId ? uploadedFileId : null,
        };
  
        const res = await axios.post(`${API_URL}/api/contact-forms`, {
          data: payload,
        });
  
        console.log("Response from Strapi:", res.data);
  
        setStatus({
          loading: false,
          message: "Message sent successfully!",
          error: false,
        });
  
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+358",
          message: "",
          file: null,
        });
  
        setFileName("");
      } catch (error) {
        console.error("Strapi error:", error.response?.data || error.message);
        setStatus({
          loading: false,
          message: "Failed to send message.",
          error: true,
        });
      }
    };
  
    return (
      <>
      <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
   Name
</Typography>
        <TextField
          fullWidth
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange("name")}
          required
          sx={{ mb: 3 }}
        />
        <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
   Email
</Typography>
  
        <TextField
          fullWidth
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange("email")}
          required
          sx={{ mb: 3 }}
        />
  
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
          >
            {phone_number_title}
          </Typography>
  
          <Box sx={{ display: "flex", gap: 1 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={formData.countryCode}
                onChange={handleChange("countryCode")}
              >
                {countryCodes.map((cc) => (
                  <MenuItem key={cc.code} value={cc.code}>
                    {cc.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <TextField
              fullWidth
              placeholder={selectedCountry?.format}
              value={formData.phone}
              onChange={handleChange("phone")}
            />
          </Box>
        </Box>
        <Typography
  variant="body2"
  sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
>
  {message_title}
</Typography>
  
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={6}
          value={formData.message}
          onChange={handleChange("message")}
          required
          sx={{ mb: 3 }}
        />
  
        
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
          >
           {attachement_title}
          </Typography>
  
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AttachFile sx={{ color: "#666", fontSize: 24 }} />
  
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              {attachement_description}
              <input type="file" hidden onChange={handleChange("file")} />
            </Button>
  
            {fileName && (
              <Typography variant="body2" sx={{ color: "#666" }}>
                {fileName}
              </Typography>
            )}
          </Box>
        </Box>
  
       
        <Button
          variant="contained"
          sx={{
            mt:3
          }}
          onClick={handleSubmit}
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Submit"}
        </Button>
  
        {status.message && (
          <Typography
            sx={{
              mt: 2,
              color: status.error ? "red" : "green",
              fontWeight: 500,
            }}
          >
<<<<<<< HEAD
            Choose file
            <input
              type="file"
              hidden
              onChange={handleChange("file")}
              accept="*/*"
            />
          </Button>
          {fileName && (
            <Typography variant="body2" sx={{ color: "#666" }}>
              {fileName}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
=======
            {status.message}
          </Typography>
        )}
      </>
    );
  }
  
>>>>>>> 9ea1e2e913f4be4fca72e75d28c95f51f4288bf5
