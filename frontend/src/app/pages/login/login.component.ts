import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/model/auth';
import { PanierService } from 'src/app/services/panier.service';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMsg: string | null = null;
  showPassword = false;
  provider: any;
  ngOnInit() {
    const provider = new GoogleAuthProvider();
    this.provider = provider;
  }
  loginWithGmail() {
    const auth = getAuth();
    signInWithPopup(auth, this.provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          const token = await user.getIdToken();
  
          // Send token to backend for verification and user retrieval
          this.authService.googleLogin(token).subscribe((response: any) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigateByUrl("/");
            this.panierService.init();
          }, (error) => {
            console.error("Google login failed:", error);
          });
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  }
  


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  authService = inject(AuthService);
  router = inject(Router);
  panierService = inject(PanierService);
  login() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill in all required fields correctly.';
      return;
    }
    this.errorMsg = null;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((result: Auth) => {
      localStorage.setItem("token", result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigateByUrl("/");
      this.panierService.init();
    },
      (error: any) => {
        if (error.status === 400) {
          this.errorMsg = 'Invalid email or password. Please try again.';
        } else if (error.status === 500) {
          this.errorMsg = 'Server error. Please try again later.';
        } else {
          this.errorMsg = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }
}
