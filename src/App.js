import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Box, Button, Container, ToggleButton, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DoneIcon from '@mui/icons-material/Done'

import { theme } from './constants/theme'
import InputRHF from "./components/RHF/InputRHF";
import { ThemeProvider } from '@mui/material/styles'
import { getIndicators } from "./services/indicators";
import { getSimulator } from "./services/simulations";
import InputMaskRHF from "./components/RHF/InputMaskRHF";
import InputCurrencyRHF from "./components/RHF/InputCurrencyRHF";
import Card from "./components/Card/Card";
import { Grafic } from "./components/Grafic/Grafic";



const mode = 'all';

const defaultValues = {
  initialContribution: '',
  period: '',
  monthlyContribution: '',
  profitability: '',
  ipca: '',
  cdi: ''
};

const schema = {
  mode,
  defaultValues,
  resolver: yupResolver(
    yup.object().shape({
      initialContribution: yup.string()
        //.typeError('O valor deve ser um número')
        .required("Aporte é obrigatório")
      //.positive("O número deve ser positivo."),
      ,
      period: yup.number("Aporte deve ser um número")
        .required('Prazo é obrigatório')
        .positive("O número deve ser positivo."),
      monthlyContribution: yup.number()
        .typeError('O valor deve ser um número')
        .required('Aporte mensal é obrigatório')
        .positive("O número deve ser positivo."),
      profitability: yup.number()
        .typeError('O valor deve ser um número')
        .required('Rentabilidade é obrigatório')
        .positive("O número deve ser positivo."),
      ipca: yup.number()
        .typeError('O valor deve ser um número')
        .required('é obrigatório')
        .positive("O número deve ser positivo."),
      cdi: yup.number()
        .typeError('O valor deve ser um número')
        .required('é obrigatório')
        .positive("O número deve ser positivo.")
    }).required()
  )
};

