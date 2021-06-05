import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {JwtService} from '../shared/services/jwt.service'
//region unused
import { MatSidenav } from '@angular/material/sidenav';
import { assignmentsGeneres } from 'src/dummy-data/assignments.data';
import { Assignment, EtatAssignment } from '../shared/model/assignements/assignment.model';
import { AssignmentsService } from '../shared/services/assignements/assignments.service';
import { MatiereService } from '../shared/services/assignements/matiere.service';
import { ProfesseurService } from '../shared/services/assignements/professeur.service';
import { AuthService } from '../shared/services/assignements/auth.service';
import { ElevesService } from '../shared/services/assignements/eleves.service';
import {InputTextModule} from 'primeng/inputtext';
//endregion
@Component({
  selector: 'app-sport-wager',
  templateUrl: './sport-wager.component.html',
  styleUrls: ['./sport-wager.component.css']
})
export class SportWagerComponent implements OnInit {

  value3: string;

  loading = [false, false, false, false]

  load(index) {
      this.loading[index] = true;
      setTimeout(() => this.loading[index] = false, 1000);
  }


  showProgression = false;
  openedSidenav: boolean = true;

 /* @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("logo") headerLogo: ElementRef;*/
  
  
  constructor(
      private router:Router,
      private jwtService:JwtService
  ) {}
  
  ngOnInit() {
    console.log(this.jwtService.decoded);
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

}
