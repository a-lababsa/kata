import { TennisGame, Player, Score, ScoreAll } from './TennisGame';

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string|null = '';
  P2res: string|null = '';

  private player1: Player;
  private player2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name)
    this.player2 = new Player(player2Name)
  }

  equality(): boolean {
    return this.player1.score === this.player2.score
  }
  
  score():string {
    return this.player1.resultat + '-' + this.player2.resultat
  }

  match(player: Player): void {
    switch(player.score) {
      case 1:
        player.resultat = Score.FIFTEEN
        break
      case 2:
        player.resultat = Score.THIRTY
        break 
      case 3:
        player.resultat = Score.FORTY
        break
    }
  }

  matchAgainst(player: Player):void {
    const rival = this.getRival(player)
    if(player.score > 0 && rival?.score === 0) {
      this.match(player)
      rival.resultat = Score.LOVE
    }
  }

  getRival(player: Player):Player|undefined {
    const players = [
      {name: this.player1.name, player: this.player1},
      {name: this.player2.name, player: this.player2}
    ]

    return players.find(rival => rival.name !== player.name)?.player
  }

  firstMatch(player: Player):string {
    const rival = this.getRival(player)
    if(rival && player.score > rival?.score && player.score < 4) {
      switch (player.score) {
        case 2:
          player.resultat = Score.THIRTY
          break;
        case 3:
          player.resultat = Score.FORTY
          break
      }
      switch(rival?.score) {
        case 1:
          rival.resultat = Score.FIFTEEN  
          break
        case 2:
          rival.resultat = Score.THIRTY
          break
      }
      return this.score()
    }
    return ''
  }

  getScore(): string {
    let score: string = '';
    if (this.equality() && this.player1.score < 4) {
      switch(this.player1.score) {
        case 0:
          score = Score.LOVE;
          break
        case 1:
          score = Score.FIFTEEN;
          break
        case 2:
          score = Score.THIRTY;
          break
      }
      score += '-All'
    }
    if (this.equality() && this.player1.score >= 3)
      score = ScoreAll.DEUCE;

    this.matchAgainst(this.player1)
    this.matchAgainst(this.player2)

    const firstMatch = this.firstMatch(this.player1)
    if (firstMatch) {
      score = firstMatch
    }

    const secondMatch = this.firstMatch(this.player2)
    if (secondMatch) {
      score = secondMatch
    }

    if (this.P1point > this.P2point && this.P2point >= 3) {
      score = 'Advantage player1';
    }

    if (this.P2point > this.P1point && this.P1point >= 3) {
      score = 'Advantage player2';
    }

    if (this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2) {
      score = 'Win for player1';
    }
    if (this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2) {
      score = 'Win for player2';
    }
    return score;
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.player1.score++;
    this.P1point++
  }

  P2Score(): void {
    this.player2.score++
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
