"use client"
import { Box, Container, Typography, Stepper, Step, StepLabel, useTheme } from "@mui/material"

function CustomStepIcon(props) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.section.shopOrder.soft,
        border: theme.mixins.borderStyle,
        color: theme.palette.text.primary,
        boxShadow: `-4px -3px 0px ${theme.palette.section.shopOrder.main }`,
        width: { xs: 50, md: 60 },
        height: { xs: 50, md: 60 },
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        ...theme.typography.bodyFontTitle_L,
        fontWeight: 700,
        zIndex: 1,
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: `inset -4px -3px 0px ${theme.palette.section.shopOrder.main }`,
          transform: "scale(1.05)",
        },
      }}
    >
      {String(props.icon)}
    </Box>
  )
}

const NullStepConnector = () => <Box sx={{ display: "none" }} />

export default function OrderProcess({ orderProcess }) {
  const theme = useTheme()

  const processSteps = orderProcess || [
    { number: 1, title: "Choose Product" },
    { number: 2, title: "Customize" },
    { number: 3, title: "Place Order" },
    { number: 4, title: "Delivery" },
  ]

  return (
    <Box
      component="section"
      sx={{
        paddingTop: { xs: 6, md: 10 },
        paddingBottom: { xs: 4, md: 6 },
        px: { xs: 2, md: "120px" },
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        borderTop: theme.mixins.borderStyle,
        borderBottom: "none",
        marginTop: { xs: 6, md: 12 },
        boxShadow: `0px -4px 0px ${theme.palette.section.shopOrder.pastel}, 0px -12px 0px ${theme.palette.section.shopOrder.main }`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            ...theme.typography.headingFont_S,
            color: theme.palette.text.primary,
            marginBottom: { xs: 6, md: 12 },
            paddingTop: { xs: 2, md: 4 },
          }}
        >
          Ordering Process
        </Typography>

        <Stepper
          activeStep={-1}
          alternativeLabel
          connector={<NullStepConnector />}
          sx={{
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "flex-start",
            "& .MuiStep-root": {
              paddingLeft: { xs: 2, sm: 1, md: 2 },
              paddingRight: { xs: 2, sm: 1, md: 2 },
              paddingTop: { xs: 2, sm: 0 },
              paddingBottom: { xs: 2, sm: 0 },
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {processSteps.map((process, i) => (
            <Step key={process.number || i}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  flexDirection: { xs: "row", sm: "column" },
                  textAlign: "center",
                  alignItems: { xs: "flex-start", sm: "center" },
                  "& .MuiStepLabel-iconContainer": {
                    paddingRight: { xs: 3, sm: 0 },
                    flexShrink: 0,
                  },
                  "& .MuiStepLabel-label": {
                    ...theme.typography.bodyFontTitle_S,
                    color: theme.palette.text.primary,
                    marginTop: { xs: 0, sm: 3 },
                    textAlign: "center",
                    width: "100%",
                  },
                }}
              >
                {process.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  )
}
