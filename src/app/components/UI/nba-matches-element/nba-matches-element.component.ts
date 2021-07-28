import {Component, Input, OnInit} from '@angular/core';
import {NbaGame} from '../../../shared/model/Basket/nba-game';
import {CustomDate} from '../../../shared/services/Utils/DateOperator';
import {DialogService} from 'primeng/dynamicdialog';
import {NbaBetDialogComponent} from '../nba-bet-dialog/nba-bet-dialog.component';
import {BetType} from '../../../shared/model/Bet/BetType';
import {Bet} from '../../../shared/model/Bet/Bet';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {Router} from '@angular/router';
import {NbaService} from '../../../shared/services/Basketball/nba.service';

@Component({
  selector: 'app-nba-matches-element',
  templateUrl: './nba-matches-element.component.html',
  styleUrls: ['./nba-matches-element.component.css'],
  providers: [CustomDate, DialogService]
})
export class NbaMatchesElementComponent implements OnInit {

  @Input() oneMatch!: NbaGame;
  @Input() betting!: boolean;
  @Input() choice!: BetType;
  @Input() pannier!: boolean;
  betNumber: number

  constructor(private nbaService: NbaService, public customDate: CustomDate, private dialogService: DialogService, private betService: BetService, private route: Router) { }

  ngOnInit(): void {
    console.log(this.pannier + "ez")
    }

  getSeverity(status: string): string {
    switch (status) {
      case 'Final':
        return 'primary';
      case 'Canceled':
        return 'danger';
      case 'F/OT':
        return 'info';
      case 'Scheduled':
        return 'success';
      default:
        return '';
    }
  }

  getMatchCotes() {
    return [
      {
        name: (this.oneMatch?.HomeTeamMoneyLine || 0).toFixed(2),
        value: {
          cote: this.oneMatch.HomeTeamMoneyLine,
          id: this.oneMatch.GameID,
          type: 1,
        },
      },
      {
        name: (this.oneMatch.AwayTeamMoneyLine || 0).toFixed(2),
        value: {
          cote: this.oneMatch.AwayTeamMoneyLine,
          id: this.oneMatch.GameID,
          type: 2,
        },
      },
    ];
  }

  showDialog(bet: string): void {
    if(!this.betting){
      this.dialogService.open(NbaBetDialogComponent, {
        data:{match: this.oneMatch, betting: true, bet: bet},
        header: "Pariez sur une équipe",
        width:'35%'
      });
    }
  }

  postBetting(){
    let multiplicator: number;
    switch (this.choice.id) {
      case '1':
        multiplicator = this.oneMatch.HomeTeamMoneyLine;
        break;
      case '2':
        multiplicator = this.oneMatch.AwayTeamMoneyLine;
        break;
    }
    const bet = new Bet();
    bet.match_id = this.oneMatch.GameID;
    bet.sport_category = 'nba';
    bet.amount_of_bets = this.betNumber;
    bet.multiplicator = multiplicator;
    bet.bet_type = this.choice;
    this.betService.postNewBet(bet).subscribe(_ => {location.reload()}, _ => {
      this.route.navigate(['/account/register']).then(_=>{location.reload()})
    });
  }
}
