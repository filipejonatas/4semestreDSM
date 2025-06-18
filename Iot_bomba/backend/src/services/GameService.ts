import prisma from '../config/database';

type GameState = 'waiting' | 'active' | 'completed' | 'failed';

class GameService {

  static async registerGame(name: string, topic: string) {
    let user = await prisma.user.findFirst({ where: { name } });
    if (!user) {
      user = await prisma.user.create({ data: { name } });
    }

    const session = await prisma.gameSession.create({
      data: {
        userId: user.id,
        topic,
        status: 'waiting',
      }
    });

    return { sessionId: session.id, gameState: session.status };
  }

  static async getGameStatus(sessionId: number) {
    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: {
          orderBy: { answeredAt: 'asc' }
        }
      }
    });
    if (!session) return null;

    const answeredCount = session.answers.length;
    const questions = await prisma.question.findMany({
      where: { topic: session.topic },
      orderBy: { id: 'asc' },
      take: 5,
    });

    const currentQuestion = questions[answeredCount];

    let timeRemaining: number | undefined;
    if (session.startTime) {
      const elapsed = (new Date().getTime() - session.startTime.getTime()) / 1000;
      timeRemaining = Math.max(0, 120 - elapsed);
    }

    return {
      status: session.status,
      currentQuestion: currentQuestion
        ? {
            id: currentQuestion.id,
            question: currentQuestion.question,
            difficulty: currentQuestion.difficulty,
            topic: currentQuestion.topic,
            wrongAnswers: currentQuestion.wrongAnswers,
          }
        : null,
      questionNumber: answeredCount + 1,
      timeRemaining,
      score: session.score,
    };
  }

  static async startGame(sessionId: number) {
    const session = await prisma.gameSession.update({
      where: { id: sessionId },
      data: { status: 'active', startTime: new Date() },
      include: {
        user: true,
        answers: true,
      }
    });

    const questions = await prisma.question.findMany({
      where: { topic: session.topic },
      orderBy: { id: 'asc' },
      take: 5,
    });

    return {
      status: session.status,
      questions: questions.map((q: { id: any; question: any; difficulty: any; wrongAnswers: any; }) => ({
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        wrongAnswers: q.wrongAnswers,
      })),
      startTime: session.startTime,
    };
  }

  static async answerQuestion(sessionId: number, questionId: number, answer: string) {
    const session = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { answers: true },
    });
    if (!session) throw new Error('Sessão não encontrada');

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new Error('Pergunta não encontrada');

    const isCorrect = question.correctAnswer.toLowerCase() === answer.toLowerCase();

    await prisma.gameAnswer.create({
      data: {
        sessionId,
        questionId,
        userAnswer: answer,
        isCorrect,
      }
    });

    let newScore = session.score || 0; // <- segurança extra
    if (isCorrect) {
      newScore += 1;
      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { score: newScore },
      });
    }

    const questions = await prisma.question.findMany({
      where: { topic: session.topic },
      orderBy: { id: 'asc' },
      take: 5,
    });
    const answeredCount = session.answers.length + 1;
    const nextQuestion = questions[answeredCount];

    const gameComplete = answeredCount >= 5;

    return {
      correct: isCorrect,
      score: newScore,
      nextQuestion: nextQuestion
        ? {
            id: nextQuestion.id,
            question: nextQuestion.question,
            difficulty: nextQuestion.difficulty,
            wrongAnswers: nextQuestion.wrongAnswers,
          }
        : null,
      gameComplete,
    };
  }

  static async completeGame(sessionId: number, result: 'success' | 'timeout' | 'failed') {
    const session = await prisma.gameSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new Error('Sessão não encontrada');

    await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        status: result === 'success' ? 'completed' : 'failed',
        endTime: new Date(),
        timeTaken: session.startTime ? Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000) : null,
      }
    });

    const rankings = await prisma.gameSession.findMany({
      where: {
        topic: session.topic,
        status: 'completed',
      },
      orderBy: [
        { score: 'desc' },
        { timeTaken: 'asc' }
      ],
      take: 100,
    });

    const leaderboardPosition = rankings.findIndex((s: { id: number; }) => s.id === sessionId) + 1;

    return {
      finalScore: session.score,
      leaderboardPosition,
    };
  }
}

export default GameService;