import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/Auth/jwt.service';
import { User } from '../../../shared/model/Users/user.model';
import { MenuItem } from 'primeng/api';
import {Observable, Subscription} from 'rxjs';
import { UserService } from '../../../shared/services/Users/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  user: Observable<User>;

  defaultImage;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
  }
}
