import {Component, Input, OnInit} from '@angular/core';
import {CustomDate} from '../../../shared/services/Utils/DateOperator';
import {FootballGames} from '../../../shared/model/Foot/foot';
import {TeamsService} from '../../../shared/services/Teams/teams.service';
import {Observable} from 'rxjs';
import {Team} from '../../../shared/model/Foot/team';
import {DialogService} from 'primeng/dynamicdialog';
import {FootballBetDialogComponent} from '../football-bet-dialog/football-bet-dialog.component';
import {BetType} from '../../../shared/model/Bet/BetType';
import {BetService} from '../../../shared/services/bet-service/bet.service';
import {Bet} from '../../../shared/model/Bet/Bet';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from '../../../shared/services/Football/match.service'


@Component({
  selector: 'app-football-bet-element',
  templateUrl: './football-bet-element.component.html',
  styleUrls: ['./football-bet-element.component.scss'],
  providers: [DialogService]
})
export class FootballBetElementComponent implements OnInit {

  @Input() match_id!: number;
  @Input() match!: FootballGames;
  @Input() betting: boolean;
  @Input() choice: BetType;
  getHomeTeamDetails: Observable<Team>;
  getAwayTeamDetails: Observable<Team>;
  betNumber: number;

  constructor(
      public customDate: CustomDate,
      private teamService: TeamsService,
      private matchService: MatchService,
      private dialogService: DialogService,
      private betService: BetService,
      private route: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(!this.match && this.match_id){
      this.match = this.matchService
    }
    this.activatedRoute.queryParams.subscribe(params=>{
      const competitionId = params.competitionID;
      this.getHomeTeamDetails = this.teamService.getTeamDetails(competitionId,this.match.homeTeam.id);
      this.getAwayTeamDetails = this.teamService.getTeamDetails(competitionId,this.match.awayTeam.id);
    })
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
