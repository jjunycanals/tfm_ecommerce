import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DetailproductsComponent } from '../detailproducts/detailproducts.component';
import { LoginComponent } from '../login/login.component';
import { NavComponent } from '../nav/nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    ProductsComponent,
    DetailproductsComponent,
    CreateProductComponent
  ],
  providers: [ApiService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  states = ['Barcelona', 'Madrid', 'Girona'];
  csrfToken: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
    // Obtenir el token CSRF des de Laravel
    this.fetchCSRFToken();
  }

  // Funció per obtenir el token CSRF des de Laravel
  fetchCSRFToken(): void {
    this.http.get<any>('http://127.0.0.1:8000/sanctum/csrf-cookie').subscribe(
      response => {
        // És aquí on el backend de Laravel prepara la cookie CSRF
        this.csrfToken = response.csrf_token;
      },
      error => {
        console.error('Error al obtenir el token CSRF', error);
      }
    );
  }

  // Per accedir als controls del formulari
  get f() {
    console.log(this.registerForm.controls);
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // STOP si el formulari no és vàlid
    if (this.registerForm.invalid) {
      return;
    }

    // Mostrar si les dades del formulari són OK
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.apiService.register(this.registerForm.value
      // this.registerForm.controls['username'].value,
      // this.registerForm.controls['email'].value,
      // this.registerForm.controls['password'].value
    )
      .subscribe(
        response => {
          // Resposta del backend segons necesitats
          console.log('Registre exit ', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al registre', error);
        }
      );
  }
}
