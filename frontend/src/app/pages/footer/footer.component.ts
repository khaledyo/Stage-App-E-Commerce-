import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsletterService } from 'src/app/services/newsletter.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  connectForm!: FormGroup; 
  emailService=inject(NewsletterService);
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.connectForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.connectForm.valid) {
      const email = this.connectForm.value.email;
      this.emailService.sendTestEmail(email).subscribe(
        (response) => {
          console.log('E-mail envoyé avec succès !', response);
          alert('E-mail envoyé avec succès !');
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'e-mail", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
        }
      );
    } else {
      alert('Veuillez entrer une adresse e-mail valide.');
    }
  }
}
