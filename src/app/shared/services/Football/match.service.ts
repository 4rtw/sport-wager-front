import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballGames } from '../../model/Foot/foot';
import { config } from '../../config/variables';
import { map } from 'rxjs/operators';
import { CustomDate } from '../Utils/DateOperator';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private uri = config.herokuurl;

  constructor(private http: HttpClient) {}

  getMatches(idCompet: number, date: Date): Observable<FootballGames[]> {
    const customDate = new CustomDate();
    if(idCompet===0){idCompet=2002}
    const formatedDate: string = customDate.formatDate(date);

    return this.http
      .get<{ data: FootballGames[]; errors: string[] }>(
        this.uri + 'foot/date/' + idCompet + '/' + formatedDate
      )
      .pipe(
        map((x) => {
          return x.data;
        })
      );
  }
}
