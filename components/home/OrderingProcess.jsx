"use client"
import { Box, Container, Typography, Stepper, Step, StepLabel, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingSpinner from "../LoadingSpinner"

function CustomStepIcon(props) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        boxShadow: `-8px -6px 0px ${theme.palette.primary.red}`,
        width: { xs: 50, sm: 55, md: 60 },
        height: { xs: 50, sm: 55, md: 60 },
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.5rem" },
        fontWeight: "bold",
        zIndex: 1,
      }}
    >
      {String(props.icon)}
    </Box>
  )
}

const NullStepConnector = () => <Box sx={{ display: "none" }} />

export default function OrderingProcess({ orderProcess }) {
  const theme = useTheme()

  const [orderingSteps, setOrderingSteps] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${API_URL}/api/home?populate[OrderingProcess][populate]=*`)
      .then((res) => setOrderingSteps(res.data.data?.OrderingProcess || null))
      .catch((err) => setError(err))
  }, [API_URL])

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>
  if (!orderProcess) return <p>No Product section found.</p>

  const { number, title } = orderProcess

  return (
    <Box
      component="section"
      sx={{
        paddingTop: { xs: 8, md: 10 },
        paddingBottom: { xs: 8, md: 12 },
        //backgroundColor: theme.palette.background.lightRed,
        textAlign: "center",
        borderTop: `2px solid ${theme.palette.primary.main}`,
        marginTop: { xs: 6, md: 12 },
        boxShadow: `0px -8px 0px ${theme.palette.background.lightRed}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            marginBottom: { xs: 6, md: 8 },
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Ordering Process
        </Typography>

        <Stepper
          activeStep={-1}
          orientation="vertical"
          connector={<NullStepConnector />}
          sx={{
            display: { xs: "flex", md: "none" },
            "& .MuiStep-root": {
              marginBottom: 4,
            },
            "& .MuiStepLabel-root": {
              flexDirection: "row",
              alignItems: "flex-start",
            },
            "& .MuiStepLabel-iconContainer": {
              paddingRight: 2,
            },
            "& .MuiStepLabel-label": {
              fontSize: { xs: 16, sm: 17 },
              fontWeight: 700,
              color: theme.palette.primary.main,
            },
          }}
        >
          {orderingSteps.map((process, i) => (
            <Step key={process.number || i}>
              <StepLabel StepIconComponent={CustomStepIcon}>{process.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stepper
          activeStep={-1}
          orientation="horizontal"
          alternativeLabel
          connector={<NullStepConnector />}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            "& .MuiStep-root": {
              flex: 1,
            },
            "& .MuiStepLabel-root": {
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiStepLabel-labelContainer": {
              marginTop: 3,
            },
            "& .MuiStepLabel-label": {
              fontSize: 18,
              fontWeight: 700,
              color: theme.palette.primary.main,
            },
          }}
        >
          {orderingSteps.map((process, i) => (
            <Step key={process.number || i}>
              <StepLabel StepIconComponent={CustomStepIcon}>{process.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  )
}
