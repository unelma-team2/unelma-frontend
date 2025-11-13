"use client";

import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel } from "@mui/material";

function CustomStepIcon(props) {
  return (
    <Box
      sx={{
        backgroundColor: '#C1FCFF',
        border: '2px solid #000000',
        color: '#000',
        width: 70,
        height: 70,
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
export default function OrderingProcess() {
  const steps = [
    'Register/Login',
    'Select Product or Service',
    'Submit Your Order',
    'Provide Contents',
    'Payment & Delivery',
  ];

  return (
    <Box 
        component="section" 
        sx={{ 
            paddingTop: { xs: 8, md: 10 }, 
            paddingBottom: { xs: 8, md: 12 },
            backgroundColor: '#EDFCFF',
            textAlign: 'center',
            border: '1px solid black',
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
            

        </Container>
    </Box>
  );
}