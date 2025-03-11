import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
}

export interface ContextProps {
  regioes: RegiaoProps[] | undefined;
  ufs: UfProps[] | undefined;
  mesos: MesoProps[] | undefined;
  micros: MicroProps[] | undefined;
  municipios: MunicipioProps[] | undefined;
  regiao: RegiaoProps | undefined;
  uf: UfProps | undefined;
  meso: MesoProps | undefined;
  micro: MicroProps | undefined;
  setRegiao(value:RegiaoProps): void;
  setUf(value:UfProps): void;
  setMeso(value:MesoProps): void;
  setMicro(value:MicroProps): void;
}

export interface RegiaoProps {
  id: number;
  sigla: string;
  nome: string;
}

export interface UfProps {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoProps;
}

export interface MesoProps {
  id: number;
  nome: string;
  uf: UfProps;
}

export interface MicroProps {
  id: number;
  nome: string;
  mesorregiao: MesoProps;
}

export interface MunicipioProps {
  id: number;
  nome: string;
  microrregiao: MicroProps;
}