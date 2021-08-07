import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'src/app/shared/config/variables';
import { NbaGame } from '../../model/Basket/nba-game';
import { CustomDate } from '../Utils/DateOperator';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  uri = config.herokuurl + 'nba/';
  uriAuto = config.herokuauto + 'nba/';

  constructor(private http: HttpClient) {}

  getMatches(date: Date): Observable<NbaGame[]> {
    let dateString = '';
    if (date === undefined || date === null) {
      const dateDate = new Date();
      dateString = new CustomDate().formatDate(dateDate);
    } else {
      dateString = new CustomDate().formatDate(date);
    }

    return this.http
      .get<{
        data: { data: any[]; info: {}; error: any[] };
        info: {};
        errors: any[];
      }>(this.uri + 'schedules/' + dateString)
      .pipe(
        map((x) => {
          return x.data.data;
        })
      );
  }

  getAllMatches(): Observable<any> {
    return this.http
      .get<{
        data: { data: any[]; info: {}; error: any[] };
        info: {};
        errors: any[];
      }>(this.uri + 'schedules')
      .pipe(
        map((x) => {
          return x.data.data;
        })
      );
  }

  getMatch(id: number): Observable<NbaGame> {
    return this.http
      .get<{
        data: any[];
        info: {};
        errors: any[];
      }>(this.uriAuto + 'specific_match/' + id)
      .pipe(
        map((x) => {
          const response: NbaGame[] = x.data;
          return response[0];
        })
      );
  }
}
