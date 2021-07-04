import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NbaService } from '../../../../../shared/services/Basketball/nba.service';
import { NbaGame } from '../../../../../shared/model/Basket/nba-game';
import { Subscription } from 'rxjs';
import { Calendar } from 'primeng/calendar';
import { CustomDate } from '../../../../../shared/services/Utils/DateOperator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FootballComponent } from '../football/football.component';
import { BetPostComponent } from '../bet-post/bet-post.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nba-matches',
  templateUrl: './nba-matches.component.html',
  styleUrls: ['../../wager.component.css', 'nba-matches.component.css'],
  providers: [CustomDate, DialogService],
})
export class NbaMatchesComponent implements OnInit, OnDestroy {
  matches: NbaGame[] = [];
  matchesSub: Subscription;
  cote = 0;
  date = new Date();
  loading: boolean;
  //showAmount = false;
  //amount = 0;
  ref: DynamicDialogRef;

  @ViewChild('calendar') calendar: Calendar;

  constructor(
    private nbaService: NbaService,
    private changeDetector: ChangeDetectorRef,
    public customDate: CustomDate,
    public dialogService: DialogService
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
          type: 1,
        },
      },
      {
        name: (match.AwayTeamMoneyLine || 0).toFixed(2),
        value: {
          cote: match.AwayTeamMoneyLine,
          id: match.GameID,
          type: 2,
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

  onClick($event): void {
    let betData = $event.option.value;
    //this.bet.match_id = betData.GameID;
    //this.bet.multiplicator = betData.cote;
    //this.bet.sport_category = 'nba';
    //this.showAmount = true;
    this.showDialog(betData);
  }

  showDialog(betData): void {
    this.ref = this.dialogService.open(BetPostComponent, {
      header: 'Vous allez parier',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { bet: betData },
    });

    this.ref.onClose.subscribe((_) => {});
  }

  changeTest() {
    console.log('ttt');
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
