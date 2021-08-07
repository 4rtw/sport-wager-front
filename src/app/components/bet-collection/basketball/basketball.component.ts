import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/Users/user.model';
import { UserService } from 'src/app/shared/services/Users/user.service';

@Component({
  selector: 'app-basketball',
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css'],
})
export class BasketballComponent implements OnInit {
  user: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
  }
}
