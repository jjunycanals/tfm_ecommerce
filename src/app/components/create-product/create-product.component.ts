import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  productForm!: FormGroup;
  productId: number | null = null;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      // Comprova si es tracta d'una edició o una creació
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    // Inicialitzem el formulari
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      size: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      images: ['', Validators.required],
      product_size: ['', Validators.required],
      short_message: ['', Validators.required]
    });

    // Si el producte exiteix portem la info
    if (this.productId) {
      // Si és una edició, obtenim les dades del producte
      this.apiService.getProduct(this.productId).subscribe(product => {
        this.productForm.patchValue({
          name: product.message.name,
          description: product.message.description,
          features: product.message.features,
          size: product.message.size,
          price: product.message.price,
          images: product.message.images,
          product_size: product.message.product_size,
          short_message: product.message.short_message
        });
        console.log(this.productForm);
      });
    }
  }

  // // Per accedir als controls del formulari
  get f() {
    return this.productForm.controls;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.productId) {
      // passar de string a number
      this.product = {
        id: parseFloat(this.route.snapshot.params['id']),
        product_number: parseFloat(this.route.snapshot.params['id']),
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        features: this.productForm.value.features,
        size: this.productForm.value.size,
        price: parseFloat(this.productForm.value.price),
        images: this.productForm.value.images,
        product_size: this.productForm.value.product_size,
        short_message: this.productForm.value.short_message
      };

      // Si l'ID del producte ja existeix, realitza una actualització
      this.apiService.updateProduct(this.product.id, this.product).subscribe((response) => {
        console.log('fem update');
        console.log(response.product);
        this.router.navigate(['/products']);
      });
    } else {
      console.log('crear');
      // Si l'ID del producte no existeix, crea un nou producte
      this.apiService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

}
