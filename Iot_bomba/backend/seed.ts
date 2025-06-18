import prisma from "./src/config/database";

async function seedQuestions() {
  const questionsData = [
    {
      
      topic: "geografia",
      difficulty: "medium",
      question: "Qual é a capital do Brasil?",
      correctAnswer: "Brasília",
      wrongAnswers: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
    },
    {
      question: "Qual é o maior país em extensão territorial do mundo?",
      correctAnswer: "Rússia",
      wrongAnswers: ["Canadá", "China", "Estados Unidos"],
      difficulty: "easy",
      topic: "geografia",
    },
    {
      question: "Qual é a capital mais alta do mundo em altitude?",
      correctAnswer: "La Paz",
      wrongAnswers: ["Quito", "Bogotá", "Cidade do México"],
      difficulty: "hard",
      topic: "geografia",
      },
    {
      question: "Qual é o deserto mais seco do mundo?",
      correctAnswer: "Deserto do Atacama",
      wrongAnswers: ["Saara", "Kalahari", "Gobi"],
      difficulty: "hard",
      topic: "geografia",
    },
    {
      question: "O rio Nilo deságua em qual mar?",
      correctAnswer: "Mar Mediterrâneo",
      wrongAnswers: ["Mar Vermelho", "Mar Cáspio", "Oceano Índico"],
      difficulty: "medium",
      topic: "geografia",
    },
    {
      topic: "historia",
      difficulty: "medium",
      question: "Quem foi o primeiro presidente do Brasil?",
      correctAnswer: "Deodoro da Fonseca",
      wrongAnswers: ["Getúlio Vargas","Juscelino Kubitschek","Jair Bolsonaro",],
    },
    {
      question: "Em que ano o Brasil se tornou uma república?",
      correctAnswer: "1889",
      wrongAnswers: ["1822", "1500", "1988"],
      difficulty: "medium",
      topic: "historia",
    },
    {
      question: "Quem foi o primeiro presidente do Brasil?",
      correctAnswer: "Deodoro da Fonseca",
      wrongAnswers: ["Getúlio Vargas", "Dom Pedro II", "Juscelino Kubitschek"],
      difficulty: "medium",
      topic: "historia",
    },
    {
      question: "Qual evento marcou o início da Segunda Guerra Mundial?",
      correctAnswer: "Invasão da Polônia pela Alemanha",
      wrongAnswers: ["Ataque a Pearl Harbor","Queda da Bolsa de NY","Tratado de Versalhes",],
      difficulty: "hard",
      topic: "historia",
    },
    {
      topic: "historia",
      difficulty: "hard",
      question: "Em que ano foi proclamada a República no Brasil?",
      correctAnswer: "1889",
      wrongAnswers: ["1822", "1888", "1930"],
    },
    {
      topic: "ciencia",
      difficulty: "easy",
      question: "Qual é a fórmula química da água?",
      correctAnswer: "H2O",
      wrongAnswers: ["CO2", "NaCl", "O2"],
    },
    {
      topic: "ciencia",
      difficulty: "medium",
      question: "Qual é o planeta mais próximo do Sol?",
      correctAnswer: "Mercúrio",
      wrongAnswers: ["Vênus", "Terra", "Marte"],
    },
    {
      question: "Qual é a unidade de medida da corrente elétrica?",
      correctAnswer: "Ampère",
      wrongAnswers: ["Volt", "Watt", "Ohm"],
      difficulty: "medium",
      topic: "ciencia",
    },
    {
      question: "Qual é o gás mais abundante na atmosfera terrestre?",
      correctAnswer: "Nitrogênio",
      wrongAnswers: ["Oxigênio", "Gás Carbônico", "Hidrogênio"],
      difficulty: "medium",
      topic: "ciencia",
    },
    {
      question: "Qual é o símbolo químico da água?",
      correctAnswer: "H2O",
      wrongAnswers: ["O2", "CO2", "HO2"],
      difficulty: "easy",
      topic: "ciencia",
    },
  ];

  console.log("Iniciando o seed das perguntas...");

  for (const q of questionsData) {
    // Se quiser evitar duplicatas, pode usar upsert, mas aqui só create mesmo
    await prisma.question.create({ data: q });
    console.log(`Pergunta criada: ${q.question}`);
  }

  console.log("Seed finalizado com sucesso!");
  await prisma.$disconnect();
}

seedQuestions().catch((e) => {
  console.error("Erro no seed:", e);
  process.exit(1);
});
