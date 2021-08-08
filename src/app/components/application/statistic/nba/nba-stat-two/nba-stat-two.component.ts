import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nba-stat-two',
  templateUrl: './nba-stat-two.component.html',
  styleUrls: ['./nba-stat-two.component.css']
})
export class NbaStatTwoComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
