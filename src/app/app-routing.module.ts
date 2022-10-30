import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MoviesListComponent } from './movie/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { NoAuthGuardService } from './guards/no-auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  canActivate: [NoAuthGuardService]},
  { path: 'movies', component: MoviesListComponent, canActivate: [AuthGuardService] },
  { path: 'movies/:id', component: MovieDetailsComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
