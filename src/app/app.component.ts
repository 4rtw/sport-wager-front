import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {Subscription} from 'rxjs';
import {JwtService} from './shared/services/jwt.service';
import {AuthService} from './shared/services/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit, OnDestroy {

    searchString: string;
    routeSub: Subscription;
    authSub: Subscription;
    state: boolean;
    tokenSub: Subscription;
    logoutSub: Subscription;
    openedSidenav = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,
        private jwtService: JwtService,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        // ripple true
        this.primengConfig.ripple = true;

        this.routeSub = this.route.queryParams.subscribe(
            params => {
                if (params.connection === 'success') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Authentification',
                        detail: 'Vous êtes maintenant connéctés'
                    });
                    setTimeout(() => this.router.navigate(['/']), 1000);
                }

                if (params.logout === 'success') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Déconnection',
                        detail: 'Vous êtes maintenant déconnéctés'
                    });
                    setTimeout(() => this.router.navigate(['/']), 1000);
                }

                this.handleUserIdle();
            });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
        this.authSub.unsubscribe();
        this.tokenSub.unsubscribe();
        this.logoutSub.unsubscribe();
    }

    handleUserIdle(): void {
        if (this.jwtService.isTokenExpired()) {
            if (!(
                this.jwtService.decoded === undefined ||
                this.jwtService.jwtToken === undefined ||
                this.jwtService.jwtToken === null
            )) {
                console.log(this.jwtService.decoded);
                this.tokenSub = this.authService.refreshToken().subscribe();
            }
        }
    }


    logout(): void {
        this.logoutSub = this.authService.logout().subscribe();
    }

    toogleSidenav(data: boolean): void {
        this.state = data;
    }
}
