import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (result: any) => {
          const token = result.data.login.token;
          localStorage.setItem('token', token);
          console.log('Login Success. Token:', token);
          alert('Login successful');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Login Error:', err.message);
          alert('Login failed');
        }
      });
    }
  }
}
