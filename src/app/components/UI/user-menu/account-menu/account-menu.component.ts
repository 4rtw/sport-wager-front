import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/model/user.model';
import {JwtService} from '../../../../shared/services/jwt.service';
import {UserService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

    showButtonLogoutAndNoLoader = true;
    user = new User();

  constructor(
      private authService: AuthService,
      private router: Router,
      private jwtService: JwtService,
      private userService: UserService
  ) { }

  ngOnInit(): void {
      this.userService.getUserLoggedIn().subscribe(
          data => {
              if (data instanceof User){
                  this.user = data;
              }
          }
      );
  }

  logout(): void{
      this.showButtonLogoutAndNoLoader = !this.showButtonLogoutAndNoLoader;
      this.authService.logout().subscribe(
        response => {
          // if successfull logout
            this.showButtonLogoutAndNoLoader = !this.showButtonLogoutAndNoLoader;
            this.router.navigate(['/'], { queryParams: { logout: 'success'}})
              .then(() => {
                window.location.reload();
              });
        }
    );
  }

}
