import { Component, OnInit } from '@angular/core';
import {FootballGames} from '../../../shared/model/Foot/foot';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BetType} from '../../../shared/model/Bet/BetType';
import {Observable} from 'rxjs';
import {BetService} from '../../../shared/services/bet-service/bet.service';

@Component({
  selector: 'app-football-bet-dialog',
  templateUrl: './football-bet-dialog.component.html',
  styleUrls: ['./football-bet-dialog.component.css']
})
export class FootballBetDialogComponent implements OnInit {

  match: FootballGames;
  betType: Observable<BetType>;

  constructor(public config: DynamicDialogConfig, private betService: BetService) { }

  ngOnInit(): void {
    this.match = this.config.data.match;
    this.betType = this.betService.getBetType(this.config.data.bet);
  }

}
