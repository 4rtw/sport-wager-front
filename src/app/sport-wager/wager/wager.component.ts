
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../produit-service';
import { Product, ProductS } from '../../product';

@Component({
  selector: 'app-wager',
  templateUrl: './wager.component.html',
  styleUrls: ['./wager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WagerComponent implements OnInit {

  paymentOptions: any[];
  value2: any[];
  value18: number = 100;

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  products: Product[];
  product;
  responsiveOptions;
  
  

	constructor(private productService: ProductService) { 
    this.paymentOptions = [
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 }
    ];
		this.responsiveOptions = [
            {
                equipe: 'Manchester United - Leicester City',
                cat: ' Angleterre - Premier League',
                heure: '15:20',
                date:'Aujourdhui',
                cote : [
                  { cote:'1.63', value:1 },
                  { cote:'2.25', value:0 },
                  { cote:'2.25', value:2 }
                ]
            },
            {
              equipe: 'Manchester United - Leicester City',
              cat: ' Angleterre - Premier League',
              heure: '15:20',
              date:'Aujourdhui',
              cote : [
                { cote:'8.63', value:1 },
                { cote:'3.25', value:0 },
                { cote:'4.25', value:2 }
              ]
           },
           {
            equipe: 'Manchester United - Leicester City',
            cat: ' Angleterre - Premier League',
            heure: '15:20',
            date:'Aujourdhui',
            cote : [
              { cote:'8.63', value:1 },
              { cote:'3.25', value:0 },
              { cote:'4.25', value:2 }
            ]
         },
         {
          equipe: 'Manchester United - Leicester City',
          cat: ' Angleterre - Premier League',
          heure: '15:20',
          date:'Aujourdhui',
          cote : [
            { cote:'8.63', value:1 },
            { cote:'3.25', value:0 },
            { cote:'4.25', value:2 }
          ]
       },
       {
        equipe: 'Manchester United - Leicester City',
        cat: ' Angleterre - Premier League',
        heure: '15:20',
        date:'Aujourdhui',
        cote : [
          { cote:'8.63', value:1 },
          { cote:'3.25', value:0 },
          { cote:'4.25', value:2 }
        ]
     },
     {
      equipe: 'Manchester United - Leicester City',
      cat: ' Angleterre - Premier League',
      heure: '15:20',
      date:'Aujourdhui',
      cote : [
        { cote:'1.63', value:1 },
        { cote:'2.25', value:0 },
        { cote:'2.25', value:2 }
      ]
  },
  {
    equipe: 'Manchester United - Leicester City',
    cat: ' Angleterre - Premier League',
    heure: '15:20',
    date:'Aujourdhui',
    cote : [
      { cote:'1.63', value:1 },
      { cote:'2.25', value:0 },
      { cote:'2.25', value:2 }
    ]
},
{
  equipe: 'Manchester United - Leicester City',
  cat: ' Angleterre - Premier League',
  heure: '15:20',
  date:'Aujourdhui',
  cote : [
    { cote:'1.63', value:1 },
    { cote:'2.25', value:0 },
    { cote:'2.25', value:2 }
  ]
},
{
  equipe: 'Manchester United - Leicester City',
  cat: ' Angleterre - Premier League',
  heure: '15:20',
  date:'Aujourdhui',
  cote : [
    { cote:'7.63', value:1 },
    { cote:'9.25', value:0 },
    { cote:'4.25', value:2 }
  ]
},
{
  equipe: 'Manchester United - Leicester City',
  cat: ' Angleterre - Premier League',
  heure: '15:20',
  date:'Aujourdhui',
  cote : [
    { cote:'6.63', value:1 },
    { cote:'4.25', value:0 },
    { cote:'2.25', value:2 }
  ]
},
      ];
	}

	ngOnInit() {
		/*this.productService.getProductsSmall().then(products => {
			this.products = products;
		});*/
	}
  /*constructor() {}*/
  
  /*ngOnInit() {
    
  }*/

 
}
