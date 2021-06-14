import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {Subscription} from 'rxjs';
import {UserIdleService} from 'angular-user-idle';
import {JwtService} from './shared/services/jwt.service';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit, OnDestroy{

  searchString: string;
  routeSub: Subscription;
  authSub: Subscription;
  state: boolean;

  constructor(
      private userIdle: UserIdleService,
      private router: Router,
      private route: ActivatedRoute,
      private messageService: MessageService,
      private primengConfig: PrimeNGConfig,
      private jwtService: JwtService,
      private authService: AuthService,
  ) {}

  openedSidenav = true;

  ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.routeSub = this.route.queryParams.subscribe(
          params => {
                if (params.connection === 'success'){
                    this.messageService.add({severity: 'success', summary: 'Authentification', detail: 'Vous êtes maintenant connéctés' });
                    setTimeout(() => this.router.navigate(['/']), 1000);
                }

                if (params.logout === 'success'){
                    this.messageService.add({severity: 'success', summary: 'Déconnection', detail: 'Vous êtes maintenant déconnéctés' });
                    setTimeout(() => this.router.navigate(['/']), 1000);
                }

                this.handleUserIdle();
          });
  }

  ngOnDestroy(): void{
      this.routeSub.unsubscribe();
      this.authSub.unsubscribe();
  }

  handleUserIdle(): void{
      setTimeout(() => {
          this.authSub = this.authService.refreshToken().subscribe();
      }, 2500);
  }


  logout(): void{
        localStorage.removeItem('user');
        this.router.navigate(['/']).then(() => {location.reload(); });
  }

  toogleSidenav(data: boolean): void{
      this.state = data;
  }
}
