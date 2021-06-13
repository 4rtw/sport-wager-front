import {Component, OnInit, ViewChild} from '@angular/core';
import {NbaService} from '../../../../shared/services/nba.service';
import {NbaGame} from '../../../../shared/model/nba-game';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nba-matches',
  templateUrl: './nba-matches.component.html',
  styleUrls: ['../../wager/wager.component.css', 'nba-matches.component.css']
})
export class NbaMatchesComponent implements OnInit {

  matches: NbaGame[] = [];
  matchesSub: Subscription;
  cote = 0;
  value1;

  constructor(
      private nbaService: NbaService,
  ) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    this.matchesSub = this.nbaService.getMatches().subscribe(
        matches => {
          this.matches = matches;
        }
    );

    setTimeout( () => {
      this.matchesSub.unsubscribe();
    }, 3000);
  }

  getDateTime(d, type): string{
    const date = new Date(d);
    if (type === 'date'){
      return date.toLocaleDateString();
    }
    if (type === 'time'){
      return date.toLocaleTimeString().substr(0, 5);
    }
  }

  getMatchCotes(match: NbaGame): any{
    return [
      {name: (match.HomeTeamMoneyLine || 0).toFixed(2), value: {cote: match.HomeTeamMoneyLine, id: match.GameID, side: 'Home'}},
      {name: (match.AwayTeamMoneyLine || 0).toFixed(2), value: {cote: match.AwayTeamMoneyLine, id: match.GameID, side: 'Away'}},
    ];
  }

  getSeverity(match: NbaGame): string{
    switch (match.Status){
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

  onClick(): void{
    console.log('click');
  }
}
