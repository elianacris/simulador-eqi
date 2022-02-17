import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, Container, ToggleButton, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DoneIcon from '@mui/icons-material/Done'

import { theme } from './constants/theme'
import { getIndicators } from "./services/indicators";
import { getSimulator } from "./services/simulations";
import InputRHF from "./components/RHF/InputRHF";
import InputPercentageRHF from "./components/RHF/InputPercentageRHF";
import InputCurrencyRHF from "./components/RHF/InputCurrencyRHF";
import Card from "./components/Card/Card";
import { Grafic } from "./components/Grafic/Grafic";
import simulationSchemaValidation from "./util/simulationSchemaValidator";


function App() {
  const form = useForm(simulationSchemaValidation);
  const { control, formState, handleSubmit, reset } = form;
  const [salaryType, setSalaryType] = useState('bruto');
  const [incomeType, setIncomeType] = useState('pre');

  const [result, setResult] = useState({
    valorFinalBruto: 0,
    aliquotaIR: 0,
    valorPagoIR: 0,
    valorTotalInvestido: 0,
    valorFinalLiquido: 0,
    ganhoLiquido: 0,
    graficoValores: {}
  });

  useEffect(() => {
    indicators();
  }, [])

  const indicators = () => {
    getIndicators()
      .then((response) => {
        form.setValue('cdi', response.data.find(f => f.nome === 'cdi').valor);
        form.setValue('ipca', response.data.find(f => f.nome === 'ipca').valor);
      })
      .catch(() => {
        console.log('Error ao buscar indicadores')
      })
  }

  const onSubmit = () => {
    getSimulator(incomeType, salaryType)
      .then((response) => {

        setResult({
          valorFinalBruto: response.data[0].valorFinalBruto,
          aliquotaIR: response.data[0].aliquotaIR,
          valorPagoIR: response.data[0].valorPagoIR,
          valorTotalInvestido: response.data[0].valorTotalInvestido,
          valorFinalLiquido: response.data[0].valorFinalLiquido,
          ganhoLiquido: response.data[0].ganhoLiquido,
          graficoValores: {
            labels: Object.keys(response.data[0].graficoValores.comAporte),
            dataSetComAporte: Object.values(response.data[0].graficoValores.comAporte),
            dataSetSemAporte: Object.values(response.data[0].graficoValores.semAporte)
          }
        });

      })
      .catch((error) => {
        console.log('Error ao buscar simulações', error)
      })
  }

  const onCleanForm = () => {
    reset();
    setResult({
      valorFinalBruto: 0,
      aliquotaIR: 0,
      valorPagoIR: 0,
      valorTotalInvestido: 0,
      valorFinalLiquido: 0,
      ganhoLiquido: 0,
      graficoValores: {}
    });
    indicators();
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
    <ThemeProvider theme={theme} >

      <Container
        maxWidth={"lg"}
        disableGutters={false}
        sx={{
          background: '#efefef',
          // mt: 3,
          padding: 3,
          // pb: 10
        }}
      >
        <Typography sx={{
          fontWeight: 'bold',
          fontSize: '30px'
        }} variant="h4" textAlign={"center"} >
          Simulador de Investimentos
        </Typography>

        <Box
          data-testid="form"
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
              columnGap: 2,
              gridColumn: {
                lg: 'span 6',
                md: 'span 12',
                xs: 'span 12'
              }
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
              gridRowStart: 0,
              columnGap: 2,
              gridColumn: {
                md: 'span 3',
                sm: 'span 3',
                xs: 'span 6'
              },
              alignItems: 'center',
              mt: {
                xs: '12px',
                sm: '0px'
              }
            }}>
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                sx={{
                  gridColumn: 'span 2'
                }}
              >
                Rendimento
              </Typography>

              <Tooltip title="Tipo de rendimento (Bruto ou Líquido)">
                <InfoOutlinedIcon />
              </Tooltip>

              <ToggleButtonGroup
                value={salaryType}
                exclusive
                onChange={handleSalaryType}
                touchRippleRef={salaryType}
                sx={{
                  gridColumn: {
                    md: 'span 3',
                    sm: 'span 6',
                    xs: 'span 6'
                  },
                  maxHeight: 50
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
                  {salaryType === 'bruto' && <DoneIcon />}
                  <Typography>Bruto</Typography>
                </ToggleButton>
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

            </Box>

            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              rowGap: 1,
              columnGap: 2,
              gridColumn: {
                md: 'span 3',
                sm: 'span 3',
                xs: 'span 6'
              },
              alignItems: 'center',
              mt: {
                xs: '12px',
                sm: '0px'
              }
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


              <ToggleButtonGroup

                value={incomeType}
                exclusive={true}
                onChange={handleIncomeType}
                sx={{
                  gridColumn: {
                    md: 'span 3',
                    sm: 'span 6',
                    xs: 'span 6'
                  },
                  maxHeight: 50
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
            </Box>


            <InputCurrencyRHF
              data-testid="required-input"
              name='initialContribution'
              label='Aporte Inicial'
              control={control}
              sx={{
                width: {
                  md: '75%',
                  xs: '90%'
                },
                mt: 3,
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }}
            />

            <InputCurrencyRHF
              name='monthlyContribution'
              label='Aporte Mensal'
              control={control}
              sx={{
                width: {
                  md: '75%',
                  xs: '90%'
                },
                mt: 3,
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }}
            />

            <InputRHF
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              name='period'
              label='Prazo (em meses)'
              control={control}
              sx={{
                width: {
                  md: '75%',
                  xs: '90%'
                },
                mt: 3,
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }}
            />

            <InputPercentageRHF
              name='profitability'
              label='Rentabilidade'
              control={control}
              sx={{
                width: {
                  md: '75%',
                  xs: '90%'
                },
                mt: 3,
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }}
            />

            <InputPercentageRHF
              disabled
              name='ipca'
              label='IPCA (ao ano)'
              control={control}
              sx={{
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                },
                width: {
                  md: '75%',
                  xs: '90%'
                },
                mt: 3,
                mb: 4
              }}
            />

            <InputPercentageRHF
              disabled
              name='cdi'
              label='CDI (ao ano)'
              control={control}
              sx={{
                gridColumn: {
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                },
                width: {
                  md: '75%',
                  xs: '90%'
                },
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
              onClick={onCleanForm}>
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

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              rowGap: 1,
              columnGap: 6,
              gridColumn: {
                lg: 'span 6',
                md: 'span 12',
                xs: 'span 12'
              }
            }}
          >
            <Typography
              variant="h5"
              textAlign={"left"}
              sx={{
                gridColumn: 'span 6',
                fontWeight: 'bold',
                fontSize: '20px',
                mb: 2
              }}
            >
              Resultado da Simulação
            </Typography>

            <Card
              prefix={'R$'}
              title={'Valor final Bruto'}
              value={result.valorFinalBruto}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }} />

            <Card
              suffix={'%'}
              title={'Alíquota do IR'}
              value={result.aliquotaIR}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }} />

            <Card
              prefix={'R$'}
              title={'Valor Pago em IR'}
              value={result.valorPagoIR}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }} />


            <Card
              prefix={'R$'}
              title={'Valor final Líquido'}
              value={result.valorFinalLiquido}
              color={'#008000'}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }} />

            <Card
              prefix={'R$'}
              title={'Valor Total Investido'}
              value={result.valorTotalInvestido}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
              }} />

            <Card
              prefix={'R$'}
              title={'Ganho Líquido'}
              value={result.ganhoLiquido}
              color={'#008000'}
              sx={{
                gridColumn: {
                  lg: 'span 2',
                  md: 'span 3',
                  sm: 'span 3',
                  xs: 'span 6'
                }
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
                labels={result.graficoValores.labels}
                dataSetComAporte={result.graficoValores.dataSetComAporte}
                dataSetSemAporte={result.graficoValores.dataSetSemAporte}
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
