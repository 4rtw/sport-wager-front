import {Component, Input, OnInit} from '@angular/core';
import {CustomDate} from '../../../shared/services/Utils/DateOperator';
import {MatchService} from '../../../shared/services/Football/match.service';
import {FootballGames} from '../../../shared/model/Foot/foot';
import {TeamsService} from '../../../shared/services/Teams/teams.service';
import {Observable} from 'rxjs';
import {Team} from '../../../shared/model/Foot/team';
import {DialogService} from 'primeng/dynamicdialog';
import {FootballBetDialogComponent} from '../football-bet-dialog/football-bet-dialog.component';
import {BetType} from '../../../shared/model/Bet/BetType';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {Bet} from '../../../shared/model/Bet/Bet';
import {Router} from '@angular/router';


@Component({
  selector: 'app-football-bet-element',
  templateUrl: './football-bet-element.component.html',
  styleUrls: ['./football-bet-element.component.scss'],
  providers: [DialogService]
})
export class FootballBetElementComponent implements OnInit {

  @Input() match!: FootballGames;
  @Input() betting: boolean;
  @Input() choice: BetType;
  getHomeTeamDetails: Observable<Team>;
  getAwayTeamDetails: Observable<Team>;
  betNumber: number;

  constructor(
      public customDate: CustomDate,
      private matchService: MatchService,
      private teamService: TeamsService,
      private dialogService: DialogService,
      private betService: BetService,
      private route: Router
  ) { }

  ngOnInit(): void {
    this.getHomeTeamDetails = this.teamService.getTeamDetails(this.match.homeTeam.id);
    this.getAwayTeamDetails = this.teamService.getTeamDetails(this.match.awayTeam.id);
  }

  showDialog(bet): void{
    if (!this.betting){
      const match = this.match;
      this.dialogService.open(FootballBetDialogComponent,{
        data: {bet, match},
        header: 'Pariez sur votre équipe ou sur un match nul',
        width: '35%',
      });
    }
  }

  postBetting() :void{
    let multiplicator: number;
    switch (this.choice.id) {
      case '1':
        multiplicator = this.match.odds.homeWin;
        break;
      case '2':
        multiplicator = this.match.odds.awayWin;
        break;
      case 'X':
        multiplicator = this.match.odds.draw
        break;
    }
    const bet = new Bet();
    bet.match_id = this.match.id;
    bet.sport_category = 'football';
    bet.amount_of_bets = this.betNumber;
    bet.multiplicator = multiplicator;
    bet.bet_type = this.choice;
    this.betService.postNewBet(bet).subscribe(_ => {location.reload()}, _ => {
      this.route.navigate(['/account/register']).then(_=>{location.reload()})
    });
  }
}
