import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService:AuthService,
     private router: Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }
login() {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();
    return;

  }

  const { email, password } = this.loginForm.value;

  const success = this.authService.login(
    email,
    password
  );

  if (success) {

    this.router.navigate(['/dashboard']);

    this.loginForm.reset();

  } else {

    alert('Invalid Username or Password');

  }

}

}