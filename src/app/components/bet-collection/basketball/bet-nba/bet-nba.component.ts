import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { NbaGame } from 'src/app/shared/model/Basket/nba-game';
import { NbaService } from 'src/app/shared/services/Basketball/nba.service';

@Component({
  selector: 'app-bet-nba',
  templateUrl: './bet-nba.component.html',
  styleUrls: ['./bet-nba.component.css'],
})
export class BetNbaComponent implements OnInit {
  matches: Observable<NbaGame[]>;
  date: Date = new Date();
  @ViewChild('calendar') calendar:  Calendar;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void{
    this.matches = this.nbaService.getMatches(this.date);
  }
}
