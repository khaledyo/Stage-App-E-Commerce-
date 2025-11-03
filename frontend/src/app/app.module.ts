import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './manage/categories/categories.component';
import { CategoryFormComponent } from './manage/category-form/category-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './manage/product/product.component';
import { FormProductComponent } from './manage/form-product/form-product.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenHttpInterceptor } from './intercept/http-token-intercepter';
import { ProfileComponent } from './pages/profile/profile.component';
import { PanierComponent } from './pages/panier/panier.component';  
import { MatBadgeModule } from '@angular/material/badge';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './manage/order/order.component';
import { AboutComponent } from './pages/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HomeComponent,
    CategoryFormComponent,
    ProductComponent,
    FormProductComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PanierComponent,
    CheckoutComponent,
    OrderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatFormFieldModule, MatInputModule,
    MatTableModule, MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,  // Use the class-based interceptor
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
