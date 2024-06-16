import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
interface CartItem {
  id: number;
  name: string;
  price: number;
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
    ReactiveFormsModule,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule
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
    this.tax = this.subtotal * 0.21; // IVA fixat al 21%
    this.total = this.subtotal + this.tax + 3.99; // Enviament fixat a 3,99 €
  }

  checkout(): void {
    const order = {
      items: this.cartItems,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total
    };

    this.apiService.createOrder(order).subscribe(response => {
      console.log('Order created', response);
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.calculateTotals();
    });
  }

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
