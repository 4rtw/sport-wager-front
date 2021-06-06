import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import {User} from '../../../shared/model/user.model';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user: User;
  hasImage = true;
  firstLetter: string;

  defaultImage;

  constructor(
      private router: Router,
      private jwtService: JwtService,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.jwtService.getDecodedUser();
    if (this.user.image === ''){
        this.hasImage = false;
    }
    this.firstLetter = this.user.id ? this.user.firstname.charAt(0) : '';
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
            console.log(error.message);
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
