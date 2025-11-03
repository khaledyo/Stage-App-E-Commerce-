import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './manage/categories/categories.component';
import { CategoryFormComponent } from './manage/category-form/category-form.component';
import { ProductComponent } from './manage/product/product.component';
import { FormProductComponent } from './manage/form-product/form-product.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { adminGaurd } from './intercept/admin-guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGaurd } from './intercept/auth-guard';
import { PanierComponent } from './pages/panier/panier.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderComponent } from './manage/order/order.component';
import { AboutComponent } from './pages/about/about.component';
const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  {path:"admin/categories",component:CategoriesComponent,canActivate:[adminGaurd]},
  {path:"admin/categories/add",component:CategoryFormComponent,canActivate:[adminGaurd]},
  {path:"admin/categories/:id",component:CategoryFormComponent,canActivate:[adminGaurd]},
  {path:"admin/products",component:ProductComponent,canActivate:[adminGaurd]},
  {path:"admin/orders",component:OrderComponent,canActivate:[adminGaurd]},
  {path:"admin/products/add",component:FormProductComponent,canActivate:[adminGaurd]},
  {path:"profile",component:ProfileComponent,canActivate:[authGaurd]},
  {path:"panier",component:PanierComponent,canActivate:[authGaurd]},
  {path:"checkout",component:CheckoutComponent,canActivate:[authGaurd]},
  {path:"product-detail/:id",component:ProductDetailComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin/products/:id",component:FormProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
