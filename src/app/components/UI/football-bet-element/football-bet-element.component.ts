import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomDate} from '../../../shared/services/Utils/DateOperator';
import {MatchService} from '../../../shared/services/Football/match.service';
import {FootballGames} from '../../../shared/model/Foot/foot';
import {TeamsService} from '../../../shared/services/Teams/teams.service';
import {Observable} from 'rxjs';
import {Team} from '../../../shared/model/Foot/team';

@Component({
  selector: 'app-football-bet-element',
  templateUrl: './football-bet-element.component.html',
  styleUrls: ['./football-bet-element.component.scss']
})
export class FootballBetElementComponent implements OnInit {

  @Input() match!: FootballGames;
  getHomeTeamDetails: Observable<Team>;
  getAwayTeamDetails: Observable<Team>;

  constructor(
      public customDate: CustomDate,
      private matchService: MatchService,
      private teamService: TeamsService
  ) { }

  ngOnInit(): void {
    this.getHomeTeamDetails = this.teamService.getTeamDetails(this.match.homeTeam.id);
    this.getAwayTeamDetails = this.teamService.getTeamDetails(this.match.awayTeam.id);
  }
}
