export class Bet {
  id: string;
  match_id: number;
  sport_category: string;
  amount_of_bets: number;
  multiplicator: number;
  creation_date: Date;
  collected: boolean;
  bet_type: {
    id: String;
    description: String;
    bet_type: String;
  };
  match_info: {
    competition: number;
    match_id: number;
    away_team: string;
    home_team: string;
  }
}
