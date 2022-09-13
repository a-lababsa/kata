import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private p2: number = 0;
  private p1: number = 0;
  private p1N: string;
  private p2N: string;

  constructor(p1N: string, p2N: string) {
    this.p1N = p1N;
    this.p2N = p2N;
  }

  getScore(): string {
    let score: string;
    if (this.p1 < 4 && this.p2 < 4 && !(this.p1 + this.p2 === 6)) {
      const p: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];
      score = p[this.p1];
      return (this.p1 === this.p2) ? score + '-All' : score + '-' + p[this.p2];
    } else {
      if (this.p1 === this.p2)
        return 'Deuce';
      score = this.p1 > this.p2 ? this.p1N : this.p2N;
      return (((this.p1 - this.p2) * (this.p1 - this.p2)) === 1) ? 'Advantage ' + score : 'Win for ' + score;
    }
  }

  equality(): boolean {
    return true
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.p1 += 1;
    else
      this.p2 += 1;
  }
}
