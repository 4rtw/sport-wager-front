import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'src/app/shared/config/variables';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  uri = config.herokuurl + 'nba/';

  constructor(private http: HttpClient) {}

  getMatches(date?: string): Observable<any> {
    if (date === undefined) {
      date = '';
    }
    return this.http.get(this.uri + 'schedules/' + date).pipe(
      map((x) => {
        // @ts-ignore
        return x.data.data;
      })
    );
  }
}
