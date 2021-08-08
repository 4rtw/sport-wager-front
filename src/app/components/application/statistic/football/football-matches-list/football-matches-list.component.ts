import { Component, OnInit } from '@angular/core';
import {MatchService} from '../../../../../shared/services/Football/match.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {Observable} from 'rxjs';
import {FootStat} from '../../../../../shared/model/Foot/FootStat';


@Component({
  selector: 'app-football-matches-list',
  templateUrl: './football-matches-list.component.html',
  styleUrls: ['./football-matches-list.component.css']
})
export class FootballMatchesListComponent implements OnInit {

  sub: Subscription[] = [];
  idCompet: number = 2002;
  statistics: Observable<FootStat[]>;

  constructor(private footballService: MatchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub.push(
        this.activatedRoute.queryParams.subscribe(params => {
          this.idCompet= params.competitionID
          this.statistics = this.footballService.getStats(this.idCompet);
        })
    );
  }

}
