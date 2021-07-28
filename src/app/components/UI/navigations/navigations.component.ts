import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {

  menuItems: MenuItem[] = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.component);
    this.menuItems.push(
        {
          label: "Catégories",
            items:[{
              label: "Football",
              routerLink: ['/foot'],
            },
            {
              label: "Basketball",
              routerLink: ['/nba'],
            },
              {
                label: "JO"
              }]
        },
        {
          label: "Mon compte",
          items:[{
            label: "Mon profile",
            routerLink: ['/foot'],
          },
            {
              label: "Déconnexion",
              routerLink: ['/nba'],
            }]
        }
        )
  }

  reload(item): void{
    this.router.navigate(item).then(()=> {
      location.reload();
    })
  }
}
