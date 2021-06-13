import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { NbaGame } from '../model/nba-game';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  uri = 'https://wager-tpt.herokuapp.com/api/nba/';
  nbaGames: NbaGame[] = [];

  constructor(
      private http: HttpClient
  ) {}

  getMatches(date?: string): Observable<any>{
    if (date === undefined) {
      date = '';
    }
    return this.http.get(this.uri + 'schedules/' + date).pipe(
        map( x => {
          // @ts-ignore
          return x.data.data;
        })
    );
  }
}
