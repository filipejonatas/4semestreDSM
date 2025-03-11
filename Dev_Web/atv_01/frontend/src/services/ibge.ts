import { MesoProps, MicroProps, MunicipioProps, RegiaoProps, UfProps } from "../types";
import api from "./api";

export async function getRegioes(): Promise<RegiaoProps[]> {
  // espera 1 segundo antes de prosseguir
  //await delay(100);
  const { data } = await api.get("/regioes?orderBy=nome");
  return data;
}

export async function getUfPorRegiao(id: number): Promise<UfProps[]> {
  //await delay(100);
  const { data } = await api.get(`/regioes/${id}/estados?orderBy=nome`);
  return data;
}

export async function getMesoPorUf(id: number): Promise<MesoProps[]> {
  //await delay(100);
  const { data } = await api.get(`/estados/${id}/mesorregioes?orderBy=nome`);
  return data;
}

export async function getMicroPorMeso(id: number): Promise<MicroProps[]> {
  //await delay(100);
  const { data } = await api.get(`/mesorregioes/${id}/microrregioes?orderBy=nome`);
  return data;
}

export async function getMunicipioPorMicro(id: number): Promise<MunicipioProps[]> {
  //await delay(100);
  const { data } = await api.get(`/microrregioes/${id}/municipios?orderBy=nome`);
  return data;
}

// Função para criar um delay
//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
