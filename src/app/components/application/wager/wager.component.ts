import {
  Component,
  OnInit,
} from '@angular/core';
import {Observable} from 'rxjs';
import { User } from 'src/app/shared/model/Users/user.model';
import { UserService } from 'src/app/shared/services/Users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wager',
  templateUrl: './wager.component.html',
  styleUrls: ['./wager.component.scss'],
})
export class WagerComponent implements OnInit {
  user: Observable<User>;
  currentRoute: Router

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserLoggedIn();
    this.currentRoute=this.router;
  }
}
