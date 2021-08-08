import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../../../../shared/services/Football/competition.service';
import { Observable } from 'rxjs';
import { Competitions } from '../../../../shared/model/Foot/competitions';
import { ActivatedRoute } from '@angular/router';
import { CustomDate } from '../../../../shared/services/Utils/DateOperator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navigation-football',
  templateUrl: './navigation-football.component.html',
  styleUrls: ['./navigation-football.component.css'],
  providers: [CustomDate],
})
export class NavigationFootballComponent implements OnInit, OnDestroy {
  activeCompetitions: Observable<Competitions[]>;
  url: string;
  sub: Subscription[] = [];

  constructor(
    private competitionService: CompetitionService,
    public activatedRoute: ActivatedRoute,
    public customDate: CustomDate,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeCompetitions = this.competitionService.getCompetitions();
    this.sub.push(
      this.activatedRoute.queryParams.subscribe((data) => {
        if (!data.competitionID) {
          this.router.navigate(['/wager/football'], {
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
