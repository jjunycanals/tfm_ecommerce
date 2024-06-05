import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoginComponent } from '../login/login.component';
import { OrdersComponent } from '../orders/orders.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-nav',
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
    HttpClientModule
  ],
  providers: [ApiService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
