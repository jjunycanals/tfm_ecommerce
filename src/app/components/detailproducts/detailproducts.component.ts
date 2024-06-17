import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
import { Product } from '../../model/product.dto';

@Component({
  selector: 'app-detailproducts',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
  ],
  providers: [ApiService],
  templateUrl: './detailproducts.component.html',
  styleUrl: './detailproducts.component.scss'
})
export class DetailproductsComponent implements OnInit {
  product: Product | undefined;
  showModal: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(productId);
    if (productId) {
      this.getProductsbyId(productId);
    }
  }

  getProductsbyId(productId:number):void {
    console.log('entro getproducts');
    this.apiService.getProduct(productId).subscribe((data: any) => {
      console.log('entro servei');
      this.product = data.message;
    });
  }

  addToCart(): void {
    if (this.product) {
      const cart = localStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      const existingItem = cartItems.find((item: any) => item.id === this.product!.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          size: this.product.size,
          quantity: 1,
          image: `../../../assets/img/${this.product.images}`
        });
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false; // Amaga el modal
  }
}
