import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { IUser } from '../../models/user';
import { IMovie } from '../../models/movie';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  currentUser: IUser;
  moviesList: IMovie[];

  constructor(private authenticationService: AuthService, private movieService: MovieService) {
    this.authenticationService.user.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    this.movieService.getAll().subscribe((result: any) => {
      this.moviesList = result
    })
  }

  logout() {
    this.authenticationService.logout()
  }
}
