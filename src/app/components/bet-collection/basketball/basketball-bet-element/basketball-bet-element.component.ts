import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NbaGame } from 'src/app/shared/model/Basket/nba-game';
import { BetType } from 'src/app/shared/model/Bet/BetType';
import { CustomDate } from 'src/app/shared/services/Utils/DateOperator';

@Component({
  selector: 'app-basketball-bet-element',
  templateUrl: './basketball-bet-element.component.html',
  styleUrls: ['./basketball-bet-element.component.scss'],
  providers: [CustomDate],
})
export class BasketballBetElementComponent implements OnInit, OnDestroy {
  @Input() match!: NbaGame;
  betting: boolean;
  choice: BetType;
  choiceDictionnary: { home: boolean; away: boolean };
  multiplicator: number = 0;
  betNumber: number;
  sub: Subscription[] = [];

  constructor(public customDate: CustomDate) {}

  ngOnInit(): void {
    console.log(this.match.AwayTeamScore);
  }

  ngOnDestroy(): void {
    for (const i of this.sub) {
      i.unsubscribe();
    }
  }
}
