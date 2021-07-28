export class Bet {
  _id: string;
  id: string;
  match_id: Number;
  sport_category: string;
  amount_of_bets: number;
  multiplicator: number;
  creation_date: Date;
  collected: boolean;
  bet_type: {
    _id: string;
    id: String;
    description: String;
    bet_type: String;
  };
}
