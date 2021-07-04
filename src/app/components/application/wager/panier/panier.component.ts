import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bet } from 'src/app/shared/model/Bet/Bet';
import { BetService } from 'src/app/shared/services/bet-service/bet.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  myBet: Bet[] = [];
  sub: Subscription[] = [];

  constructor(private betService: BetService) {}

  ngOnInit(): void {
    this.sub.push(
      this.betService.getMyBetList().subscribe((response) => {
        for (let bet of response) {
          if (!bet.collected) {
            this.myBet.push(bet);
          }
        }
        console.log(this.myBet);
      })
    );
  }
}
