import { ChangeDetectorRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Bet } from 'src/app/shared/model/Bet/Bet';
import { BetType } from 'src/app/shared/model/Bet/BetType';
import { NbaService } from 'src/app/shared/services/Basketball/nba.service';
import { BetService } from 'src/app/shared/services/bet-service/bet.service';

@Component({
  selector: 'app-bet-post',
  templateUrl: './bet-post.component.html',
  styleUrls: ['./bet-post.component.css'],
})
export class BetPostComponent implements OnInit, OnDestroy {
  name = '';
  bet = 0;
  match: any[] = [];
  sub: Subscription[] = [];
  betAmount = 0;
  multiplicator = 0;
  type = { _id: '', id: '', description: '', bet_type: '' };

  constructor(
    public config: DynamicDialogConfig,
    private nbaService: NbaService,
    private betService: BetService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.config.data.bet);
    this.getMatchesDetails();
  }

  ngOnDestroy(): void {
    for (let subscribe of this.sub) {
      subscribe.unsubscribe();
    }
  }

  getMatchesDetails(): void {
    if (this.config.data.type === 'nba') {
      this.getNbaMatch();
    }
    if (this.config.data.type === 'foot') {
      this.getFootballMatch();
    }
  }

  getNbaMatch(): void {
    this.sub.push(
      this.nbaService.getAllMatches().subscribe((data) => {
        for (let match of data) {
          if (match.GameID === this.config.data.bet.id) {
            this.match.push(match);
            this.setBetTypes();
            this.changeDetector.detectChanges();
            console.log(this.match[0]);
          }
        }
      })
    );
  }

  getFootballMatch(): void {}

  setBetTypes(): void {
    this.sub.push(
      this.betService.getBetTypes().subscribe((data) => {
        for (let type of data) {
          if (this.config.data.bet.type == type.id) {
            this.type._id = type._id;
            this.type.id = type.id.toString();
            this.type.description = type.description.toString();
            this.type.bet_type = type.bet_type.toString();
            this.changeDetector.detectChanges();
            if (type.id === '1') {
              this.multiplicator = this.match[0].HomeTeamMoneyLine || 0;
            }
            if (type.id === '2') {
              this.multiplicator = this.match[0].AwayTeamMoneyLine || 0;
            }
          }
        }
      })
    );
  }

  postBet() {
    let bet: Bet = new Bet();
    bet.amount_of_bets = this.betAmount;
    bet.match_id = this.config.data.bet.id;
    bet.bet_type = this.type;
    bet.multiplicator = this.multiplicator;
    bet.sport_category = this.config.data.type;
    this.sub.push(
      this.betService.postNewBet(bet).subscribe((_) => {
        location.reload();
      })
    );
  }
}
