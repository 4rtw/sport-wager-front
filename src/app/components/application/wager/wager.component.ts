import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-wager',
    templateUrl: './wager.component.html',
    styleUrls: ['./wager.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WagerComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
