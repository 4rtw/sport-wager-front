import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomDate } from '../../../../shared/services/Utils/DateOperator';
import { MatchService } from '../../../../shared/services/Football/match.service';
import { FootballGames } from '../../../../shared/model/Foot/foot';
import { TeamsService } from '../../../../shared/services/Teams/teams.service';
import { Observable, Subscription } from 'rxjs';
import { Team } from '../../../../shared/model/Foot/team';
import { DialogService } from 'primeng/dynamicdialog';
import { BetService } from '../../../../shared/services/bet-service/bet.service';
import { Bet } from '../../../../shared/model/Bet/Bet';
import { ActivatedRoute, Router } from '@angular/router';
import { BetType } from '../../../../shared/model/Bet/BetType';

@Component({
  selector: 'app-football-bet-element',
  templateUrl: './football-bet-element.component.html',
  styleUrls: ['./football-bet-element.component.scss'],
  providers: [DialogService, CustomDate],
})
export class FootballBetElementComponent implements OnInit, OnDestroy {
  competitionID!: string;
  @Input() match!: FootballGames;
  betting: boolean;
  showQR = false;
  qrValue;

  choice: BetType;
  choiceDictionnary: { home: boolean; draw: boolean; away: boolean };
  multiplicator: number = 0;

  getHomeTeamDetails: Observable<Team>;
  getAwayTeamDetails: Observable<Team>;

  betNumber: number;
  sub: Subscription[] = [];

  constructor(
    public customDate: CustomDate,
    private matchService: MatchService,
    private teamService: TeamsService,
    private betService: BetService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    for (const i of this.sub) {
      i.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sub.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        if (!this.competitionID) {
          if (params.competitionID) {
            this.competitionID = params.competitionID || '2002';
          } else {
            this.competitionID = '2002';
          }

          const qr = {
            matchID: this.match.id,
            type: 'football',
            competitionID: this.competitionID
          }

          this.qrValue = JSON.stringify(qr);
        }
        this.setTeams();
      })
    );
  }

  toogleQR(){
    this.showQR = !this.showQR;
  }

  private setTeams() {
    this.getHomeTeamDetails = this.teamService.getTeamDetails(
      this.competitionID,
      this.match?.homeTeam.id
    );
    this.getAwayTeamDetails = this.teamService.getTeamDetails(
      this.competitionID,
      this.match?.awayTeam.id
    );
  }

  clickOneOption(type: string, odds: number) {
    if (this.betting) {
      this.reset();
    } else {
      this.betting = true;
      this.choiceDictionnary = { home: true, draw: true, away: true };
      switch (type) {
        case '1':
          this.choiceDictionnary.home = false;
          this.defineChoice(type, odds);
          break;
        case 'X':
          this.choiceDictionnary.draw = false;
          this.defineChoice(type, odds);
          break;
        case '2':
          this.choiceDictionnary.away = false;
          this.defineChoice(type, odds);
          break;
      }
    }
  }

  defineChoice(choice: string, odds: number) {
    this.choice = {
      id: choice,
      description: 'Away team win',
      bet_type: '1X2',
    };
    this.multiplicator = odds;
  }

  reset() {
    this.betting = false;
    this.choiceDictionnary = { home: false, draw: false, away: false };
  }

  postBetting(): void {
    const bet = this.defineBet();
    this.sub.push(
      this.betService.postNewBet(bet).subscribe(
        (_) => {
          location.reload();
        },
        (error) => {
          if (error.status === 401) {
            this.route.navigate(['/register']).then((_) => {
              location.reload();
            });
          } else {
            console.log(error.status);
          }
        }
      )
    );
  }

  defineBet(): Bet {
    const bet = new Bet();
    bet.match_id = this.match.id;
    bet.sport_category = 'football';
    bet.amount_of_bets = this.betNumber;
    bet.bet_type = this.choice;
    bet.multiplicator = this.multiplicator;
    bet.match_info = {
      competition: parseInt(
        this.competitionID
          ? this.competitionID === '0'
            ? '2002'
            : this.competitionID
          : '2002'
      ),
      match_id: this.match.id,
      away_team: this.match.awayTeam.name,
      home_team: this.match.homeTeam.name,
    };
    return bet;
  }
}
