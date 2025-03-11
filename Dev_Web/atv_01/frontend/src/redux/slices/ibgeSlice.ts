import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getRegioes,
  getUfPorRegiao,
  getMesoPorUf,
  getMicroPorMeso,
  getMunicipioPorMicro,
} from "../../services/ibge";
import {
  MesoProps,
  MicroProps,
  MunicipioProps,
  RegiaoProps,
  UfProps,
} from "../../types";

interface IbgeState {
  regioes: RegiaoProps[] | null;
  ufs: UfProps[] | null;
  mesos: MesoProps[] | null;
  micros: MicroProps[] | null;
  municipios: MunicipioProps[] | null;
  regiao: RegiaoProps | null;
  uf: UfProps | null;
  meso: MesoProps | null;
  micro: MicroProps | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: IbgeState = {
  regioes: null,
  ufs: null,
  mesos: null,
  micros: null,
  municipios: null,
  regiao: null,
  uf: null,
  meso: null,
  micro: null,
  loading: false,
  error: null,
};

// Thunks para buscar os dados da API
export const fetchRegioes = createAsyncThunk("ibge/fetchRegioes", async () => {
  return await getRegioes();
});

export const fetchUfPorRegiao = createAsyncThunk(
  "ibge/fetchUfPorRegiao",
  async (id: number) => {
    return await getUfPorRegiao(id);
  }
);

export const fetchMesoPorUf = createAsyncThunk(
  "ibge/fetchMesoPorUf",
  async (id: number) => {
    return await getMesoPorUf(id);
  }
);

export const fetchMicroPorMeso = createAsyncThunk(
  "ibge/fetchMicroPorMeso",
  async (id: number) => {
    return await getMicroPorMeso(id);
  }
);

export const fetchMunicipioPorMicro = createAsyncThunk(
  "ibge/fetchMunicipioPorMicro",
  async (id: number) => {
    return await getMunicipioPorMicro(id);
  }
);

const ibgeSlice = createSlice({
  name: "ibge",
  initialState,
  reducers: {
    setRegiao: (state, action: PayloadAction<RegiaoProps | null>) => {
      state.regiao = action.payload;
      state.ufs = null;
      state.mesos = null;
      state.micros = null;
      state.municipios = null;
    },
    setUf: (state, action: PayloadAction<UfProps | null>) => {
      state.uf = action.payload;
      state.mesos = null;
      state.micros = null;
      state.municipios = null;
    },
    setMeso: (state, action: PayloadAction<MesoProps | null>) => {
      state.meso = action.payload;
      state.micros = null;
      state.municipios = null;
    },
    setMicro: (state, action: PayloadAction<MicroProps | null>) => {
      state.micro = action.payload;
      state.municipios = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegioes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegioes.fulfilled, (state, action) => {
        state.loading = false;
        state.regioes = action.payload;
      })
      .addCase(fetchRegioes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao carregar regiões";
      })

      .addCase(fetchUfPorRegiao.fulfilled, (state, action) => {
        state.ufs = action.payload;
      })
      .addCase(fetchMesoPorUf.fulfilled, (state, action) => {
        state.mesos = action.payload;
      })
      .addCase(fetchMicroPorMeso.fulfilled, (state, action) => {
        state.micros = action.payload;
      })
      .addCase(fetchMunicipioPorMicro.fulfilled, (state, action) => {
        state.municipios = action.payload;
      });
  },
});

export const { setRegiao, setUf, setMeso, setMicro } = ibgeSlice.actions;
export default ibgeSlice.reducer;
