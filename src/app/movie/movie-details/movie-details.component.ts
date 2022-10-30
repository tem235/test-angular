import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from '../../models/comment';
import { IMovie } from '../../models/movie';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string;
  movieInfo: IMovie;
  movieCast: String[];
  movieComments: IComment[];
  showComments: boolean = false;
  commentText: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('id')
    this.movieId = id
    this.getMovieDetails(id)
    this.getMovieCast(id)
  }

  getMovieDetails(movieId: string) {
    this.movieService.getInfo(movieId).subscribe((result: any) => {
      this.movieInfo = result
    })
  }

  getMovieCast(movieId: string) {
    this.movieService.getCast(movieId).subscribe((result: any) => {
      this.movieCast = result
    })
  }

  switchShowComments() {
    this.getMovieComments(this.movieId)
    this.showComments = true
  }

  getMovieComments(movieId: string) {
    this.movieService.getComments(movieId).subscribe((result: any) => {
      this.movieComments = result
    })
  }

  sendComment() {
    this.movieService.sendComment(this.movieId, this.commentText).subscribe((result: IComment) => {
      this.movieComments.push(result)
      this.commentText = ''
    })
  }

}
