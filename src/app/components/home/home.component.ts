import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
import { Product } from '../../model/product.dto';

@Component({
  selector: 'app-home',
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
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    RouterModule
  ],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: any = {};

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  goProducts(): void {
    this.router.navigate(['/products']);
  }

  getFeaturedProducts(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
      // Filtra els productes destacats segons la teva lògica
      // this.featuredProducts = products.message.filter((product: Product) => product.isFeatured);
    });
  }

  viewProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

}
