import { Component, OnInit } from '@angular/core';
import { Competitions } from '../../../../../../../shared/model/Foot/competitions';
import { CompetitionService } from '../../../../../../../shared/services/Football/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
})
export class CompetitionComponent implements OnInit {
  competitions: Competitions[];
  selectedCompetition: Competitions;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.getCompetitions();
  }

  getCompetitions(): void {
    this.competitionService.getCompetitions().subscribe((x) => {
      this.competitions = x;
    });
  }

  onRowSelect($event: any): void {}
}
