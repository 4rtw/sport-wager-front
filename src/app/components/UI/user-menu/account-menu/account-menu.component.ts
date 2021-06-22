import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/Auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/model/Users/user.model';
import { JwtService } from '../../../../shared/services/Auth/jwt.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../shared/services/Users/user.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css'],
})
export class AccountMenuComponent implements OnInit, OnDestroy {
  showButtonLogoutAndNoLoader = true;
  user = new User();
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService.getUserLoggedIn().subscribe(
      (data) => {
        this.user = data;
      },
      (_) => {
        this.user = new User();
      }
    );
  }

  logout(): void {
    this.showButtonLogoutAndNoLoader = !this.showButtonLogoutAndNoLoader;
    this.authService.logout().subscribe((_) => {
      // if successfull logout
      this.showButtonLogoutAndNoLoader = !this.showButtonLogoutAndNoLoader;
      this.router
        .navigate(['/'], { queryParams: { logout: 'success' } })
        .then(() => {
          location.reload();
        });
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goToProfile(): void {
    this.router.navigate(['/account/profile']).then(() => {
      location.reload();
    });
  }
}
