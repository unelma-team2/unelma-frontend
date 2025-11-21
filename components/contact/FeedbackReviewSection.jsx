import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Rating,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

export default function FeedbackReviewSection({
  formData,
  handleChange,
  countryCodes,
  selectedCountry,
  feedbackTypes,
  feedbackServices,
  products,
  handleRatingChange,
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

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="feedback-type-label">
          I want to review/leave feedback for
        </InputLabel>
        <Select
          labelId="feedback-type-label"
          id="feedback-type"
          value={formData.feedbackType}
          label="I want to review/leave feedback for"
          onChange={handleChange("feedbackType")}
          sx={{
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000",
            },
          }}
        >
          {feedbackTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
              {type === "Other" && " (specify below)"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.feedbackType && formData.feedbackType !== "Other" && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="service-product-label">Choose service/product</InputLabel>
          <Select
            labelId="service-product-label"
            id="service-product"
            value={formData.selectedServiceOrProduct}
            label="Choose service/product"
            onChange={handleChange("selectedServiceOrProduct")}
            sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            }}
          >
            {formData.feedbackType === "Service" &&
              feedbackServices.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            {formData.feedbackType === "Product" &&
              products.map((product) => (
                <MenuItem key={product} value={product}>
                  {product}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

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
          Please rate your experience
        </Typography>
        <Rating
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          max={5}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#2F2E2E",
            },
            "& .MuiRating-iconEmpty": {
              color: "#ccc",
            },
          }}
        />
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
          Your feedback/review
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Tell us a little about your experience"
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
          My rating/review can be published on the Unelma Platforms website
        </Typography>
        <RadioGroup
          row
          value={formData.canBePublished}
          onChange={handleChange("canBePublished")}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={{ color: "#000" }} />}
            label="Yes"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#000",
              },
            }}
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={{ color: "#000" }} />}
            label="No"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#000",
              },
            }}
          />
        </RadioGroup>
      </Box>

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
          Do you wish to be contacted by Unelma Platforms about your feedback?
        </Typography>
        <RadioGroup
          row
          value={formData.wishToBeContacted}
          onChange={handleChange("wishToBeContacted")}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={{ color: "#000" }} />}
            label="Yes"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#000",
              },
            }}
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={{ color: "#000" }} />}
            label="No"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#000",
              },
            }}
          />
        </RadioGroup>
      </Box>
    </>
  );
}

