import { Component, OnInit } from '@angular/core';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {CustomDate} from '../../../shared/services/Utils/DateOperator';
import {Observable} from 'rxjs';
import {Bet} from '../../../shared/model/Bet/Bet';

@Component({
  selector: 'app-panier-collected',
  templateUrl: './panier-collected.component.html',
  styleUrls: ['./panier-collected.component.css'],
  providers: [CustomDate]
})
export class PanierCollectedComponent implements OnInit {
  myBet: Observable<Bet[]>;

  constructor(
      private betService: BetService,
      public customDate: CustomDate
  ) { }

  ngOnInit(): void {
    this.myBet = this.betService.getMyBetList();
  }

}
