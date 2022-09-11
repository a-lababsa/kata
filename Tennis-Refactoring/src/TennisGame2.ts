import { TennisGame, Player, Score, ScoreAll } from './TennisGame';

export class TennisGame2 implements TennisGame {
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

  advantage(player: Player):string {
    const rival = this.getRival(player)
    const advantage = rival && player.score > rival?.score && rival?.score >= 3
    return advantage ? `Advantage ${player.name}` : ''
  }

  win(player: Player):string {
    const rival = this.getRival(player)
    const win = rival && player.score >= 4 && rival?.score >= 0 && (player.score - rival?.score) >= 2
    return win ? `Win for ${player.name}` : ''
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

    const firstAdvantage = this.advantage(this.player1)
    if (firstAdvantage) {
      score = firstAdvantage
    }

    const secondAdvantage = this.advantage(this.player2)
    if (secondAdvantage) {
      score = secondAdvantage
    }

    const firstWin =  this.win(this.player1)
    if (firstWin) {
      score = firstWin
    }

    const secondWin =  this.win(this.player2)
    if (secondWin) {
      score = secondWin
    }
    return score;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.player1.score++;
    else
      this.player2.score++
  }
}
