import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  authService = inject(AuthService);
  router=inject(Router);
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  register() {
    if (this.registrationForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }
    if (
      this.registrationForm.value.password !== this.registrationForm.value.confirm
    ) {
      this.error = 'Passwords do not match!';
      return;
    }
    this.isLoading = true;
    this.error = null;
    const { username, email, password } = this.registrationForm.value;
    this.authService.register(username, email, password).subscribe(() => {
        this.isLoading = false;
        alert('User registered successfully!');
        this.registrationForm.reset();
        this.router.navigateByUrl("/login");
      },
      (err) => {
        this.isLoading = false;
        this.error = 'Registration failed. Please try again.';
        console.error(err);
      }
    );
  }
}
