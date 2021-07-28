import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { NbaGame } from 'src/app/shared/model/Basket/nba-game';
import { Bet } from 'src/app/shared/model/Bet/Bet';
import { BetService } from 'src/app/shared/services/bet-service/bet.service';
import { CustomDate } from '../../../../shared/services/Utils/DateOperator';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  providers: [CustomDate],
})
export class PanierComponent implements OnInit {
  myBet: Observable<Bet[]>;
  matches: Observable<NbaGame[]>;
  total = 0;
  loading = true;

  constructor(
    private betService: BetService,
    public customDate: CustomDate
  ) {}

  ngOnInit(): void {
    this.myBet = this.betService.getMyBetListNBA();
  }
}
