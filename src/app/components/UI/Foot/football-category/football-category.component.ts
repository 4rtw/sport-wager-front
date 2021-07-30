import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CompetitionService} from '../../../../shared/services/Football/competition.service';
import {Competitions} from '../../../../shared/model/Foot/competitions';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-football-category',
  templateUrl: './football-category.component.html',
  styleUrls: ['./football-category.component.scss']
})
export class FootballCategoryComponent implements OnInit {

  competitions: Observable<Competitions[]>;
  loading = true;
  responsiveOptions;
  queryParams: Observable<any>;


  constructor(private competitionService: CompetitionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.competitions = this.competitionService.getCompetitions()
    this.queryParams = this.activatedRoute.queryParams;
  }

  changeCompetition(id) {
    this.router.navigate(['/football'], {queryParams:{competitionID:id}}).then(_=>{
      location.reload();
    })
  }
}
