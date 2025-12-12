"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import MoneyOffOutlinedIcon from "@mui/icons-material/MoneyOffOutlined";


const OPEN_START_HOUR = 10;
const OPEN_END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30;

const todayIso = getLocalIsoDate();

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    message: "",
    date: todayIso,
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [lastBooking, setLastBooking] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const availableSlots = useMemo(
    () => getAvailableSlots(formData.date),
    [formData.date]
  );

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "date" ? { time: "" } : {}),
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    const selectedDate = formData.date ? new Date(`${formData.date}T00:00:00`) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.gender) validationErrors.gender = "Select a gender option";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const confirmationId = `APT-${Math.floor(Math.random() * 90000 + 10000)}`;
    setLastBooking({
      ...formData,
      confirmationId,
      status: "Booked - remote & free",
    });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const slotsUnavailable =
    formData.date && (isWeekend(formData.date) || availableSlots.length === 0);

  return (
    <Box sx={{ pb: 6 }}>
      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Book a Remote Appointment
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640 }}>
            Schedule a free remote consultation during our open hours. We will send
            you a confirmation and calendar invite right after booking.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }} alignItems="center">
            <Chip
              icon={<PublicOutlinedIcon />}
              label="Remote only"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<MoneyOffOutlinedIcon />}
              label="Always free"
              color="success"
              variant="outlined"
            />
            <Chip icon={<AccessTimeIcon />} label="Mon - Fri, 10AM - 5PM" />
          </Stack>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            border: "1px solid",
            borderColor: "divider",
            minWidth: 260,
          }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography fontWeight={700}>Open Hours</Typography>
            </Stack>
            <Typography variant="body2">
              Monday - Friday, 10:00 to 17:00 (local time)
            </Typography>
            <Typography variant="body2">
              Same-day bookings are available if slots are still open.
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper
            component="form"
            noValidate
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Stack spacing={2} divider={<Divider />}>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                  Appointment details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      error={Boolean(errors.email)}
                      helperText={errors.email || "We will notify you here"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.gender)}>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        label="Gender"
                        value={formData.gender}
                        onChange={handleChange("gender")}
                      >
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="nonbinary">Non-binary</MenuItem>
                        <MenuItem value="prefer-not">Prefer not to say</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message / agenda"
                      multiline
                      minRows={3}
                      value={formData.message}
                      onChange={handleChange("message")}
                      error={Boolean(errors.message)}
                      helperText={errors.message || "Share goals, topics, or notes"}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                  Pick date & time
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange("date")}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: todayIso }}
                      error={Boolean(errors.date)}
                      helperText={
                        errors.date || "Monday to Friday only; past dates disabled"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(errors.time)}>
                      <InputLabel id="time-label">Time</InputLabel>
                      <Select
                        labelId="time-label"
                        label="Time"
                        value={formData.time}
                        onChange={handleChange("time")}
                        disabled={slotsUnavailable}
                      >
                        {availableSlots.map((slot) => (
                          <MenuItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.time ||
                          (slotsUnavailable
                            ? "No slots: choose a weekday between 10:00 and 17:00"
                            : "Times adjust automatically for today")}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="body2" color="text.secondary">
                  By booking you confirm this is a remote, free consultation. We
                  will send a calendar invite and reminder to your email.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  startIcon={<EventAvailableIcon />}
                  sx={{backgroundColor: '#5662e3ff'}}
                >
                  Confirm booking
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={2.5}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <NotificationsActiveIcon fontSize="small" />
                  <Typography fontWeight={700}>Booking preview</Typography>
                </Stack>
                {lastBooking ? (
                  <Stack spacing={0.75}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {lastBooking.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lastBooking.email}
                    </Typography>
                    <Typography variant="body2">
                      {renderDateLabel(lastBooking.date)} at{" "}
                      {formatTimeLabel(lastBooking.time)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lastBooking.message}
                    </Typography>
                    <Chip
                      label={`${lastBooking.status} • ID ${lastBooking.confirmationId}`}
                      color="success"
                      variant="outlined"
                      sx={{ alignSelf: "flex-start" }}
                    />
                    <Alert severity="info" sx={{ mt: 1 }}>
                      Notification sent to {lastBooking.email}. Add the invite to
                      your calendar.
                    </Alert>
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Your details and confirmation will appear here after you book.
                  </Typography>
                )}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Stack spacing={1.5}>
                <Typography fontWeight={700}>What to expect</Typography>
                <Typography variant="body2">
                  • Remote video/voice call (free of charge)
                </Typography>
                <Typography variant="body2">
                  • Agenda tailored to your message
                </Typography>
                <Typography variant="body2">
                  • Email confirmation + reminder before the slot
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Booking confirmed! We just sent your remote, free appointment details.
        </Alert>
      </Snackbar>
    </Box>
  );
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


function renderDateLabel(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}


function formatTimeLabel(timeValue) {
  if (!timeValue) return "";
  const [hours, minutes] = timeValue.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}


function getLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

