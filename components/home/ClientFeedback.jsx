import Image from "next/image";
import { Box, Typography, Paper, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const feedbacks = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewer: "Reviewer Name",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    reviewer: "Reviewer Name",
    avatar: "/avatar1.png",
  },
  {
    id: 3,
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    reviewer: "Reviewer Name",
    avatar: "/avatar1.png",
  },
];

function FeedbackCard({ text, reviewer, avatar }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: 300,
        height: 400,
        flex: "0 0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "2px solid #2F2E2E",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          mb: 2,
          width: 79,
          height: 79,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        <Image
          src="/icons/quote.svg"
          alt="quote"
          width={79}
          height={79}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          fontSize: 14,
          textAlign: "justify",
        }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 2,
          ml: 1,
          height: 50,
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            width: 50,
            height: 50,
            mr: 2,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          {reviewer}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function ClientFeedback() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#EDFCFF",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        borderRadius: "0 0 48px 48px",
        mt: { xs: 6, md: 10 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.75rem" },
          mb: 6,
        }}
      >
        Feedback From
        <br />
        Our Clients
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 10,
          justifyContent: "center",
        }}
      >
        {feedbacks.map((fb) => (
          <FeedbackCard key={fb.id} {...fb} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mt: 6,
        }}
      >
        <IconButton
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid #2F2E2E",
            bgcolor: "transparent",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <IconButton
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid #2F2E2E",
            bgcolor: "transparent",
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
