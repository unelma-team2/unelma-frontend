"use client";

import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { useState, useMemo } from "react";
import axios from "axios";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";


const OPEN_START_HOUR = 10;
const OPEN_END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30;

function getLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getAvailableSlots(dateValue) {
  if (!dateValue || isWeekend(dateValue)) return [];
  const start = new Date(`${dateValue}T00:00:00`);
  const end = new Date(`${dateValue}T00:00:00`);
  start.setHours(OPEN_START_HOUR, 0, 0, 0);
  end.setHours(OPEN_END_HOUR, 0, 0, 0);

  const slots = [];
  let cursor = new Date(start);

  if (isToday(dateValue)) {
    const now = new Date();
    const nextSlotMs =
      Math.ceil(now.getTime() / (SLOT_INTERVAL_MINUTES * 60 * 1000)) *
      SLOT_INTERVAL_MINUTES *
      60 *
      1000;
    const nextSlot = new Date(nextSlotMs);
    if (nextSlot > cursor) cursor = nextSlot;
  }

  while (cursor < end) {
    slots.push({
      value: toTimeValue(cursor),
      label: cursor.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
    cursor = new Date(cursor.getTime() + SLOT_INTERVAL_MINUTES * 60 * 1000);
  }

  return slots;
}

function isWeekend(dateValue) {
  const day = new Date(`${dateValue}T00:00:00`).getDay();
  return day === 0 || day === 6;
}

function isToday(dateValue) {
  return dateValue === getLocalIsoDate();
}

function toTimeValue(dateObj) {
  const hours = `${dateObj.getHours()}`.padStart(2, "0");
  const minutes = `${dateObj.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function isPastDateTime(dateValue, timeValue) {
  const selected = new Date(`${dateValue}T${timeValue}:00`);
  return selected < new Date();
}

function isOutsideOpenHours(timeValue) {
  const [hStr, mStr] = timeValue.split(":");
  const hours = Number(hStr);
  const minutes = Number(mStr);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return true;
  if (hours < OPEN_START_HOUR) return true;
  if (hours > OPEN_END_HOUR) return true;
  return hours === OPEN_END_HOUR && minutes > 0;
}

const todayIso = getLocalIsoDate();

export default function AppointmentBookingSection({ countryCodes }) {
  const API_URL = "http://localhost:1337";
  // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+358",
    message: "",
    date: todayIso,
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const availableSlots = useMemo(
    () => getAvailableSlots(formData.date),
    [formData.date]
  );

  const selectedCountry = countryCodes.find(
    (cc) => cc.code === formData.countryCode
  );

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "date" ? { time: "" } : {}),
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    const selectedDate = formData.date ? new Date(`${formData.date}T00:00:00`) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.message.trim()) validationErrors.message = "Message is required";
    if (!formData.date) {
      validationErrors.date = "Date is required";
    } else {
      if (selectedDate < today) {
        validationErrors.date = "You cannot book in the past";
      }
      if (isWeekend(formData.date)) {
        validationErrors.date = "Bookings run Monday to Friday only";
      }
    }

    if (!formData.time) {
      validationErrors.time = "Select a time slot";
    } else if (formData.date) {
      if (isOutsideOpenHours(formData.time)) {
        validationErrors.time = "Please pick a time between 10:00 and 17:00";
      }
      if (isPastDateTime(formData.date, formData.time)) {
        validationErrors.time = "The selected time has already passed";
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ loading: true, message: "Booking appointment...", error: false });

    try {
      const confirmationId = `APT-${Math.floor(Math.random() * 90000 + 10000)}`;
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        message: formData.message,
        date: formData.date,
        time: formData.time,
        confirmationId,
        status: "Booked - remote & free",
      };

      const res = await axios.post(`${API_URL}/api/appointment-bookings`, {
        data: payload,
      });

      console.log("Response from Strapi:", res.data);

      setStatus({
        loading: false,
        message: "Appointment booked successfully! We will send you a confirmation email shortly.",
        error: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+358",
        message: "",
        date: todayIso,
        time: "",
      });
    } catch (error) {
      console.error("Strapi error:", error.response?.data || error.message);
      setStatus({
        loading: false,
        message: "Failed to book appointment. Please try again.",
        error: true,
      });
    }
  };

  const slotsUnavailable =
    formData.date && (isWeekend(formData.date) || availableSlots.length === 0);

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        variant="body2"
        sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
      >
        Name
      </Typography>

      <TextField
        fullWidth
        placeholder="Name"
        value={formData.name}
        onChange={handleChange("name")}
        required
        error={Boolean(errors.name)}
        helperText={errors.name}
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
        type="email"
        placeholder="you@company.com"
        value={formData.email}
        onChange={handleChange("email")}
        required
        error={Boolean(errors.email)}
        helperText={errors.email || "We will notify you here"}
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
        >
          Phone Number
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
        Message / Agenda
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Share goals, topics, or notes for the appointment"
        value={formData.message}
        onChange={handleChange("message")}
        required
        error={Boolean(errors.message)}
        helperText={errors.message}
        sx={{ mb: 3 }}
      />

      <Typography
        variant="body2"
        sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
      >
        Date
      </Typography>

      <TextField
        fullWidth
        type="date"
        value={formData.date}
        onChange={handleChange("date")}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: todayIso }}
        error={Boolean(errors.date)}
        helperText={errors.date || ""}
        sx={{ mb: 3 }}
      />

      <Typography
        variant="body2"
        sx={{ mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" }}
      >
        Time
      </Typography>

      <FormControl fullWidth error={Boolean(errors.time)} sx={{ mb: 3 }}>
        <Select
          value={formData.time}
          onChange={handleChange("time")}
          displayEmpty
          disabled={slotsUnavailable}
        >
          <MenuItem disabled value="">
            {slotsUnavailable
              ? "No slots available - choose a weekday"
              : "Select a time slot"}
          </MenuItem>
          {availableSlots.map((slot) => (
            <MenuItem key={slot.value} value={slot.value}>
              {slot.label}
            </MenuItem>
          ))}
        </Select>
        {errors.time && <FormHelperText>{errors.time}</FormHelperText>}
        {!errors.time && (
          <FormHelperText>
            {slotsUnavailable
              ? "No slots: choose a weekday between 10:00 and 17:00"
              : "Available times between 10:00 and 17:00"}
          </FormHelperText>
        )}
      </FormControl>

      <Typography
        variant="body2"
        sx={{ mt: 2, mb: 4, fontSize: "14px", color: "#666" }}
      >
        This is a remote, free consultation. We will send a reminder to your email.
      </Typography>

      <Button
        variant="contained"
        type="submit"
        disabled={status.loading}
        startIcon={<EventAvailableIcon />}
        sx={{ mt: 2 }}
      >
        {status.loading ? "Booking..." : "Confirm Booking"}
      </Button>

      {status.message && (
        <Typography
          sx={{
            mt: 2,
            color: status.error ? "error.main" : "success.main",
            fontWeight: 500,
          }}
        >
          {status.message}
        </Typography>
      )}
    </form>
  );
}
