import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from "@angular/router";
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    const currentUser = this.authService.userValue;
    
    if (currentUser.token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
