import { Request, Response } from 'express';
import prisma from '../config/database';

export const criarEvento = async (req: Request, res: Response): Promise<void> => {
  const { status, data_acao } = req.body;

  if (!status) {
    res.status(400).json({ error: 'Status é obrigatório.' });
  }

  try {
    const evento = await prisma.eventoBomba.create({
      data: {
        status,
        dataAcao: data_acao ? new Date(data_acao) : new Date(),
      },
    });
    res.status(201).json(evento);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

export const listarEventos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const eventos = await prisma.eventoBomba.findMany({
      orderBy: {
        dataAcao: 'desc',
      },
    });
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ error: 'Erro ao listar eventos.' });
  }
};

