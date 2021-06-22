import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../shared/model/Users/user.model';
import { UserService } from '../../../../../../shared/services/Users/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = new User();
  firstname = new FormControl();
  lastname = new FormControl();
  phone = new FormControl();
  email = new FormControl();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserLoggedIn().subscribe((data) => {
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

  submitPassword(): void {}
}
