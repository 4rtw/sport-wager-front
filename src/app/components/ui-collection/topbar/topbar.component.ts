import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/Users/user.model';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { UserService } from 'src/app/shared/services/Users/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  user: Observable<User>;
  defaultImage;
  items: MenuItem[];
  openedSidenav = true;

  state = true;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.items = [
      {
        label: 'Accueil',
        routerLink: ['/wager/football'],
      },
      {
        label: 'Mes paris',
        routerLink: [''],
      },
      {
        label: 'Catégories',
        items: [
          {
            label: 'Basketball',
            routerLink: ['/wager/basketball'],
          },
          {
            label: 'Football',
            routerLink: ['/wager/football'],
          },
        ],
      },
      {
        label: 'Statistiques',
        items: [
          {
            label: 'Basketball',
            routerLink: ['/stats/basketball'],
          },
          {
            label: 'Football',
            routerLink: ['/stats/football'],
          },
        ],
      },
      {
        label: 'BET Points',
        routerLink: [''],
      },
    ];
  }

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
  }

  logout(): void {
    this.authService.logout().subscribe((_) => {
      location.reload();
    });
  }
}
