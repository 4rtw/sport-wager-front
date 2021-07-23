import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { User } from '../../../shared/model/Users/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/Users/user.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../../shared/services/Auth/jwt.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  openedSidenav = true;
  user = new User();
  userSub: Subscription;

  state = true;
  @Output() sidenavState = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.items = [
      {
        label:'Accueil',
        icon:'pi pi-fw pi-home',
      },
      {
        label:'Mes paris',
        icon:'pi pi-fw pi-money-bill',
      },
      {
        label:'Catégories',
        icon:'pi pi-fw pi-th-large',
        items:[
          {
            label:'JO',
            icon:'pi pi-fw pi-user-plus',
          },
          {
            label:'Basketball',
            icon:'pi pi-fw pi-user-minus',
          },
          {
            label:'Football',
            icon:'pi pi-fw pi-users',
          }
        ]
      },
      {
        label:'Statistiques',
        icon:'pi pi-fw pi-percentage',
      },
      {
        label:'Résultats',
        icon:'pi pi-fw pi-list'
      }
    ];
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userSub = this.userService.getUserLoggedIn().subscribe((data) => {
      this.user = data;
    });
  }

  toogleSidenav(): void {
    this.state = !this.state;
    this.sidenavState.emit(this.state);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
