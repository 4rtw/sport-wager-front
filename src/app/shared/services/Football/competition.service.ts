import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Competitions} from '../../model/Foot/competitions';
import {HttpClient} from '@angular/common/http';
import {config} from 'src/app/shared/config/variables';
import {map, tap} from 'rxjs/operators';

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
          const activeCompetitions: Competitions[] = [];
          competitions = x.data;
          for (const competition of competitions) {
              activeCompetitions.push(competition);
          }
          if (activeCompetitions.length === 0){
            return competitions;
          }
          return activeCompetitions;
        })
      );
  }

  getCompetition(id:number): Observable<Competitions>{
      if(id===0){
          id=2002
      }
      return this.http.get<{
          data: Competitions[];
          errors: string[];
      }>(this.uri + 'foot/active-competition')
          .pipe(
              map((x:{ data: Competitions[]; errors: string[] })=>{
                  return x.data.find(element => element.id == id)}
              )
          );
  }

  getCompetitionByArea(area: string): Observable<Competitions[]>{
      return this.http.get<{
          data: Competitions[];
          errors: string[];
      }>(this.uri + 'foot/all-competition/' + area)
          .pipe(
              map((x:{ data: Competitions[]; errors: string[] })=>{return x.data})
          );
  }
}
