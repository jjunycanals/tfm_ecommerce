import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailproductsComponent } from './components/detailproducts/detailproducts.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    HttpClientModule,
    ProductsComponent,
    DetailproductsComponent,
    CreateProductComponent
  ],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-app';
}
