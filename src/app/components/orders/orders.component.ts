import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  datos: any;
  isEditModalOpen = false;
  selectedOrder: any = {};
  showSuccessModal = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe((response) => {
      this.datos = response;
    });
  }

  openEditModal(order: any): void {
    this.selectedOrder = { ...order };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  updateOrder(): void {
    this.apiService.updateOrder(this.selectedOrder.id, this.selectedOrder).subscribe(
      (response) => {
        this.isEditModalOpen = false;
        // Actualiza la llista ORDERS o mostra èxit
        this.apiService.getOrders().subscribe((response) => {
          console.log('update ' + response);
          this.datos = response;
          console.log('update this.datos es ' + this.datos);
        });
        this.closeEditModal();
      }, (error) => {
        // Per si hi ha error en fer UPDATE
        console.error('Error updating order', error);
      }
    );
  }

  deleteOrder(order: any): void {
    this.selectedOrder = { ...order };
    // Revisem que tinguem l'order a eliminar
    if (!this.selectedOrder || !this.selectedOrder.id) {
      console.error('No es pot eliminar porquè no hi ha un ID vàlid.');
      return;
    }

    this.apiService.deleteOrder(this.selectedOrder.id).subscribe(
      (response) => {
         // Mostrar el modal d'èxit
        this.showSuccessModal = true;

        // Reiniciar selectedOrder desprès d'eliminar
        this.selectedOrder = null;

        setTimeout(() => {
          this.closeSuccessModal();
        }, 3000);
      },
      (error) => {
        console.error('Error al eliminar el pedido:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

}
