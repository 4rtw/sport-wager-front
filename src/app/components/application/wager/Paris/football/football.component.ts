import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Competitions} from '../../../../../shared/model/Foot/competitions';
import {FootballGames} from '../../../../../shared/model/Foot/foot';
import {MatchService} from '../../../../../shared/services/Football/match.service';
import {Calendar} from 'primeng/calendar';
import {CustomDate} from '../../../../../shared/services/Utils/DateOperator';
import {Bet} from 'src/app/shared/model/Bet/Bet';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {CompetitionService} from '../../../../../shared/services/Football/competition.service';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss'],
  providers: [CustomDate],
})
export class FootballComponent implements OnInit {
  date: Date = new Date();
  competitions: Competitions[];
  matches: Observable<FootballGames[]>;
  loading: boolean = false;
  responsiveOptions;
  @ViewChild('calendar') calendar: Calendar;
  idCompet: number = 0;
  bet: Bet = new Bet();
  amount = 0;
  activeCompetition: Observable<Competitions>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private footballService: MatchService,
    private activatedRoute: ActivatedRoute,
    private competitionService: CompetitionService,
    public customDate: CustomDate
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.getCompetitionId();
  }

  getCompetitionId(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      params.competitionID ? this.idCompet = params.competitionID : this.idCompet = 0;
      this.matches = this.footballService.getMatches(this.idCompet, this.date);
      this.activeCompetition = this.competitionService.getCompetition(this.idCompet);
    })
  }

  clickPreviousOrNext(sens: string): void {
    let sign: number;
    sens === 'next' ? (sign = 1) : (sign = -1);
    this.date.setDate(this.date.getDate() + sign);
    this.calendar.updateInputfield();
    this.matches = this.footballService.getMatches(this.idCompet, this.date);
  }

  onSelectedDate($event): void {
    this.date = $event;
    this.calendar.updateInputfield();
    this.matches = this.footballService.getMatches(this.idCompet, this.date);
  }

  convertToDate(stringValue): Date{
    return new Date(stringValue);
  }
  
}
