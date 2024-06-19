import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { AppRoutingModule, routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthInterceptor, CsrfInterceptor } from './services/auth.interceptor';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DetailproductsComponent } from './components/detailproducts/detailproducts.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    NavComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    ProductsComponent,
    DetailproductsComponent,
    CreateProductComponent,
    ShoppingCartComponent,
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
  ],
  bootstrap: []
})
export class AppModule { }
