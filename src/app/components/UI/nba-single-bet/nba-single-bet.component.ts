import {Component, Input, OnInit} from '@angular/core';
import {Bet} from '../../../shared/model/Bet/Bet';
import {NbaGame} from '../../../shared/model/Basket/nba-game';
import {Observable} from 'rxjs';
import {NbaService} from '../../../shared/services/Basketball/nba.service';

@Component({
  selector: 'app-nba-single-bet',
  templateUrl: './nba-single-bet.component.html',
  styleUrls: ['./nba-single-bet.component.css']
})
export class NbaSingleBetComponent implements OnInit {

  @Input() bet!:Bet;
  @Input() pannier;
  match: Observable<NbaGame>;

  constructor(private nbaService: NbaService) { }

  ngOnInit(): void {
    this.match = this.nbaService.getMatch(this.bet.match_id);
  }

}
