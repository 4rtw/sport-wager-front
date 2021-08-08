import {Component, OnInit, ViewChild} from '@angular/core';
import {FootStat} from '../../../../../shared/model/Foot/FootStat';
import {MatchService} from '../../../../../shared/services/Football/match.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ChartComponent} from 'angular2-chartjs';

@Component({
  selector: 'app-compare-stats',
  templateUrl: './compare-stats.component.html',
  styleUrls: ['./compare-stats.component.css']
})
export class CompareStatsComponent implements OnInit {

  teams: FootStat[] = [];
  selectedTeams: FootStat[];
  idCompet: number;
  @ViewChild(ChartComponent) chart: ChartComponent;

  sub: Subscription;

  data = {
    labels: [
      'Played Games',
      'Won',
      'Draw',
      'Lost',
      'Points',
      'Goals for',
      'Goals against',
      'Goals difference'
    ],
    datasets: []
  };

  constructor(private statService: MatchService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idCompet = params.competitionID;
      this.sub = this.statService.getStats(this.idCompet).subscribe(
          data => {
            this.teams = data;
          }
      )
    })
  }

  valueChanged(): void{
    this.data.datasets = [];
    for(let team of this.selectedTeams){
      this.data.datasets.push(this.getDataset(team));
    }
    this.chart.chart.update();

  }

  getDataset(team: FootStat): {
    label: string,
    data: number[],
    fill: boolean,
    backgroundColor: string,
    borderColor: string,
    pointBackgroundColor: string,
    pointBorderColor: string,
    pointHoverBackgroundColor: string,
    pointHoverBorderColor: string
  }{

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const col1 = randomNum();
    const col2 = randomNum();
    const col3 = randomNum();
    const randomRGB = () => `rgb(${col1}, ${col2}, ${col3})`;
    const randomRGBA = () => `rgb(${col1}, ${col2}, ${col3}, 0.2)`

    const data = [];
    for (const [key, value] of Object.entries(team)) {
      if(typeof value == 'number' && key!== 'position'){
        data.push(value);
      }
    }

    return {
      label: team.team.name,
      data: data,
      fill: true,
      backgroundColor: randomRGBA(),
      pointBackgroundColor: randomRGB(),
      borderColor: randomRGB(),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: randomRGBA()
    }
  }

}
