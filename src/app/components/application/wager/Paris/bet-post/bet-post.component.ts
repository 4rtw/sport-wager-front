import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-bet-post',
  templateUrl: './bet-post.component.html',
  styleUrls: ['./bet-post.component.css'],
})
export class BetPostComponent implements OnInit {
  name = '';

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    console.log(this.config.data.bet);
  }
}
