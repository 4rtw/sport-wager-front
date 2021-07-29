import {Component, OnDestroy, OnInit} from '@angular/core';
import {FootballGames} from '../../../shared/model/Foot/foot';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BetType} from '../../../shared/model/Bet/BetType';
import {Observable, Subscription} from 'rxjs';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {Bet} from '../../../shared/model/Bet/Bet';

@Component({
  selector: 'app-football-bet-dialog',
  templateUrl: './football-bet-dialog.component.html',
  styleUrls: ['./football-bet-dialog.component.css']
})
export class FootballBetDialogComponent implements OnInit, OnDestroy {

  match: FootballGames;
  betType: BetType;
  bet : Bet;
  sub: Subscription;

  constructor(public config: DynamicDialogConfig, private betService: BetService) { }

  ngOnInit(): void {
    this.sub = this.betService.getBetType(this.config.data.betType).subscribe(data => {
      this.match = this.config.data.match;
      this.bet = this.config.data.myBet;
      this.bet.bet_type = data;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
