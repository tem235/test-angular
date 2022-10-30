import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  err: any

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this._createForm()
  }

  private _createForm() {
    this.loginForm = this.fb.group({
      "username": ["", [
        Validators.required,
        Validators.email
      ]],
      "password": ["", [Validators.required]]
    });
  }

  get _username() {
    return this.loginForm.get('username')
  }

  get _password() {
    return this.loginForm.get('password')
  }

  submit() {
    let { username, password } = this.loginForm.value

    if (this.loginForm.invalid) {
      return
    }
    this.authService.login(username, password)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          this.err = err
        }
      })
  }

}
