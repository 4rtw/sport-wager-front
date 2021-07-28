import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {NbaGame} from '../../../shared/model/Basket/nba-game';
import {Observable} from 'rxjs';
import {BetType} from '../../../shared/model/Bet/BetType';
import {BetService} from '../../../shared/services/bet-service/bet.service';

@Component({
  selector: 'app-nba-bet-dialog',
  templateUrl: './nba-bet-dialog.component.html',
  styleUrls: ['./nba-bet-dialog.component.css'],
  providers: [DialogService]
})
export class NbaBetDialogComponent implements OnInit {


  match: NbaGame;
  betType: Observable<BetType>

  constructor(private config: DynamicDialogConfig, private betService: BetService) { }

  ngOnInit(): void {
    this.match = this.config.data.match;
    console.log(this.config.data.bet);
    this.betType = this.betService.getBetType(this.config.data.bet);
  }

}
