import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import {User} from '../../../shared/model/user.model';
import {AuthService} from '../../../shared/services/auth.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user = new User();
  hasImage = true;
  firstLetter: string;

  defaultImage;

  constructor(
      private router: Router,
      private jwtService: JwtService,
      private authService: AuthService,
      private userService: UserService,
  ) { }

  ngOnInit(): void {
      this.userService.getUserLoggedIn().subscribe(
          (data) => {
              if (data instanceof User){
                  this.user = data;
              }
          });
  }

  logout(): void{
    this.authService.logout().subscribe(
        response => {
            // if successfull login
            this.router.navigate(['/'])
                .then(() => {
                    window.location.reload();
                });
        },
        error => {
            // if not successfull login
            console.log(error);
            // TODO snackbar or else
        }
    );
  }

  navigateToLogin(): void{
    this.router.navigate(['/login']);
  }

  navigateToSubscribe(): void{
    this.router.navigate(['/register']);
  }
}
