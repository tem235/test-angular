import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMovie } from '../models/movie';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>(`${environment.apiUrl}/Movies`)
  }

  getInfo(movie_id: string): Observable<IMovie> {
    return this.http
      .get<IMovie>(`${environment.apiUrl + '/Movies/' + movie_id + '/Info'}`)
  }

  getCast(movie_id: string): Observable<String[]> {
    return this.http
      .get<String[]>(`${environment.apiUrl + '/Movies/' + movie_id + '/Cast'}`)
  }

  getComments(movie_id: string): Observable<IComment[]> {
    return this.http
      .get<IComment[]>(`${environment.apiUrl + '/Movies/' + movie_id + '/Comments'}`)
  }

  sendComment(movie_id: string, message: string): Observable<IComment> {
    return this.http
      .post<IComment>(`${environment.apiUrl + '/Movies/' + movie_id + '/Comments/Post'}`, { id: movie_id, message })
  }
}
