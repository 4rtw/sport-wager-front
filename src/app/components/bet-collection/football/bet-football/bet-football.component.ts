import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Calendar} from 'primeng/calendar';
import {Observable, Subscription} from 'rxjs';
import {FootballGames} from '../../../../shared/model/Foot/foot';
import {MatchService} from '../../../../shared/services/Football/match.service';
import {ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../../../shared/services/Football/competition.service';
import {Competitions} from '../../../../shared/model/Foot/competitions';
import {InputSwitch} from 'primeng/inputswitch';

@Component({
  selector: 'app-bet-football',
  templateUrl: './bet-football.component.html',
  styleUrls: ['./bet-football.component.css']
})
export class BetFootballComponent implements OnDestroy,OnInit {

  matches: Observable<FootballGames[]>;
  activeCompetition: Observable<Competitions>;
  idCompet: number = 0;

  range: boolean = false;
  date: Date = new Date();
  rangeDate: Date[];
  @ViewChild('calendarRange') calendarRange: Calendar;
  @ViewChild('calendarSingle') calendarSingle: Calendar;
  @ViewChild('inputSwitch') inputSwitch: InputSwitch;
  sub: Subscription[] = [];

  constructor(private footballService: MatchService,
              private activatedRoute: ActivatedRoute,
              private competitionService: CompetitionService,) { }

  ngOnDestroy(): void {
    for(const i of this.sub){
      i.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCompetitionId()
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
    if(this.range && this.rangeDate){
      if(this.rangeDate[1]){
        this.matches = this.footballService.getMatchesByRangeDate(this.idCompet, this.rangeDate);
      }
    }
    else if(!this.range){
        this.matches = this.footballService.getMatches(this.idCompet, this.date);
    }
  }

}
