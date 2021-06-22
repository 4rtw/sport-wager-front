import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competitions } from '../../model/Foot/competitions';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/shared/config/variables';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  private uri = config.herokuurl;

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<Competitions[]> {
    return this.http
      .get<{
        data: Competitions[];
        errors: string[];
      }>(this.uri + 'foot/active-competition')
      .pipe(
        map((x: { data: Competitions[]; errors: string[] }) => {
          let competitions: Competitions[];
          // @ts-ignore
          competitions = x.data.data;
          console.log('competitions');
          console.log(competitions);
          console.log('competitions');
          return competitions;
        })
      );
  }
}
