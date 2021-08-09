import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MatchService} from '../../../../shared/services/Football/match.service';
import {ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../../../shared/services/Football/competition.service';
import {FootballGames} from '../../../../shared/model/Foot/foot';
import {Competitions} from '../../../../shared/model/Foot/competitions';

@Component({
  selector: 'app-football-bet-all',
  templateUrl: './football-bet-all.component.html',
  styleUrls: ['./football-bet-all.component.css']
})
export class FootballBetAllComponent implements OnInit, OnDestroy {
  idCompet: number = 0;
  sub: Subscription[] = [];
  matches: Observable<FootballGames[]>;
  activeCompetition: Observable<Competitions>;


  constructor(
      private footballService: MatchService,
      private activatedRoute: ActivatedRoute,
      private competitionService: CompetitionService,
  ) { }



  ngOnInit(): void {
    this.getCompetitionId()
  }

  ngOnDestroy(): void {
    for(const i of this.sub){
      i.unsubscribe();
    }
  }

  getCompetitionId(): void {
    this.sub.push(
        this.activatedRoute.queryParams.subscribe(params=>{
          params.competitionID ? this.idCompet = params.competitionID : this.idCompet = 0;
          this.activeCompetition = this.competitionService.getCompetition(this.idCompet);
          this.getMatches();
        })
    );
  }

  getMatches(){
    this.matches = this.footballService.getAllMatches(this.idCompet);
  }

}
