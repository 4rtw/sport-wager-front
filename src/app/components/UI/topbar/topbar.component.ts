import {
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  items: MenuItem[];
  openedSidenav = true;

  state = true;

  constructor(
  ) {
    this.items = [
      {
        label: 'Accueil',
        routerLink: ['/']
      },
      {
        label: 'Mes paris',
      },
      {
        label: 'Catégories',
        items: [
          {
            label: 'Basketball',
            routerLink: ['/wager/basketball']
          },
          {
            label: 'Football',
            routerLink: ['/wager/football']
          }
        ]
      },
      {
        label: 'Statistiques',
        items: [
          {
            label: 'Basketball',
            routerLink: ['/nba']
          },
          {
            label: 'Football',
            routerLink: ['/statistic/country-list']
          },
        ]
      },
      {
        label: 'Résultats',
      }
    ];
  }

  ngOnInit(): void {
  }
}
