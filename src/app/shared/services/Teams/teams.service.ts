import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {config} from "../../config/variables"
import {map} from 'rxjs/operators';
import {Team} from '../../model/Foot/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  uri: string = config.herokuurl

  constructor(private http: HttpClient) { }

  getTeamDetails(competitionId,id): Observable<Team>{
    return this.http.get<{data: [Team], errors: [any]}>(this.uri + 'foot/teams/competition/' + competitionId + '/' + id).pipe(
        map(x => {
          return x.data[0];
        })
    )
  }
}
