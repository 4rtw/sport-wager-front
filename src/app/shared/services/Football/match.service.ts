import { destroyPlatform, Injectable } from '@angular/core';
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

  getMatches(competitionID: number, date: Date): Observable<FootballGames[]> {
    const customDate = new CustomDate();
    const id: string = competitionID.toString(10);
    const formatedDate: string = customDate.formatDate(date);

    return this.http
      .get<{ data: FootballGames[]; errors: string[] }>(
        this.uri + 'foot/date/' + id + '/' + formatedDate
      )
      .pipe(
        map((x) => {
          console.log(x);
          return x.data;
        })
      );
  }
}
