import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {User} from '../../../shared/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  logedUser = new User();
  openedSidenav = true;
  loading = [false, false, false, false];
  searchString: string;

  state = true;
  @Output() sidenavState = new EventEmitter<boolean>();

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe(
        next => {
          if (next instanceof User){
            this.logedUser = next;
          }
        }
    );
  }

  logout(): void{
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  toogleSidenav(): void{
    this.state = !this.state;
    this.sidenavState.emit(this.state);
  }

  load(index): void{
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

}
