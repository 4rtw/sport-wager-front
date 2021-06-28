import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { JwtService } from '../../shared/services/Auth/jwt.service';
import { AuthService } from '../../shared/services/Auth/auth.service';

@Component({
  selector: 'app-root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.css'],
})
export class RootContainerComponent implements OnInit, OnDestroy {
  searchString: string;
  state: boolean;
  openedSidenav = true;

  sub: Subscription[] = [];

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

    this.sub.push(
      this.route.queryParams.subscribe((params) => {
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

        if (params.activated === 'true') {
          // Todo Message service doesn't work
          this.messageService.add({
            severity: 'success',
            summary: 'Activation',
            detail: 'Votre compte a été activé avec succès',
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.sub) {
      subscription.unsubscribe();
    }
    if (this.silentRefresh) {
      this.silentRefresh.unsubscribe();
    }
  }

  logout(): void {
    this.sub.push(this.authService.logout().subscribe());
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
