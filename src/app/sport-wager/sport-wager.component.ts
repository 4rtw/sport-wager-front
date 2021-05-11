import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { assignmentsGeneres } from 'src/dummy-data/assignments.data';
import { Assignment, EtatAssignment } from '../shared/model/assignment.model';
import { AssignmentsService } from '../shared/services/assignments.service';
import { MatiereService } from '../shared/services/matiere.service';
import { ProfesseurService } from '../shared/services/professeur.service';
import { AuthService } from '../shared/services/auth.service';
import { ElevesService } from '../shared/services/eleves.service';
import {InputTextModule} from 'primeng/inputtext';
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
  
  
  constructor(private router:Router) {}
  
  ngOnInit() {
  
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

}
