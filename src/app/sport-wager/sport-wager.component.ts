import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/model/user.model';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-sport-wager',
  templateUrl: './sport-wager.component.html',
  styleUrls: ['./sport-wager.component.css']
})
export class SportWagerComponent implements OnInit {

  logedUser = new User();
  searchString: string;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService
  ) {}

  loading = [false, false, false, false];

  openedSidenav = true;

  load(index): void{
      this.loading[index] = true;
      setTimeout(() => this.loading[index] = false, 1000);
  }

  ngOnInit(): void {
      this.userService.getUserLoggedIn().subscribe(
          data => {
              if (data instanceof User){
                  this.logedUser = data;
              }else {
                  this.logedUser = new User();
              }
          });
  }

  logout(): void{
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
