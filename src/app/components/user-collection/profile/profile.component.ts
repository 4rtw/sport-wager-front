import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/model/Users/user.model';
import { UserService } from '../../../shared/services/Users/user.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user = new User();
  firstname = new FormControl();
  lastname = new FormControl();
  phone = new FormControl();
  email = new FormControl();
  sub: Subscription[] = [];

  confirmation = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUserLoggedIn()?.subscribe((data) => {
      this.user = data;

      this.firstname.setValue(this.user.firstname);
      this.lastname.setValue(this.user.lastname);
      this.phone.setValue(this.user.phone);
      this.email.setValue(this.user.email);
    });
  }

  submitProfile(): void {
    const userChanged = this.user;
    userChanged.firstname = this.firstname.value;
    userChanged.lastname = this.lastname.value;
    userChanged.phone = this.phone.value;
    this.userService.updateUser(userChanged).subscribe((_) => {});
  }

  removeAccount(): void {
    this.confirmation++;
    if (this.confirmation >= 7) {
      this.sub.push(
        this.userService
          .deleteUser(this.user.id.toString(10))
          .subscribe((_) => {
            this.sub.push(
              this.authService.logout().subscribe((_) => {
                location.reload();
              })
            );
          })
      );
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.sub) {
      sub.unsubscribe();
    }
  }
}
