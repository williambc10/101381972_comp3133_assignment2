/*import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}*/

// pages/signup.component.ts:
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // new

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /*onSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      console.log('Signup:', username, email, password);
      // 🔜 Connect to GraphQL signup API here
    }
  }*/
    onSubmit() {
      if (this.signupForm.valid) {
        const { username, email, password } = this.signupForm.value;
  
        this.authService.signup(username, email, password).subscribe({
          next: (result: any) => {
            console.log('✅ Signup Success:', result.data.signup);
            alert('Signup successful! ✅');
          },
          error: (err) => {
            console.error('❌ Signup Error:', err.message);
            alert('Signup failed ❌');
          }
        });
      }
    }
}
