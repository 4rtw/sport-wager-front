import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/Auth/auth.service';
import { JwtService } from './shared/services/Auth/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit, OnDestroy{

  searchString: string;
  state: boolean;
  openedSidenav = true;
  show: boolean = true;

  sub: Subscription[] = [];

  silentRefresh: Subscription;

  constructor(
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

    this.checkRoute();
  }

  checkRoute(): void{
    this.sub.push(
        this.route.url.subscribe(data=>{
          if(data[0]?.path.includes('account')){
            this.show = false;
          }
        })
    )

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
    this.sub.push(this.authService.logout().subscribe(_=>{location.reload()}));
  }

  /*
   * met à jour le token chaque fois que la page est rendu
   * puis attend un délai de 60 avant de se réexecuter
   * */
  refreshToken(): void {
    try{
      if (this.jwtService.getUser().user.id !== 0) {
        this.silentRefresh = this.jwtService.refreshToken().subscribe();
      }
      setTimeout(() => {
        this.refreshToken();
      }, 60000);
    }
    catch(e){
      this.logout();
    }
  }
}
