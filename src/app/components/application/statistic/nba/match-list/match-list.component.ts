import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbaService} from '../../../../../shared/services/Basketball/nba.service';
import {NbaGame} from '../../../../../shared/model/Basket/nba-game';
import {Subscription} from 'rxjs/internal/Subscription';
import {colors} from '../../../../../shared/services/Utils/color-operator'

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {

  matches: NbaGame[];
  scheduled: number = 0;
  final: number = 0;
  canceled: number = 0;
  betting: {closed: number, open: number}
  teams: {participation: number, team: string}[] = [];
  participationTable: {team:string, participation: number}[] = [];
  getTeams: any[] = [];
  data: any;
  dataOne: any;
  dataTwo: any;
  sub: Subscription;

  constructor(private nbaMatchesService: NbaService) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.nbaMatchesService.getAllMatches().subscribe(data => {
      this.matches = data;
      this.setStatus();
      this.setOpenOrClosed();
      this.setTeamsParticipation();
      this.setData();
      this.setDataOne();
      this.setDataTwo();
    });
  }

  setData(): void{
    const teams: any[] = [];
    const participations: any[] = [];

    for(const item of this.participationTable){
      teams.push(item.team);
      participations.push(item.participation);
    }

    this.data = {
      labels: teams,
      datasets: [
        {
          data: participations,
          backgroundColor: colors(),
          borderColor: colors(),
        }
      ]
    };
  }

  setStatus(): void{
    for(let matches of this.matches){
      if(matches.Status === 'Final'){
        this.final++
      }
      else if(matches.Status === 'Canceled'){
        this.canceled++
      }
      else{
        this.scheduled++
      }
    }
  }

  setOpenOrClosed(): void{
    this.betting = {closed:0, open:0}
    for(const match of this.matches){
      if(match.IsBettingClosed){
        this.betting.closed = this.betting.closed + 1
      }
      else{
        this.betting.open++
      }
    }
  }

  setTeamsParticipation(){
    const team: any[] = [];
    for(const match of this.matches){
      this.teams.push({participation:1, team: match.HomeTeam})
      this.teams.push({participation:1, team: match.AwayTeam})
      team.push(match.HomeTeam);
      team.push(match.AwayTeam);
    }

    this.getTeams = Array.from(new Set(team));
    const  participation = this.groupBy(this.teams, "team")

    for(const team of this.getTeams){
      this.participationTable.push({team: team, participation: participation[team].length})
    }
  }

  setDataOne(): void{
    const data : number[] = [this.scheduled, this.canceled, this.final];
    this.dataOne = {
      labels: ['Scheduled', 'Canceled', 'Final'],
      datasets: [
        {
          data: data,
          backgroundColor: colors(),
        }
      ]
    }

  }

  setDataTwo(): void{
    const data: number[] = [this.betting.closed, this.betting.open]
    this.dataTwo = {
      labels: ['closed bets', 'open bets'],
      datasets: [{
        data: data,
        backgroundColor: colors(),
      }]
    }
  }

  private groupBy(tableauObjets, propriete){
    return tableauObjets.reduce(function (acc, obj) {
      const cle = obj[propriete];
      if(!acc[cle]){
        acc[cle] = [];
      }
      acc[cle].push(obj);
      return acc;
    }, {});
  }

}
