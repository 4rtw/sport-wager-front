import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'src/app/shared/config/variables';
import {NbaGame} from '../../model/Basket/nba-game';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  uri = config.herokuurl + 'nba/' + 'schedules/';

  constructor(private http: HttpClient) {}

  getMatches(date?: string): Observable<any> {
    if (date === undefined) {
      date = '';
    }
    return this.http.get(this.uri + date).pipe(
      map((x) => {
        // @ts-ignore
        return x.data.data;
      })
    );
  }

  getAllMatches(): Observable<any> {
    return this.http.get(this.uri).pipe(
      map((x) => {
        // @ts-ignore
        return x.data.data;
      })
    );
  }

  getMatch(id): Observable<NbaGame>{
    return this.http.get(this.uri).pipe(
        map(x=>{
          // @ts-ignore
          const response: NbaGame[] = x.data.data;
          return response.find(element => element.GameID === id)
        })
    );
  }
}
