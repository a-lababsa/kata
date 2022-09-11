import { TennisGame, ScoreAll, Score, Player } from './TennisGame';



export class TennisGame1 implements TennisGame {
  private player1: Player
  private player2: Player

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name)
    this.player2 = new Player(player2Name)
  }

  equality(): boolean {
    return this.player1.score === this.player2.score
  }

  finalBall(): boolean {
    return this.player1.score >= 4 || this.player2.score >= 4
  }

  minResult(): number {
    return this.player1.score - this.player2.score
  }

  wonPoint(playerName: string): void {
    if (this.player1.name == playerName) {
      this.player1.score++
    } else {
      this.player2.score++
    }
  }

  getScore(): string {
    let score: string = '';
    let tempScore: number = 0;
    if (this.equality()) {
      switch (this.player1.score) {
        case 0:
          score = ScoreAll.LOVE;
          break;
        case 1:
          score = ScoreAll.FIFTEEN
          break;
        case 2:
          score = ScoreAll.THIRTY;
          break;
        default:
          score = ScoreAll.DEUCE;
          break;

      }
    } else if (this.finalBall()) {
      switch (this.minResult()) {
        case 1:
          score = 'Advantage player1'
          break
        case -1:
          score = 'Advantage player2'
          break
        case 2:
        case 3:
        case 4:
          score = 'Win for player1'
          break
        default:
          score = 'Win for player2';
          break
      }
    } else {
      tempScore = this.player1.score;
      for (let i = 1; i < 3; i++) {
        if (i > 1) { score += '-'; tempScore = this.player2.score; }
        switch (tempScore) {
          case 0:
            score += Score.LOVE;
            break;
          case 1:
            score += Score.FIFTEEN;
            break;
          case 2:
            score += Score.THIRTY;
            break;
          case 3:
            score += Score.FORTY;
            break;
        }
      }
    }
    return score;
  }
}
