import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Competitions} from '../../../shared/model/Foot/competitions';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {

  menuItems: MenuItem[] = []
  checkedUrlFoot: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkRoutes();
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

  checkRoutes(): void{
    if(this.router.url.includes('foot') || this.router.url === '/'){
      this.checkedUrlFoot = true;
    }
  }

  reload(item): void{
    this.router.navigate(item).then(()=> {
      location.reload();
    })
  }
}
