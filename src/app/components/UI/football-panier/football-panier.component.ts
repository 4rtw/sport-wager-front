import { Component, OnInit } from '@angular/core';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {Observable} from 'rxjs';
import {Bet} from '../../../shared/model/Bet/Bet';

@Component({
  selector: 'app-football-panier',
  templateUrl: './football-panier.component.html',
  styleUrls: ['./football-panier.component.css']
})
export class FootballPanierComponent implements OnInit {
  myBets: Observable<Bet[]>

  constructor(private betService: BetService) { }

  ngOnInit(): void {
    this.myBets = this.betService.getMyBetListFoot();
  }

}
