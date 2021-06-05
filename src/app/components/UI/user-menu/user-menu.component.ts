import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt.service';
import {User} from "../../../shared/model/user.model";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user: User;

  defaultImage;

  constructor(private router: Router,private jwtService: JwtService) { }

  ngOnInit(): void {
    this.user=this.jwtService.getDecodedUser();
    console.log(this.user);
    //if(this.user!=null){
      //const tmp = this.user.name.split(' ');
      //this.user.name = tmp[0];
      //this.defaultImage = `${tmp[0][0]}${tmp[1][0]}`
    //}
    
    
  }

  //TODO logout
  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  login(){
    this.router.navigate(["/login"]);
  }
}
