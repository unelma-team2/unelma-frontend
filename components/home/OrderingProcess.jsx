"use client";

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


function CustomStepIcon(props) {
    const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        boxShadow: `-8px -6px 0px ${theme.palette.primary.red}`,
        width: 60,
        height: 60,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        zIndex: 1,
      }}
    >
      {String(props.icon)}
    </Box>
  );
}

const NullStepConnector = () => <Box sx={{ display: 'none' }} />;

export default function OrderingProcess({orderProcess}) {
    const theme = useTheme();

//     const [orderProcess, setOrderProcess] = useState([]);
//     const [error, setError] = useState(null);

//     const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unelma-backend.onrender.com";
    

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/home?populate[OrderingProcess][populate]=*`)
//       .then((res) => setOrderProcess(res.data.data?.OrderingProcess || null))
//       .catch((err) => setError(err))
//   }, [API_URL]);
  
//   if (error) return <p>Error: {error.message}</p>;
//   if (!orderProcess) return <p>No Product section found.</p>;
  
  const { number, title } = orderProcess;

  return (
    <Box 
        component="section" 
        sx={{ 
            paddingTop: { xs: 8, md: 10 }, 
            paddingBottom: { xs: 8, md: 12 },
            //backgroundColor: theme.palette.background.lightRed,
            textAlign: 'center',
            borderTop: `2px solid ${theme.palette.primary.main}`,
            marginTop: { xs: 6, md: 12 },
            boxShadow: `-10px -8px 0px ${theme.palette.background.lightRed}`,
        }}
    >
        <Container maxWidth="lg">
            <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                    marginBottom: { xs: 6, md: 8 }, 
                    fontWeight: 'bold',
                    fontSize: { xs: "2rem", md: "2.5rem" }
                }}
            > 
                Ordering Process
            </Typography>
            
            <Stepper 
                activeStep={-1}
                alternativeLabel
                connector={<NullStepConnector />}
                sx={{ 
                    width: '100%',
                    '& .MuiStep-root': {
                        paddingLeft: { xs: 0, sm: 1 },
                        paddingRight: { xs: 0, sm: 1 },
                    },
                }}
            >
                {orderProcess.map((process, i) => (
                    <Step key={process.number || i}>
                        <StepLabel 
                            StepIconComponent={CustomStepIcon}
                            sx={{ 
                                '& .MuiStepLabel-label': {
                                    marginTop: 3,
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: theme.palette.primary.main,
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
  );
}