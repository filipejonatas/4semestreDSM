import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota GET para consultar eventos
router.get('/eventos', async (req, res) => {
    try {
        const eventos = await prisma.eventoBomba.findMany({
            orderBy: { dataAcao: 'desc' }
        });
        res.json(eventos);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
});

// Rota POST para registrar novo evento
router.post('/eventos', async (req, res) => {
    const { status, dataAcao } = req.body;

    if (!status) {
        res.status(400).json({ error: 'Campo status é obrigatório' });
    }

    try {
        const novoEvento = await prisma.eventoBomba.create({
            data: {
                status,
                dataAcao: dataAcao ? new Date(dataAcao) : new Date(),
            },
        });
        res.status(201).json(novoEvento);
    } catch (error) {
        console.error('Erro ao registrar evento:', error);
        res.status(500).json({ error: 'Erro ao registrar evento' });
    }
});

export default router;