import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
import { DetailproductsComponent } from '../detailproducts/detailproducts.component';

@Component({
  selector: 'app-products',
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
    DetailproductsComponent,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    RouterModule
  ],
  providers: [ApiService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products: any = {};

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  viewProductDetail(productId: number): void {
    console.log('aqui');
    this.router.navigate([`/products`, productId]);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/create-product', productId]);
  }

  isLoggedIn(): boolean {
    // Revisem si hi ha un token de sessió login
    return this.apiService.isLoggedIn();
  }
}
