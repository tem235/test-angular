import { Component, Input } from '@angular/core';
import { IMovie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: IMovie;

  showDetails: boolean = false;

  constructor() { }

  switchShowDetails() {
    this.showDetails = !this.showDetails
  }

}
