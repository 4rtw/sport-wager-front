import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NbaGame } from 'src/app/shared/model/Basket/nba-game';
import { Bet } from 'src/app/shared/model/Bet/Bet';
import { NbaService } from 'src/app/shared/services/Basketball/nba.service';
import { BetService } from 'src/app/shared/services/bet-service/bet.service';
import { MatchService } from 'src/app/shared/services/Football/match.service';
import { UserService } from 'src/app/shared/services/Users/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit, OnDestroy {
  myBet: Bet[] = [];
  matches: NbaGame[] = [];
  sub: Subscription[] = [];
  total = 0;

  constructor(
    private betService: BetService,
    private footService: MatchService,
    private nbaService: NbaService,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getMyBets();
  }

  ngOnDestroy(): void {
    for (let subs of this.sub) {
      subs.unsubscribe();
    }
  }

  getMyBets(): void {
    this.sub.push(
      this.userService.getUserLoggedIn().subscribe((data) => {
        if (data.id !== 0) {
          this.sub.push(
            this.betService.getMyBetList().subscribe((response) => {
              for (let bet of response) {
                if (!bet.collected) {
                  this.myBet.push(bet);
                }
              }
              this.getMatches();
              this.setTotalValue();
            })
          );
        }
      })
    );
  }

  getMatches(): void {
    for (let bet of this.myBet) {
      if (bet.sport_category === 'nba') {
        this.sub.push(
          this.nbaService.getAllMatches().subscribe((response) => {
            for (let match of response) {
              if (match.GameID === bet.match_id) {
                this.matches.push(match);
              }
            }
            this.cd.detectChanges();
          })
        );
      }
      if (bet.sport_category === 'football') {
        this.sub.push();
      }
    }
  }

  setTotalValue(): void {
    for (let i of this.myBet) {
      this.total += i.amount_of_bets;
    }
  }
}
