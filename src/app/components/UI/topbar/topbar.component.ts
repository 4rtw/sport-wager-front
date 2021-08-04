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
        icon: 'pi pi-fw pi-home',
        routerLink: ['/']
      },
      {
        label: 'Mes paris',
        icon: 'pi pi-fw pi-money-bill',
      },
      {
        label: 'Catégories',
        icon: 'pi pi-fw pi-th-large',
        items: [
          {
            label: 'JO',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Basketball',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: ['/nba']
          },
          {
            label: 'Football',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/foot']
          }
        ]
      },
      {
        label: 'Statistiques',
        icon: 'pi pi-fw pi-percentage',
        items: [
          {
            label: 'Soccer',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: ['/statistic/country-list']
          },
          {
            label: 'Basketball',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: ['/nba']
          },
        ]
      },
      {
        label: 'Résultats',
        icon: 'pi pi-fw pi-list'
      }
    ];
  }

  ngOnInit(): void {
  }
}
