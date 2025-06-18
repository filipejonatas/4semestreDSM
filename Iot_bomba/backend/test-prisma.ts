import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    await prisma.$connect();
    console.log('✅ Prisma conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();