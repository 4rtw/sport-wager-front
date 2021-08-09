import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballGames } from '../../model/Foot/foot';
import { config } from '../../config/variables';
import { map } from 'rxjs/operators';
import { CustomDate } from '../Utils/DateOperator';
import {FootStat} from '../../model/Foot/FootStat'

@Injectable({
    providedIn: 'root',
})
export class MatchService {
    private uri = config.herokuurl;
    private uriAuto = config.herokuauto;

    constructor(private http: HttpClient) {}

    getMatchesByRangeDate(idCompet: number, date: Date[]): Observable<FootballGames[]>{
        if(idCompet===0){
            idCompet=2002;
        }
        if(!date[1]){
            date[1] = new Date();
        }
        const customStart = new CustomDate().formatDate(date[0]);
        const customEnd = new CustomDate().formatDate(date[1]);
        return this.http.get<{ data: FootballGames[]; errors: string[] }>(this.uri + 'foot/date/' + idCompet + '/'+ customStart +'/'+ customEnd).pipe(
            map((x)=>{
                return x.data;
            })
        )
    }

    getMatches(idCompet: number, date: Date): Observable<FootballGames[]> {
        const customDate = new CustomDate();
        if(idCompet===0||!idCompet){idCompet=2002}
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

    getStats(idCompet: number): Observable<FootStat[]>{
        return this.http.get<{data: FootStat[], errors: any[]}>(this.uri+ 'foot/stats/competition/'+idCompet).pipe(
            map(x => {return x.data})
        )
    }

    getAllMatches(idCompet: number): Observable<FootballGames[]> {
        if(idCompet===0||!idCompet){idCompet=2002}

        return this.http
            .get<{ data: FootballGames[]; errors: string[] }>(
                this.uri + 'foot/schedules/' + idCompet
            )
            .pipe(
                map((x) => {
                    return x.data;
                })
            );
    }
}
