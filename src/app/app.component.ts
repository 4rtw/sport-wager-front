import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Subscription } from 'rxjs';
import { JwtService } from './shared/services/jwt.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
  searchString: string;
  routeSub: Subscription;
  authSub: Subscription;
  state: boolean;
  tokenSub: Subscription;
  logoutSub: Subscription;
  openedSidenav = true;

  silentRefresh: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // ripple true
    this.primengConfig.ripple = true;

    // silent refresh token every 30 sec
    this.refreshToken();

    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params.connection === 'success') {
        this.messageService.add({
          severity: 'success',
          summary: 'Authentification',
          detail: 'Vous êtes maintenant connéctés',
        });
      }

      if (params.logout === 'success') {
        this.messageService.add({
          severity: 'success',
          summary: 'Déconnection',
          detail: 'Vous êtes maintenant déconnéctés',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.authSub.unsubscribe();
    this.tokenSub.unsubscribe();
    this.logoutSub.unsubscribe();
    this.silentRefresh.unsubscribe();
  }

  logout(): void {
    this.logoutSub = this.authService.logout().subscribe();
  }

  toogleSidenav(data: boolean): void {
    this.state = data;
  }

  /*
   * met à jour le token chaque fois que la page est rendu
   * puis attend un délai de 60 avant de se réexecuter
   * */
  refreshToken(): void {
    if (this.jwtService.getUser().user.id !== 0) {
      this.silentRefresh = this.jwtService.refreshToken().subscribe();
    }
    setTimeout(() => {
      this.refreshToken();
    }, 60000);
  }
}
