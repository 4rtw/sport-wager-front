import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { User } from '../../../shared/model/user.model';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  user = new User();
  hasImage = true;
  items: MenuItem[];
  userSub: Subscription;

  defaultImage;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService.getUserLoggedIn().subscribe((data) => {
      if (data instanceof User) {
        this.user = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
