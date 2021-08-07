import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../shared/services/Photo/photoservice';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.css'],
  providers: [PhotoService],
})
export class GalleriaComponent implements OnInit {
  images: any[] =
    [
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria7.jpg",
        "alt": "Description for Image 8",
        "title": "Title 8"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria12.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria8.jpg",
        "alt": "Description for Image 2",
        "title": "Title 2"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria16.jpg",
        "alt": "Description for Image 3",
        "title": "Title 3"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria20.jpg",
        "alt": "Description for Image 4",
        "title": "Title 4"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria18.jpeg",
        "alt": "Description for Image 5",
        "title": "Title 5"
      },
      {
        "previewImageSrc": "assets/showcase/images/galleria/galleria2.jpg",
        "alt": "Description for Image 6",
        "title": "Title 6"
      },
    ];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    //this.photoService.getImages().then(images => this.images = images)
  }

}
