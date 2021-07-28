import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import { NbaService } from '../../../../../shared/services/Basketball/nba.service';
import { NbaGame } from '../../../../../shared/model/Basket/nba-game';
import {Observable, Subscription} from 'rxjs';
import { Calendar } from 'primeng/calendar';
import { CustomDate } from '../../../../../shared/services/Utils/DateOperator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BetPostComponent } from '../bet-post/bet-post.component';

@Component({
  selector: 'app-nba-matches',
  templateUrl: './nba-matches.component.html',
  styleUrls: ['../../wager.component.scss', 'nba-matches.component.css'],
  providers: [CustomDate, DialogService],
})
export class NbaMatchesComponent implements OnInit {
  matches: Observable<NbaGame[]>;
  cote = 0;
  date = new Date();
  loadig: boolean;

  @ViewChild('calendar') calendar: Calendar;

  constructor(
    private nbaService: NbaService,
    public customDate: CustomDate,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
  }

  getMatches(date): void {
    this.matches = this.nbaService.getMatches(this.customDate.formatDate(date));
  }

  onSelectedDate($event: any): void {
    this.getMatches($event)
  }

  clickPreviousOrNext(sens: string): void {
    let sign: number;
    sens === 'next' ? (sign = 1) : (sign = -1);
    this.date.setDate(this.date.getDate() + sign);
    this.calendar.updateInputfield();
    this.getMatches(this.date);
  }
}
