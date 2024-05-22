import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DetailproductsComponent } from '../detailproducts/detailproducts.component';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { RegisterComponent } from '../register/register.component';
import { Product } from '../../model/product.dto';

@Component({
  selector: 'app-create-product',
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
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {
  product: Product = new Product(0, 0, '', '', '', '', 0, '', '', '');

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Comprova si es tracta d'una edició o una creació
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      // Si és una edició, obtenim les dades del producte
      this.apiService.getProduct(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  onSubmit(): void {
    if (this.product.id) {
      // Si l'ID del producte ja existeix, realitza una actualització
      this.apiService.updateProduct(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      // Si l'ID del producte no existeix, crea un nou producte
      this.apiService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

}
