import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nba-stat-one',
  templateUrl: './nba-stat-one.component.html',
  styleUrls: ['./nba-stat-one.component.css']
})
export class NbaStatOneComponent implements OnInit {

  @Input() data?;

  constructor() { }

  ngOnInit(): void {
  }

}
