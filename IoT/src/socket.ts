import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('🔌 Novo dispositivo conectado');

    socket.on('evento_bomba', async (data) => {
      const { status, data_acao } = data;
      console.log('📥 Recebido:', data);

      try {
        await prisma.eventoBomba.create({
          data: {
            status,
            dataAcao: new Date(data_acao),
          },
        });
        console.log('✅ Evento salvo no banco de dados.');
      } catch (error) {
        console.error('❌ Erro ao salvar:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('❎ Dispositivo desconectado');
    });
  });
}
