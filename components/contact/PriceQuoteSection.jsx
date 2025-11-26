import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";

export default function PriceQuoteSection({
  formData,
  handleChange,
  countryCodes,
  selectedCountry,
  services,
  fileName,
}) {
  return (
    <>
      <TextField
        fullWidth
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        sx={{ mb: 3 }}
      />

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
          sx={{
            mb: 1,
            fontSize: "14px",
            fontWeight: 500,
            color: "#000",
          }}
        >
          Phone number (optional)
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={formData.countryCode}
              onChange={handleChange("countryCode")}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
              }}
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
            placeholder={selectedCountry?.format || "+ 358 (0) 00-0000000"}
            value={formData.phone}
            onChange={handleChange("phone")}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            fontSize: "14px",
            fontWeight: 500,
            color: "#000",
          }}
        >
          Choose the services you are interested in
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          {services.map((service) => (
            <FormControlLabel
              key={service}
              control={
                <Checkbox
                  checked={formData.selectedServices.includes(service)}
                  onChange={handleChange("selectedServices")}
                  value={service}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
              }
              label={service}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#000",
                  ml: 1,
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,
            fontSize: "14px",
            fontWeight: 500,
            color: "#000",
          }}
        >
          How can we help?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Tell us a little about your project/need for our services"
          value={formData.message}
          onChange={handleChange("message")}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#999",
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: "14px",
            fontWeight: 500,
            color: "#000",
          }}
        >
          Add file (accepted filetypes)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AttachFile sx={{ color: "#666", fontSize: 24 }} />
          <Button
            variant="outlined"
            component="label"
            sx={{
              borderColor: "#ccc",
              color: "#666",
              textTransform: "none",
              backgroundColor: "#f5f5f5",
              "&:hover": {
                borderColor: "#999",
                backgroundColor: "#e8e8e8",
              },
            }}
          >
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