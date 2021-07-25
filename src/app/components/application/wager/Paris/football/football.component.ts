import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionService } from '../../../../../shared/services/Football/competition.service';
import { Competitions } from '../../../../../shared/model/Foot/competitions';
import { FootballGames } from '../../../../../shared/model/Foot/foot';
import { MatchService } from '../../../../../shared/services/Football/match.service';
import { Calendar } from 'primeng/calendar';
import { CustomDate } from '../../../../../shared/services/Utils/DateOperator';
import { Bet } from 'src/app/shared/model/Bet/Bet';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css'],
  providers: [CustomDate],
})
export class FootballComponent implements OnInit {
  activeCompetition: Competitions;
  date: Date = new Date();
  competitions: Competitions[];
  matches: FootballGames[];
  loading: boolean;
  loadingMatches: boolean;
  responsiveOptions;
  @ViewChild('calendar') calendar: Calendar;
  bet: Bet = new Bet();
  showAmount = false;
  amount = 0;

  constructor(
    private competitionService: CompetitionService,
    private changeDetector: ChangeDetectorRef,
    private footballService: MatchService,
    public customDate: CustomDate,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadingMatches = true;
    this.getCompetitions();
  }

  getCompetitions(): void {
    this.competitionService.getCompetitions().subscribe((x) => {
      this.competitions = x;
      this.loading = false;
      console.log(this.competitions)
      this.activeCompetition = this.competitions[0];
      this.getMatches();
      this.changeDetector.detectChanges();
    });
  }

  getMatches(): void {
    this.loadingMatches = true;
    this.matches = [];
    this.footballService
      .getMatches(this.activeCompetition?.id, this.date)
      .subscribe((x) => {
        this.matches = x;
        this.loadingMatches = false;
        //console.log(x);
        this.calendar.updateInputfield();
        this.changeDetector.detectChanges();
      });
  }

  getSeverity(match: FootballGames): string {
    switch (match.status) {
      case 'FINISHED':
        return 'primary';
      case 'Canceled':
        return 'danger';
      case 'F/OT':
        return 'info';
      case 'SCHEDULED':
        return 'success';
      default:
        return '';
    }
  }

  clickPreviousOrNext(sens: string): void {
    let sign: number;
    sens === 'next' ? (sign = 1) : (sign = -1);
    this.date.setDate(this.date.getDate() + sign);
    this.getMatches();
  }

  onSelectedDate($event): void {
    this.date = $event;
    console.log(this.activeCompetition.id);
    this.getMatches();
  }

  changeCompetition(competition: Competitions): void {
    this.activeCompetition = competition;
    this.getMatches();
  }

  onClick(match: FootballGames): void {
    let bet: Bet = new Bet();
    bet.match_id = match.id;
    bet.sport_category = 'nba';
    bet.amount_of_bets = 0;
    this.showAmount = !this.showAmount;
  }

  /*
   * TODO change to real value
   * */
  getMatchCotes(match: FootballGames): any {
    return [
      {
        name: '2.30',
        value: match.homeTeam.id,
      },
      {
        name: '2.30',
        value: match.awayTeam.id,
      },
      {
        name: '2.30',
        value: match.awayTeam.name,
      },
    ];
  }
}
