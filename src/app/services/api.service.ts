import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/api';
  private apiAuthUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    // Revisem si hi ha un token de sessió login
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      // Realiza el resto de la lógica
      return !!token; // Por ejemplo, retornar true si hay token
    }
    return false;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': ''
    });

    // Obtenir el token CSRF de l'etiqueta meta
    // const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const csrfToken = this.getCSRFToken();
    if (csrfToken) {
      // headersConfig['X-XSRF-TOKEN'] = csrfToken;
      headers = headers.set('X-XSRF-TOKEN', csrfToken);
    }
    console.log(headers);
    return headers;
  }

  private getCSRFToken(): string | null {
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.content : null;
  }


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
    return this.http.put(`${this.apiUrl}/orders/${id}`, order, { headers: this.getHeaders() });
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
    console.log(product);
    console.log(`${this.apiUrl}/products/${id}`);

    return this.http.put(`${this.apiUrl}/products/${id}`, product, { headers: this.getHeaders() });
  }
  patchProduct(id: number, partialProduct: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}`, partialProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // Login i Register
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers: this.getHeaders() });
  }
  // login(email: string, password: string): Observable<any> {
  //   return from(axios.post(`${this.apiUrl}/login`, { email, password }, { headers: this.getHeaders() }));
  // }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  // register(name:string, email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  // }
  register(data: any) {
    // Enviar la solicitud POST con las cabeceras configuradas
    return this.http.post<any>(`${this.apiUrl}/register`, data, { headers: this.getHeaders() });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUserbyId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

}
