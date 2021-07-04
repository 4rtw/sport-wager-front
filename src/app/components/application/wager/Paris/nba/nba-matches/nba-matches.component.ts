import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NbaService } from '../../../../../../shared/services/Basketball/nba.service';
import { NbaGame } from '../../../../../../shared/model/Basket/nba-game';
import { Subscription } from 'rxjs';
import { Calendar } from 'primeng/calendar';
import { CustomDate } from '../../../../../../shared/services/Utils/DateOperator';

@Component({
  selector: 'app-nba-matches',
  templateUrl: './nba-matches.component.html',
  styleUrls: ['../../../wager.component.css', 'nba-matches.component.css'],
  providers: [CustomDate],
})
export class NbaMatchesComponent implements OnInit, OnDestroy {
  matches: NbaGame[] = [];
  matchesSub: Subscription;
  cote = 0;
  date = new Date();
  value1;
  loading: boolean;

  @ViewChild('calendar') calendar: Calendar;

  constructor(
    private nbaService: NbaService,
    private changeDetector: ChangeDetectorRef,
    public customDate: CustomDate
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getMatches(this.date);
  }

  getMatchCotes(match: NbaGame): any {
    return [
      {
        name: (match.HomeTeamMoneyLine || 0).toFixed(2),
        value: {
          cote: match.HomeTeamMoneyLine,
          id: match.GameID,
          side: match.HomeTeamID,
        },
      },
      {
        name: (match.AwayTeamMoneyLine || 0).toFixed(2),
        value: {
          cote: match.AwayTeamMoneyLine,
          id: match.GameID,
          side: match.AwayTeamID,
        },
      },
    ];
  }

  getSeverity(match: NbaGame): string {
    switch (match.Status) {
      case 'Final':
        return 'primary';
      case 'Canceled':
        return 'danger';
      case 'F/OT':
        return 'info';
      case 'Scheduled':
        return 'success';
      default:
        return '';
    }
  }

  onClick(match): void {
    console.log('clicked');
    console.log(match);
    // TODO make panier and disable button
    
    //Disable button
    
  }

  ngOnDestroy(): void {
    this.matchesSub.unsubscribe();
  }

  getMatches(date: Date): void {
    this.matches = [];
    this.loading = true;
    this.matchesSub = this.nbaService
      .getMatches(this.customDate.formatDate(date))
      .subscribe((data) => {
        this.matches = data;
        this.calendar.updateInputfield();
        this.changeDetector.detectChanges();
        this.loading = false;
      });
  }

  onSelectedDate($event: any): void {
    this.getMatches($event);
  }

  clickPreviousOrNext(sens: string): void {
    let sign: number;
    sens === 'next' ? (sign = 1) : (sign = -1);
    this.date.setDate(this.date.getDate() + sign);
    this.getMatches(this.date);
  }
}
