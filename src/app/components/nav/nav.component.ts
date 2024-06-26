import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginComponent } from '../login/login.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-nav',
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
    ShoppingCartComponent,
  ],
  providers: [ApiService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private authService: ApiService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token'); // Neteja el token del localStorage
    this.router.navigate(['/login']);
  }

  shoppingCart(): void {
    this.router.navigate(['/cart'])
  }
}
