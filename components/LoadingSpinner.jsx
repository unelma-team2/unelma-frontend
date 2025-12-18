import { Box, useTheme } from "@mui/material";

export default function LoadingSpinner() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          border: "5px solid" + theme.palette.section.products.soft,
          borderTop: "5px solid" + theme.palette.section.products.vibrant,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      {/* Keyframes */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
