import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NbaGame } from '../model/nba-game';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  uri = 'https://wager-tpt.herokuapp.com/api/nba/';
  nbaGames: NbaGame[] = [];
  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getRefreshNeeded$(): Subject<void> {
    return this._refreshNeeded$;
  }

  getMatches(date?: string): Observable<any> {
    if (date === undefined) {
      date = '';
    }
    return this.http.get(this.uri + 'schedules/' + date).pipe(
      map((x) => {
        // @ts-ignore
        return x.data.data;
      }),
      tap((_) => {
        this._refreshNeeded$.next();
      })
    );
  }
}
