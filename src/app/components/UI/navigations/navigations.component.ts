import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {

  menuItems: MenuItem[] = []

  constructor() { }

  ngOnInit(): void {
    this.menuItems.push(
        {
          label: "Catégories",
            items:[{
              label: "Football",
              routerLink: ['/foot']
            },
            {
              label: "Basketball",
              routerLink: ['/nba']
            },
              {
                label: "JO"
              }]
        },
        {
          label: "Mon compte",
          items:[{
            label: "Mon profile",
            routerLink: ['/foot']
          },
            {
              label: "Déconnexion",
              routerLink: ['/nba']
            }]
        }
        )
  }

}
