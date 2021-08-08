import {Component, OnDestroy, OnInit} from '@angular/core';
import { CompetitionService } from '../../../../../shared/services/Football/competition.service';
import { Competitions } from '../../../../../shared/model/Foot/competitions';
import {Subscription} from 'rxjs';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})

export class CountryListComponent implements OnInit, OnDestroy {

  competitions: Competitions[];
  sub: Subscription;

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.sub = this.competitionService.getCompetitions().subscribe((competitions) => {
      this.competitions = competitions;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
