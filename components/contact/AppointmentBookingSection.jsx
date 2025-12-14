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
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const OPEN_START_HOUR = 10;
const OPEN_END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30;

// Get local ISO date string YYYY-MM-DD
function getLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Format Date object to HH:mm
function formatTime(dateObj) {
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function isWeekend(dateString) {
  const day = new Date(`${dateString}T00:00:00`).getDay();
  return day === 0 || day === 6;
}

function isOutsideOpenHours(timeString) {
  const [hourStr, minStr] = timeString.split(":");
  const hour = Number(hourStr);
  const minute = Number(minStr);
  
  if (isNaN(hour) || isNaN(minute)) return true;
  if (hour < OPEN_START_HOUR || hour > OPEN_END_HOUR) return true;
  if (hour === OPEN_END_HOUR && minute > 0) return true;
  return false;
}

function isPastDateTime(dateString, timeString) {
  const selectedDateTime = new Date(`${dateString}T${timeString}:00`);
  return selectedDateTime < new Date();
}

// Generate available slots for a day
function getAvailableSlots(dateString) {
  if (!dateString || isWeekend(dateString)) return [];
  
  const dayStart = new Date(`${dateString}T${OPEN_START_HOUR}:00:00`);
  const dayEnd = new Date(`${dateString}T${OPEN_END_HOUR}:00:00`);
  
  let currentTime = new Date(dayStart);
  if (dateString === getLocalIsoDate()) {
    const now = new Date();
    const millisecondsInSlot = SLOT_INTERVAL_MINUTES * 60 * 1000;
    const nextSlotTime = Math.ceil(now.getTime() / millisecondsInSlot) * millisecondsInSlot;
    currentTime = new Date(nextSlotTime);
    if (currentTime < dayStart) currentTime = new Date(dayStart);
  }
  
  const slots = [];
  while (currentTime < dayEnd) {
    slots.push({
      value: formatTime(currentTime),
      label: currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    });
    currentTime = new Date(currentTime.getTime() + SLOT_INTERVAL_MINUTES * 60 * 1000);
  }
  
  return slots;
}

const todayIso = getLocalIsoDate();

export default function AppointmentBookingSection({ countryCodes, appointmentBooking }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const [status, setStatus] = useState({ loading: false, message: "", error: false });
  const [bookedSlots, setBookedSlots] = useState({}); // Track booked times per date

  // Normalize backend date (MM/DD/YYYY -> YYYY-MM-DD)
  const normalizeDate = (dateStr) => {
    if (!dateStr) return "";
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month.padStart(2,"0")}-${day.padStart(2,"0")}`;
  };

  // Fetch booked slots for the selected date
  useEffect(() => {
    if (!formData.date) return;
  
    const fetchBookedSlots = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/appointment-booking-forms`, {
          params: { date: formData.date },
        });
  
        // Directly match ISO dates from backend
        const times = res.data?.data
  .filter(appt => appt.date === formData.date) // directly access `date`
  .map(appt => appt.time)
  .filter(Boolean);
  
        setBookedSlots(prev => ({ ...prev, [formData.date]: times }));
        console.log(`Booked slots for ${formData.date}:`, times); // for debugging
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
      }
    };
  
    fetchBookedSlots();
  }, [formData.date, API_URL]);
  

  const selectedCountry = countryCodes.find(cc => cc.code === formData.countryCode);

  const {
    phone_number_title,
    messaage_title,
    date_title,
    time_title,
    time_available_message,
    time_noSlot_message,
    booking_message
  } = appointmentBooking;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value, ...(field === "date" ? { time: "" } : {}) }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!formData.date) newErrors.date = "Date is required";
    else {
      const selectedDate = new Date(`${formData.date}T00:00:00`);
      const today = new Date(); today.setHours(0,0,0,0);
      if (selectedDate < today) newErrors.date = "You cannot book in the past";
      else if (isWeekend(formData.date)) newErrors.date = "Bookings run Monday to Friday only";
    }

    if (!formData.time) newErrors.time = "Select a time slot";
    else if (formData.date) {
      if (isOutsideOpenHours(formData.time)) newErrors.time = "Please pick a time between 10:00 and 17:00";
      if (isPastDateTime(formData.date, formData.time)) newErrors.time = "The selected time has already passed";

      const bookedForDate = bookedSlots[formData.date] || [];
      if (bookedForDate.includes(formData.time)) newErrors.time = "This slot is already booked";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        booking_status: "Pending",
      };

      await axios.post(`${API_URL}/api/appointment-booking-forms`, { data: payload });

      // Immediately mark this slot as booked
      setBookedSlots(prev => {
        const updated = { ...prev };
        if (!updated[formData.date]) updated[formData.date] = [];
        updated[formData.date].push(formData.time);
        return updated;
      });

      setStatus({ loading: false, message: "Appointment booked successfully!", error: false });
      setFormData({ name: "", email: "", phone: "", countryCode: "+358", message: "", date: todayIso, time: "" });

    } catch (error) {
      console.error(error.response?.data || error.message);
      setStatus({ loading: false, message: "Failed to book appointment. Please try again.", error: true });
    }
  };

  // Compute available slots with proper disabled flag
  const availableSlots = useMemo(() => {
    const slots = getAvailableSlots(formData.date);
    const bookedForDate = bookedSlots[formData.date] || [];
    return slots.map(slot => ({ ...slot, disabled: bookedForDate.includes(slot.value) }));
  }, [formData.date, bookedSlots]);

  const slotsUnavailable = formData.date && (isWeekend(formData.date) || availableSlots.length === 0);
  const labelStyle = { mb: 1, fontSize: "14px", fontWeight: 500, color: "#000" };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="body2" sx={labelStyle}>Name</Typography>
      <TextField fullWidth placeholder="Name" value={formData.name} onChange={handleChange("name")} required error={Boolean(errors.name)} helperText={errors.name} sx={{ mb: 3 }} />

      <Typography variant="body2" sx={labelStyle}>Email</Typography>
      <TextField fullWidth type="email" placeholder="you@company.com" value={formData.email} onChange={handleChange("email")} required error={Boolean(errors.email)} helperText={errors.email || "We will notify you here"} sx={{ mb: 3 }} />

      <Typography variant="body2" sx={labelStyle}>{phone_number_title}</Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select value={formData.countryCode} onChange={handleChange("countryCode")}>
            {countryCodes.map(cc => (<MenuItem key={cc.code} value={cc.code}>{cc.country}</MenuItem>))}
          </Select>
        </FormControl>
        <TextField fullWidth placeholder={selectedCountry?.format} value={formData.phone} onChange={handleChange("phone")} />
      </Box>

      <Typography variant="body2" sx={labelStyle}>{messaage_title}</Typography>
      <TextField fullWidth multiline rows={6} placeholder="Share goals, topics, or notes for the appointment" value={formData.message} onChange={handleChange("message")} required error={Boolean(errors.message)} helperText={errors.message} sx={{ mb: 3 }} />

      <Typography variant="body2" sx={labelStyle}>{date_title}</Typography>
      <TextField fullWidth type="date" value={formData.date} onChange={handleChange("date")} InputLabelProps={{ shrink: true }} inputProps={{ min: todayIso }} error={Boolean(errors.date)} helperText={errors.date || ""} sx={{ mb: 3 }} />

      <Typography variant="body2" sx={labelStyle}>{time_title}</Typography>
      <FormControl fullWidth error={Boolean(errors.time)} sx={{ mb: 3 }}>
        <Select value={formData.time} onChange={handleChange("time")} displayEmpty disabled={slotsUnavailable}>
          <MenuItem disabled value="">
            {slotsUnavailable ? "No slots available - choose a weekday" : "Select a time slot"}
          </MenuItem>
          {availableSlots.map(slot => (
            <MenuItem key={slot.value} value={slot.value} disabled={slot.disabled}>
              {slot.label} {slot.disabled ? "(Booked)" : ""}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.time || (slotsUnavailable ? time_noSlot_message : time_available_message)}</FormHelperText>
      </FormControl>

      <Typography variant="body2" sx={{ mt: 2, mb: 4, fontSize: "14px", color: "#666" }}>{booking_message}</Typography>

      <Button variant="contained" type="submit" disabled={status.loading} sx={{ mt: 2 }}>
        {status.loading ? "Booking..." : "Confirm Booking"}
      </Button>

      {status.message && (
        <Typography sx={{ mt: 2, color: status.error ? "error.main" : "success.main", fontWeight: 500 }}>
          {status.message}
        </Typography>
      )}
    </form>
  );
}
