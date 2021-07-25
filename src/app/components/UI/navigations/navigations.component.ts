import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {

  menuItems: MenuItem[] = []

  constructor() { }

  ngOnInit(): void {
    this.menuItems.push(
        {
          label: "nba",
        },
        {
         label: "foot"
        }
        )}

}
