import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CompetitionService} from '../../../shared/services/Football/competition.service';
import {Competitions} from '../../../shared/model/Foot/competitions';

@Component({
  selector: 'app-football-category',
  templateUrl: './football-category.component.html',
  styleUrls: ['./football-category.component.scss']
})
export class FootballCategoryComponent implements OnInit {

  competitions: Competitions[] = [];
  loading = true;
  activeCompetition: Competitions;
  responsiveOptions;

  constructor(private competitionService: CompetitionService, private changeDetector: ChangeDetectorRef) {
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
    this.getCompetitions();
  }

  getCompetitions(): void {
    this.competitionService.getCompetitions().subscribe((x) => {
      this.competitions = x;
      this.loading = false;
      console.log(this.competitions)
      this.activeCompetition = this.competitions[0];
      this.changeDetector.detectChanges();
    });
  }

}
