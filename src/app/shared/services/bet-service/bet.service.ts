import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/variables';
import { Bet } from '../../model/Bet/Bet';
import { map } from 'rxjs/operators';
import { SportCategory } from '../../model/Bet/SportCategory';
import { BetType } from '../../model/Bet/BetType';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  uriRoot = 'bet/';

  constructor(private http: HttpClient) {}

  getSportCategory() {
    return this.http
      .get<{ data: SportCategory[]; errors: string[] }>(
        config.herokuurl + this.uriRoot + 'sport-categories'
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getBetTypes() {
    return this.http
      .get<{ data: BetType[]; errors: string[] }>(
        config.herokuurl + this.uriRoot + 'bet-types'
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getMyBetList() {
    return this.http
      .get<{ data: Bet[]; errors: string[] }>(
        config.herokuurl + this.uriRoot + 'my-bets'
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  postNewBet(bet: Bet) {
    return this.http.post(config.herokuurl + this.uriRoot, bet).pipe();
  }
}
