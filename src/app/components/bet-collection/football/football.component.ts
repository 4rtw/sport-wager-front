import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../shared/model/Users/user.model';
import {UserService} from '../../../shared/services/Users/user.service';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {

  user: Observable<User>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
  }

}
