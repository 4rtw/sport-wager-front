import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/model/Users/user.model';
import { UserService } from 'src/app/shared/services/Users/user.service';

@Component({
  selector: 'app-wager',
  templateUrl: './wager.component.html',
  styleUrls: ['./wager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WagerComponent implements OnInit, OnDestroy {
  user: User = new User();
  sub: Subscription[] = [];

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.userService.getUserLoggedIn().subscribe((response) => {
        this.user = response;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    for (let item of this.sub) {
      item.unsubscribe();
    }
  }
}
