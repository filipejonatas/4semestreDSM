import prisma from '../config/database';

type BombStatus = 'idle' | 'armed' | 'exploded' | 'defused';

class MiscService {
  private static bombStatus: BombStatus = 'idle';
  private static countdown: number = 0;
  private static countdownInterval: NodeJS.Timeout | null = null;

  static async getLeaderboard(topic?: string, limit = 10) {
    const where = topic ? { topic, status: 'completed' } : { status: 'completed' };
    const sessions = await prisma.gameSession.findMany({
      where,
      orderBy: [
        { score: 'desc' },
        { timeTaken: 'asc' }
      ],
      take: limit,
      include: {
        user: true,
      },
    });

    return sessions.map((s: { user: { name: any; }; score: any; timeTaken: any; topic: any; createdAt: any; }) => ({
      name: s.user.name,
      score: s.score,
      time: s.timeTaken,
      topic: s.topic,
      date: s.createdAt,
    }));
  }

  static async getBombStatus() {
    return {
      shouldTrigger: this.bombStatus === 'armed',
      countdown: this.countdown,
      status: this.bombStatus,
    };
  }

  static async postBombTrigger(event: 'PIR_DETECTED' | 'GAME_FAILED' | 'GAME_SUCCESS') {
    switch(event) {
      case 'PIR_DETECTED':
        if (this.bombStatus === 'idle') {
          this.bombStatus = 'armed';
          this.countdown = 120; // 2 minutos
          this.startCountdown();
        }
        break;
      case 'GAME_FAILED':
        this.bombStatus = 'exploded';
        this.stopCountdown();
        break;
      case 'GAME_SUCCESS':
        this.bombStatus = 'defused';
        this.stopCountdown();
        break;
    }

    await prisma.eventoBomba.create({
      data: {
        status: this.bombStatus,
      }
    });

    return { status: this.bombStatus, countdown: this.countdown };
  }

  private static startCountdown() {
    if (this.countdownInterval) return;

    this.countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        this.bombStatus = 'exploded';
        this.stopCountdown();
      }
    }, 1000);
  }

  private static stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
      this.countdown = 0;
    }
  }
}

export default MiscService;