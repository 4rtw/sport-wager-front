import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/variables';
import { Bet } from '../../model/Bet/Bet';
import { map } from 'rxjs/operators';
import { SportCategory } from '../../model/Bet/SportCategory';
import { BetType } from '../../model/Bet/BetType';
import { UserService } from '../Users/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  url = config.herokuurl + 'bet/';

  constructor(private http: HttpClient, private userService: UserService) {}

  getSportCategory() {
    return this.http
      .get<{ data: SportCategory[]; errors: string[] }>(
        this.url + 'sport-categories'
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getBetTypes() {
    return this.http
      .get<{ data: BetType[]; errors: string[] }>(this.url + 'bet-types')
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  getBetType(id) {
      return this.http
          .get<{ data: BetType[]; errors: string[] }>(this.url + 'bet-types')
          .pipe(
              map((response) => {
                  const betTypes = response.data;
                  return betTypes.find(element => element.id === id);
              })
          );
  }

  getMyBetList(): any {
    return this.http
      .get<{ data: Bet[]; errors: string[] }>(this.url + 'my-bets')
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  postNewBet(bet: Bet) {
    return this.http.post(this.url, bet).pipe();
  }
}
