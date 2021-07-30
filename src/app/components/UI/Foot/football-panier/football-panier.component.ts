import { Component, OnInit } from '@angular/core';
import {BetService} from '../../../../shared/services/bet-service/bet.service';
import {Observable, Subscription} from 'rxjs';
import {Bet} from '../../../../shared/model/Bet/Bet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-football-panier',
  templateUrl: './football-panier.component.html',
  styleUrls: ['./football-panier.component.css']
})
export class FootballPanierComponent implements OnInit {
  myBets: Observable<Bet[]>
  competitionID: string;
  sub: Subscription;

  constructor(private betService: BetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.competitionID = params.competitionID;
      this.myBets = this.betService.getMyBetListFoot(this.competitionID);
    })
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
}
