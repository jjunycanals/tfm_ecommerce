import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/api';
  private apiAuthUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  // ORDERS
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${id}`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }

  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${id}`, order);
  }
  patchOrder(id: number, partialOrder: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${id}`, partialOrder);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`);
  }

  // Mètodes per PRODUCTS
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }
  patchProduct(id: number, partialProduct: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}`, partialProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // Login i Register
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiAuthUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiAuthUrl}/logout`, {});
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiAuthUrl}/register`, { email, password });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiAuthUrl}/user`);
  }

}
