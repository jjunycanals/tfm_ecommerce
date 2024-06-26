import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
interface CartItem {
  id: number;
  name: string;
  price: number;
  delivery: number;
  size: string;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
  ],
  providers: [ApiService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  delivery: number = 0;
  size: string = '';
  isModalOpen: boolean = false;
  paymentMethod: string = 'card';
  iban: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotals();
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.calculateTotals();
    console.log(this.cartItems);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateQuantity(item: CartItem, index: number): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.calculateTotals();
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.calculateTotals();
    this.saveCart();
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (this.subtotal != 0) {
      this.delivery = 3.99;
    } else { this.delivery = 0; }
    this.tax = this.subtotal * 0.21; // IVA fixat al 21%
    this.total = this.subtotal + this.tax + this.delivery; // Enviament fixat a 3,99 €
  }

  // checkout(): void {
  //   const order = {
  //     items: this.cartItems,
  //     subtotal: this.subtotal,
  //     tax: this.tax,
  //     total: this.total
  //   };

  //   this.apiService.createOrder(order).subscribe(response => {
  //     console.log('Order created', response);
  //     localStorage.removeItem('cart');
  //     this.cartItems = [];
  //     this.calculateTotals();
  //   });
  // }

  // Modal
  openPaymentModal(): void {
    this.isModalOpen = true;
  }

  closePaymentModal(): void {
    this.isModalOpen = false;
  }

  confirmPayment(): void {
    if (this.paymentMethod === 'card' && !this.iban) {
      alert('Por favor, introduzca el IBAN.');
      return;
    }

    const order = {
      items: this.cartItems,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      paymentMethod: this.paymentMethod,
      iban: this.paymentMethod === 'card' ? this.iban : null
    };

    this.apiService.createOrder(order).subscribe(response => {
      console.log('Order created', response);
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.calculateTotals();
      this.closePaymentModal();
    });
  }
}
