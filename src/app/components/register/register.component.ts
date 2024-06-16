import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  states = ['State 1', 'State 2', 'State 3'];

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

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
          // Manejar la respuesta del backend según lo necesites
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al registrar', error);
          // Manejar errores, por ejemplo mostrar un mensaje de error al usuario
        }
      );
  }
}
