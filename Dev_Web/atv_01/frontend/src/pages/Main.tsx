import { Box, Typography, Stack, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMesoPorUf, fetchMicroPorMeso, fetchMunicipioPorMicro, fetchRegioes, fetchUfPorRegiao, setMeso, setMicro, setRegiao, setUf } from "../redux/slices/ibgeSlice";
import { MesoProps, MicroProps, MunicipioProps, RegiaoProps, UfProps } from "../types";
import { useEffect } from "react";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    regioes,
    ufs,
    mesos,
    micros,
    municipios,
    regiao,
    uf,
    meso,
    micro,
  } = useSelector((state:RootState) => state.ibge);

  useEffect(() => {
    dispatch(fetchRegioes());
  }, [dispatch]);

  const handleRegiaoClick = (item:RegiaoProps) => {
    dispatch(setRegiao(item));
    dispatch(fetchUfPorRegiao(item.id));
  };

  const handleUfClick = (item:UfProps) => {
    dispatch(setUf(item));
    dispatch(fetchMesoPorUf(item.id));
  };

  const handleMesoClick = (item:MesoProps) => {
    dispatch(setMeso(item));
    dispatch(fetchMicroPorMeso(item.id));
  };

  const handleMicroClick = (item:MicroProps) => {
    dispatch(setMicro(item));
    dispatch(fetchMunicipioPorMicro(item.id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Paper sx={{ width: 350, padding: 2, minHeight: 190 }}>
          <Typography variant="h6" gutterBottom>
            Regiões
          </Typography>
          <Box
            component="ul"
            sx={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              overflow: "auto",
              maxHeight: 150,
            }}
          >
            {regioes?.map((item:RegiaoProps, i:number) => (
              <li
                key={i}
                onClick={() => handleRegiaoClick(item)}
                style={{
                  padding: "4px 0px",
                  cursor: "pointer",
                  backgroundColor: regiao === item ? "#ddd" : "transparent",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    regiao === item ? "#ddd" : "transparent")
                }
              >
                {item.nome}
              </li>
            )) || <li>Nenhum dado disponível</li>}
          </Box>
        </Paper>

        {ufs && (
          <>
            <Paper sx={{ width: 350, padding: 2, minHeight: 190 }}>
              <Typography variant="h6" gutterBottom>
                Estados - {regiao?.nome}
              </Typography>
              <Box
                component="ul"
                sx={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  overflow: "auto",
                  maxHeight: 150,
                }}
              >
                {ufs?.map((item:UfProps, i:number) => (
                  <li
                    key={i}
                    onClick={() => handleUfClick(item)}
                    style={{
                      padding: "4px 0px",
                      cursor: "pointer",
                      backgroundColor: uf === item ? "#ddd" : "transparent",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        uf === item ? "#ddd" : "transparent")
                    }
                  >
                    {item.nome}
                  </li>
                )) || <li>Nenhum dado disponível</li>}
              </Box>
            </Paper>

            {mesos && (
              <>
                <Paper sx={{ width: 350, padding: 2, minHeight: 190 }}>
                  <Typography variant="h6" gutterBottom>
                    Mesorregiões - {uf?.nome}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      overflow: "auto",
                      maxHeight: 150,
                    }}
                  >
                    {mesos?.map((item:MesoProps, i:number) => (
                      <li
                        key={i}
                        onClick={() => handleMesoClick(item)}
                        style={{
                          padding: "4px 0px",
                          cursor: "pointer",
                          backgroundColor:
                            meso === item ? "#ddd" : "transparent",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f0f0")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            meso === item ? "#ddd" : "transparent")
                        }
                      >
                        {item.nome}
                      </li>
                    )) || <li>Nenhum dado disponível</li>}
                  </Box>
                </Paper>

                {micros && (
                  <>
                    <Paper sx={{ width: 350, padding: 2, minHeight: 190 }}>
                      <Typography variant="h6" gutterBottom>
                        Microrregiões - {meso?.nome}
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          margin: 0,
                          padding: 0,
                          listStyle: "none",
                          overflow: "auto",
                          maxHeight: 150,
                        }}
                      >
                        {micros?.map((item:MicroProps, i:number) => (
                          <li key={i} 
                          onClick={() => handleMicroClick(item)}
                          style={{ 
                            padding: "4px 0px", 
                            cursor: "pointer", 
                            backgroundColor: micro === item ? "#ddd" : "transparent", 
                            transition: "background-color 0.3s", 
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = micro === item ? "#ddd" : "transparent"}
                          >
                            {item.nome}
                          </li>
                        )) || <li>Nenhum dado disponível</li>}
                      </Box>
                    </Paper>

                    {municipios && (
                      <>
                        <Paper sx={{ width: 350, padding: 2, minHeight: 190 }}>
                          <Typography variant="h6" gutterBottom>
                            Municípios - {micro?.nome}
                          </Typography>
                          <Box
                            component="ul"
                            sx={{
                              margin: 0,
                              padding: 0,
                              listStyle: "none",
                              overflow: "auto",
                              maxHeight: 150,
                            }}
                          >
                            {municipios?.map((item:MunicipioProps, i:number) => (
                              <li key={i}>{item.nome}</li>
                            )) || <li>Nenhum dado disponível</li>}
                          </Box>
                        </Paper>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
