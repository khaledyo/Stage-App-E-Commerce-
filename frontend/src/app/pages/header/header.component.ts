import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService=inject(AuthService);
  router=inject(Router);
  panierService=inject(PanierService);
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
  ngOnInit() {
    if (this.authService.LoginIn) {
      this.panierService.init();  
    }
  }
}
