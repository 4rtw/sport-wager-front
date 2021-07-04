export class Bet {
  _id: string;
  id: string;
  client_id: Number;
  match_id: Number;
  sport_category: string;
  amount_of_bets: number;
  multiplicator: number;
  creation_date: Date;
  collected: boolean;
  bet_type: {
    _id: string;
    id: Number;
    description: string;
    bet_type: string;
  };
}
