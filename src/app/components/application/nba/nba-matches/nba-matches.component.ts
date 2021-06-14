import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NbaService} from '../../../../shared/services/nba.service';
import {NbaGame} from '../../../../shared/model/nba-game';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-nba-matches',
  templateUrl: './nba-matches.component.html',
  styleUrls: ['../../wager/wager.component.css', 'nba-matches.component.css']
})
export class NbaMatchesComponent implements OnInit, OnDestroy {

  matches: NbaGame[] = [];
  matchesSub: Subscription;
  cote = 0;
  date = new Date();
  value1;

  constructor(
      private nbaService: NbaService,
      private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getMatches(this.date);
  }

  formatDate(date: Date): string{
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
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
      {name: (match.HomeTeamMoneyLine || 0).toFixed(2), value: {cote: match.HomeTeamMoneyLine, id: match.GameID, side: match.HomeTeamID}},
      {name: (match.AwayTeamMoneyLine || 0).toFixed(2), value: {cote: match.AwayTeamMoneyLine, id: match.GameID, side: match.AwayTeamID}},
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

  ngOnDestroy(): void{
    this.matchesSub.unsubscribe();
  }

  getMatches(date: Date): void {
    this.matchesSub = this.nbaService.getMatches(this.formatDate(date)).subscribe(
        data => {
          this.matches = data;
          console.log(data);
          this.changeDetector.detectChanges();

          this.nbaService.getRefreshNeeded$().subscribe(
              next => {
              }
          );
        },
        error => {},
    );
  }

  onSelectedDate($event: any): void{
    this.getMatches($event);
  }

}
