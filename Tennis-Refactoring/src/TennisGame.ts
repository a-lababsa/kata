
export interface TennisGame {
  wonPoint(playerName: string): void;
  getScore(): string;
  equality(): boolean;
}

export module ScoreAll {
  export const LOVE: string = 'Love-All';
  export const FIFTEEN: string = 'Fifteen-All';
  export const THIRTY: string = 'Thirty-All'
  export const DEUCE: string = 'Deuce'
}

export module Score {
  export const LOVE: string = 'Love';
  export const FIFTEEN: string = 'Fifteen';
  export const THIRTY: string = 'Thirty'
  export const FORTY: string = 'Forty'
}

export class Player {
  private playerScore: number = 0
  private playerName: string
  private playerResultat: string = ''

  constructor(name: string) {
    this.playerName = name
  }

  get score(): number {
    return this.playerScore
  }

  set score(value) {
    this.playerScore = value
  }

  get name(): string {
    return this.playerName
  }

  get resultat(): string {
    return this.playerResultat
  }

  set resultat(value: string) {
    this.playerResultat = value
  }
}