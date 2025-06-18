import prisma from '../src/config/database'; // ajuste o caminho se necessário

async function main() {
  await prisma.question.deleteMany({});
  console.log('Todas as perguntas foram deletadas com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
