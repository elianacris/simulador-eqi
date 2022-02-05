import React, { useState } from "react";

import { Box, Button, ButtonGroup, Container, IconButton, ToggleButton, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//import { getIndicators } from "./services/indicators";
//import { getSimulator } from "./services/simulations";
import InputRHF from "./components/RHF/InputRHF";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { getValue } from "@testing-library/user-event/dist/utils";

const mode = 'onSubmit';

const defaultValues = {
  initialContribution: "",
  period: "",
  monthlyContribution: "",
  profitability: "",
  ipca: "",
  cdi: ""
};

const schema = {
  mode,
  defaultValues,
  resolver: yupResolver(
    yup.object().shape({
      initialContribution: yup.number("Aporte deve ser um número").required('Aporte é obrigatório'),
      period: yup.number("Aporte deve ser um número").required('Prazo é obrigatório'),
      monthlyContribution: yup.number("Aporte deve ser um número").required('Aporte mensal é obrigatório'),
      profitability: yup.number("Aporte deve ser um número").required('Rentabilidade é obrigatório'),
      ipca: yup.number("Aporte deve ser um número").required('é obrigatório'),
      cdi: yup.number("Aporte deve ser um número").required('é obrigatório')
    }).required()
  )
};

function App() {
  const form = useForm(schema);
  const { control, handleSubmit } = form;
  const [salaryType, setSalaryType] = useState('bruto');
  const [incomeType, setIncomeType] = useState('pre')

  // useEffect(() => {
  //   getIndicators()
  //   getSimulator()
  // }, [])

  const onSubmit = () => {
    console.log(getValue)
  }
  const handleSalaryType = (event, newSelect) => {
    setSalaryType(newSelect);

  };
  const handleIncomeType = (event, newSelect) => {
    setIncomeType(newSelect);
  }

  return (
    <Container
      maxWidth="xl"
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
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        component='form'
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          rowGap: 1,
          columnGap: 2,

        }}>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            rowGap: 1,
            columnGap: 2,
            gridColumn: 'span 6'

          }}
        >

          <Typography
            variant="h5"
            textAlign={"left"}
            sx={{
              gridColumn: 'span 6'
            }}
          >
            Simulador
          </Typography>


          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            rowGap: 1,
            columnGap: 2,
            gridColumn: 'span 3'
          }}>
            <Typography
              variant="subtitle1"
              textAlign={"left"}
              sx={{ gridColumn: 'span 2' }}
            >
              Rendimento
            </Typography>

            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Box>

          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            rowGap: 1,
            columnGap: 2,
            gridColumn: 'span 3'
          }}>

            <Typography
              variant="subtitle1"
              textAlign={"left"}
              sx={{ gridColumn: 'span 2' }}
            >
              Tipos de Indexação
            </Typography>

            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Box>

          <ToggleButtonGroup
            value={salaryType}
            exclusive
            onChange={handleSalaryType}
            sx={{
              gridColumn: 'span 3'
            }}
          >
            <ToggleButton value="bruto">Bruto</ToggleButton>
            <ToggleButton value="liquido">Líquido</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={incomeType}
            exclusive
            onChange={handleIncomeType}
            sx={{
              gridColumn: 'span 3'
            }}
          >
            <ToggleButton value="pre">PRÉ</ToggleButton>
            <ToggleButton value="pos">PÓS</ToggleButton>
            <ToggleButton value="fixado">FIXADO</ToggleButton>

          </ToggleButtonGroup>

          <InputRHF
            name='initialContribution'
            label='Aporte Inicial'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />
          <InputRHF
            name='monthlyContribution'
            label='Aporte Mensal'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />
          <InputRHF
            name='period'
            label='Prazo (em meses)'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />

          <InputRHF
            name='profitability'
            label='Rentabilidade'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />

          <InputRHF
            name='ipca'
            label='IPCA (ao ano)'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />
          <InputRHF
            name='cdi'
            label='CDI (ao ano)'
            control={control}
            sx={{
              gridColumn: 'span 3'
            }}
          />

          <Button
            variant="outlined"
            sx={{
              gridColumn: 'span 3'
            }}>
            Limpar campos
          </Button>
          
          <Button
            variant="outlined"
            sx={{
              gridColumn: 'span 3'
            }}
          >
            Simular
          </Button>


        </Box>

        {/* GRAFICO  */}
        <Box
          sx={{
            gridColumn: 'span 6',
            backgroundColor: '#efe54152'
          }}
        >


        </Box>

      </Box>
    </Container>
  );
}

export default App;
