import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {User} from '../../../shared/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  openedSidenav = true;
  user = new User();
  userSub: Subscription;

  state = true;
  @Output() sidenavState = new EventEmitter<boolean>();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userSub = this.userService.getUserLoggedIn().subscribe(
        next => {
          if (next instanceof User){
            this.user = next;
          }
        }
    );
  }

  toogleSidenav(): void{
    this.state = !this.state;
    this.sidenavState.emit(this.state);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
