import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomDate} from '../../../../shared/services/Utils/DateOperator';
import {MatchService} from '../../../../shared/services/Football/match.service';
import {FootballGames} from '../../../../shared/model/Foot/foot';
import {TeamsService} from '../../../../shared/services/Teams/teams.service';
import {Observable, Subscription} from 'rxjs';
import {Team} from '../../../../shared/model/Foot/team';
import {DialogService} from 'primeng/dynamicdialog';
import {FootballBetDialogComponent} from '../football-bet-dialog/football-bet-dialog.component';
import {BetService} from '../../../../shared/services/bet-service/bet.service';
import {Bet} from '../../../../shared/model/Bet/Bet';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-football-bet-element',
  templateUrl: './football-bet-element.component.html',
  styleUrls: ['./football-bet-element.component.scss'],
  providers: [DialogService, CustomDate]
})
export class FootballBetElementComponent implements OnInit, OnDestroy {

  @Input() matchID!: number;
  @Input() competitionID!:string;
  @Input() match!: FootballGames;
  @Input() betting: boolean;
  @Input() inPanier: boolean;
  @Input() choice: Bet;
  getHomeTeamDetails: Observable<Team>;
  getAwayTeamDetails: Observable<Team>;
  betNumber: number;
  sub: Subscription[] = [];

  constructor(
      public customDate: CustomDate,
      private matchService: MatchService,
      private teamService: TeamsService,
      private dialogService: DialogService,
      private betService: BetService,
      private route: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
        for(const i of this.sub){
          i.unsubscribe();
        }
    }

  ngOnInit(): void {
    this.sub.push(
        this.activatedRoute.queryParams.subscribe(params=>{
          if(!this.competitionID){
            if(params.competitionID){
              this.competitionID=params.competitionID || '2002';
            }
            else{
              this.competitionID='2002';
            }
          }
          this.setMatch();
        })
    );
  }

  setMatch(): void{
    if(!this.match && this.matchID){
      this.matchService.getMatche(this.matchID, this.competitionID).subscribe(
          x=>{
            this.match=x;
            this.setTeams();
          })
    }
    else{
      this.setTeams();
    }
  }

    private setTeams(){
      this.getHomeTeamDetails = this.teamService.getTeamDetails(this.competitionID,this.match?.homeTeam.id);
      this.getAwayTeamDetails = this.teamService.getTeamDetails(this.competitionID,this.match?.awayTeam.id);
  }

  showDialog(betType, multiplicator): void{
    if(!this.inPanier){
      if (!this.betting){

        const match = this.match;
        const myBet = new Bet();

        myBet.match_id = match.id;
        myBet.sport_category = 'football';
        myBet.amount_of_bets = this.betNumber;
        myBet.multiplicator = multiplicator;

        this.dialogService.open(FootballBetDialogComponent,{
          data: {myBet,betType, match},
          header: 'Pariez sur votre équipe ou sur un match nul',
          width: '35%',
          style: 'background: black',
          contentStyle: 'background: black'
        });
      }
    }
  }

  postBetting() :void{
    if(!this.inPanier){

      const bet = new Bet();
      bet.match_id = this.match.id;
      bet.sport_category = 'football';
      bet.amount_of_bets = this.betNumber;
      bet.multiplicator = this.choice.multiplicator;
      bet.bet_type = this.choice.bet_type;
      console.log(bet.multiplicator);

      this.sub.push(
          this.betService.postNewBet(bet).subscribe(_ => {location.reload()}, _ => {
            this.route.navigate(['/account/register']).then(_=>{location.reload()})
          })
      );
    }
  }
}
