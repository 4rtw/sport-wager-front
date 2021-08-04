import {Component, OnInit} from '@angular/core';
import {CompetitionService} from '../../../../shared/services/Football/competition.service';
import {Observable} from 'rxjs';
import {Competitions} from '../../../../shared/model/Foot/competitions';
import {ActivatedRoute} from '@angular/router';
import {CustomDate} from '../../../../shared/services/Utils/DateOperator';

@Component({
  selector: 'app-navigation-football',
  templateUrl: './navigation-football.component.html',
  styleUrls: ['./navigation-football.component.css'],
  providers: [CustomDate]
})
export class NavigationFootballComponent implements OnInit {

  activeCompetitions: Observable<Competitions[]>
  url: string;

  constructor(private competitionService: CompetitionService, public activatedRoute: ActivatedRoute, public customDate: CustomDate) { }

  ngOnInit(): void {
    this.activeCompetitions = this.competitionService.getCompetitions();
    this.activatedRoute.queryParams.subscribe(x=>console.log(x))
  }
}
