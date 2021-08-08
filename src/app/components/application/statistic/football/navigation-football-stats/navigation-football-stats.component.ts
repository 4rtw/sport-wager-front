import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomDate} from '../../../../../shared/services/Utils/DateOperator';
import {Observable} from 'rxjs';
import {Competitions} from '../../../../../shared/model/Foot/competitions';
import {Subscription} from 'rxjs/internal/Subscription';
import {CompetitionService} from '../../../../../shared/services/Football/competition.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation-football-stats',
  templateUrl: './navigation-football-stats.component.html',
  styleUrls: ['./navigation-football-stats.component.css'],
  providers: [CustomDate],
})
export class NavigationFootballStatsComponent implements OnInit,OnDestroy {

  activeCompetitions: Observable<Competitions[]>;
  url: string;
  sub: Subscription[] = [];

  constructor(
      private competitionService: CompetitionService,
      public activatedRoute: ActivatedRoute,
      public customDate: CustomDate,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.activeCompetitions = this.competitionService.getCompetitions();
    this.sub.push(
        this.activatedRoute.queryParams.subscribe((data) => {
          if (!data.competitionID) {
            this.router.navigate(['/stats/football'], {
              queryParams: { competitionID: '2002' },
            });
          }
        })
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.sub) {
      sub.unsubscribe();
    }
  }

}
