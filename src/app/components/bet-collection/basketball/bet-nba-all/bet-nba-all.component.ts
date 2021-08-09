import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NbaGame} from '../../../../shared/model/Basket/nba-game';
import {NbaService} from '../../../../shared/services/Basketball/nba.service';

@Component({
  selector: 'app-bet-nba-all',
  templateUrl: './bet-nba-all.component.html',
  styleUrls: ['./bet-nba-all.component.css']
})
export class BetNbaAllComponent implements OnInit {

  matches: Observable<NbaGame[]>;

  constructor(private nbaService: NbaService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void{
    this.matches = this.nbaService.getAllMatches();
  }

}