function App() {
  const form = useForm(schema);
  const { control, formState, handleSubmit, reset } = form;
  const [salaryType, setSalaryType] = useState('bruto');
  const [incomeType, setIncomeType] = useState('pre');

  useEffect(() => {
    getIndicators()
      .then((response) => {
        form.setValue('cdi', response.data.find(f => f.nome === 'cdi').valor);
        form.setValue('ipca', response.data.find(f => f.nome === 'ipca').valor);
      })
      .catch((error) => {
        console.log('Error ao buscar indicadores')
      })
    getSimulator()
  }, [])

  const onSubmit = () => {
    console.log(form.getValues())
  }
  const handleSalaryType = (event, newSelect) => {
    if (newSelect !== null) {
      setSalaryType(newSelect);
    }

  };

  const handleIncomeType = (event, newSelect) => {
    if (newSelect !== null) {
      setIncomeType(newSelect);
    }
  }

  return (
    <ThemeProvider theme={theme}>

      <Container
        maxWidth="xl"
        sx={{
          background: '#efefef',
          mt: 3,
          padding: 3,
          pb: 10
        }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          fontSize: '30px'
        }} variant="h4" textAlign={"center"} >
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
            mt: 2

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
                gridColumn: 'span 6',
                fontWeight: 'bold',
                fontSize: '20px'
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

              <Tooltip title="Tipo de rendimento (Bruto ou Líquido)">
                <InfoOutlinedIcon />
              </Tooltip>

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

              <Tooltip title="Tipo de indexação (PRÈ, PÒS e FIXADO)">
                <InfoOutlinedIcon />
              </Tooltip>
            </Box>

            <ToggleButtonGroup
              value={salaryType}
              exclusive
              onChange={handleSalaryType}
              touchRippleRef={salaryType}
              sx={{
                gridColumn: 'span 3'
              }}
            >
              <ToggleButton

                sx={{
                  borderBottomLeftRadius: '8px',
                  borderTopLeftRadius: '8px',
                  width: '38%',
                  borderColor: 'rgb(0,0,0) '
                }}
                value='bruto'>
                {salaryType === 'bruto' && <DoneIcon />} Bruto</ToggleButton>
              <ToggleButton

                sx={{
                  borderBottomRightRadius: '8px',
                  borderTopRightRadius: '8px',
                  width: '38%',
                  borderColor: 'rgb(0,0,0) '
                }}
                value='liquido'>
                {salaryType === 'liquido' && <DoneIcon />}Líquido</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup

              value={incomeType}
              exclusive={true}
              onChange={handleIncomeType}
              sx={{
                gridColumn: 'span 3'
              }}
            >
              <ToggleButton
                sx={{
                  borderBottomLeftRadius: '8px',
                  borderTopLeftRadius: '8px',
                  width: '23%',
                  borderColor: 'rgb(0,0,0) '
                }} value='pre' >
                {incomeType === 'pre' && <DoneIcon />}PRÉ</ToggleButton>

              <ToggleButton
                sx={{
                  width: '23%',
                  borderColor: 'rgb(0,0,0) '
                }} value='pos' >
                {incomeType === 'pos' && <DoneIcon />}PÓS</ToggleButton>

              <ToggleButton sx={{
                borderBottomRightRadius: '8px',
                borderTopRightRadius: '8px',
                width: '30%',
                borderColor: 'rgb(0,0,0) '
              }} value='fixado' >
                {incomeType === 'fixado' && <DoneIcon />}FIXADO</ToggleButton>

            </ToggleButtonGroup>

            <InputRHF
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              name='initialContribution'
              label='Aporte Inicial'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3
              }}
            />

            <InputCurrencyRHF
              name='monthlyContribution'
              label='Aporte Mensal'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3
              }}
            />
            <InputRHF
              name='period'
              label='Prazo (em meses)'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3
              }}
            />

            <InputRHF
              // mask='9999'
              name='profitability'
              label='Rentabilidade'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3
              }}
            />

            <InputRHF
              disabled
              name='ipca'
              label='IPCA (ao ano)'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3,
                mb: 4
              }}
            />
            <InputRHF
              disabled
              name='cdi'
              label='CDI (ao ano)'
              control={control}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                mt: 3,
                mb: 4
              }}
            />

            <Button
              variant="outlined"
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                height: '50px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '14px',
                borderColor: '#000000',
                color: '#000000',
                ':hover': {
                  backgroundColor: '#ed8e53',
                  color: '#000000',
                  borderColor: '#000000',
                },

              }}
              onClick={() => reset()}>
              Limpar campos
            </Button>

            <Button
              variant="contained"
              type='submit'
              disabled={!formState.isValid}
              sx={{
                gridColumn: 'span 3',
                width: '75%',
                height: '50px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#ed8e53',
                color: '#000000',
                ':hover': {
                  backgroundColor: '#ed8e53',
                  color: '#000000',
                  borderColor: '#000000',
                }
              }}
            >
              Simular
            </Button>

          </Box>

          {/* GRAFICO  */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              rowGap: 1,
              columnGap: 6,
              gridColumn: 'span 6'
            }}
          >
            <Typography
              variant="h5"
              textAlign={"left"}
              sx={{
                gridColumn: 'span 6',
                fontWeight: 'bold',
                fontSize: '20px'
              }}
            >
              Resultado da Simulação
            </Typography>

            <Card title={'Valor final Bruto'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />

            <Card title={'Alíquota do IR'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />

            <Card title={'Valor Pago em IR'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />


            <Card title={'Valor final Líquido'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />

            <Card title={'Valor Total Investido'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />

            <Card title={'Ganho Líquido'} value={'10'}
              sx={{
                gridColumn: 'span 2',
              }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                rowGap: 1,
                columnGap: 6,
                gridColumn: 'span 6'
              }}
            >
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                sx={{ gridColumn: 'span 6' }}
              >
                Projeção de Valores
              </Typography>
              <Grafic
                sx={{
                  gridColumn: 'span 6',
                }} />
            </Box>


          </Box>

        </Box>
      </Container>
    </ThemeProvider >
  );
}

export default App;
