import React, { useEffect } from "react";

import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import { getIndicators } from "./services/indicators";
import { getSimulator } from "./services/simulations";

function App() {
  useEffect(() => {
    getIndicators()
    getSimulator()
  }, [])

  return (
    <Container
      maxWidth="lg"
      sx={{
        background: '#efefef',
        mt: 3,
        padding: 3
      }}
    >
      <Typography variant="h4" textAlign={"center"} >
        Simulador de Investimentos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          rowGap: 1,
          columnGap: 2,

        }}>


      </Box>
    </Container>
  );
}

export default App;
