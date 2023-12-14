import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  confirmationAlert(): void {
    Swal.fire({
      title: '¿Deseas continuar?',
      text: 'No podras recuperar el usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Usuario eliminado!',
          text: 'El usuario ha sido eliminado exitosamente.',
          icon: 'success',
        });
      }
    });
  }

  successAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Operacion ejecutada exitosamente',
      showConfirmButton: false,
      timer: 1100,
      timerProgressBar: true,
    });
  }
  constructor() {}
}
