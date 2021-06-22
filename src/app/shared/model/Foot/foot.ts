export class FootballGames {
  // tslint:disable-next-line:variable-name
  _id: string;
  id: number;
  season: {
    _id: string;
    id: number;
    startDate: Date;
    endDate: Date;
  };
  utcDate: Date;
  status: string;
  stage: string;
  score: {
    _id: string;
    winner: string;
    fulltime: {
      _id: string;
      homeTeam: number;
      awayTeam: number;
    };
    extraTime: {
      _id: string;
      homeTeam?: number;
      awayTeam?: number;
    };
    penalties: {
      _id: string;
      homeTeam?: number;
      awayTeam?: number;
    };
  };
  homeTeam: {
    _id: string;
    id: number;
    name: string;
  };
  awayTeam: {
    _id: string;
    id: number;
    name: string;
  };
}
