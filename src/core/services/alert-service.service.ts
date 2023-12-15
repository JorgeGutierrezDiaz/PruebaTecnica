import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  confirmationAlert(): Promise<boolean> {
    return Swal.fire({
      title: '¿Deseas continuar?',
      text: 'No podrás recuperar el usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      return result.isConfirmed;
    });
  }
  
  successAlert(mensaje = 'Operacion ejecutada exitosamente'): void {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1100,
      timerProgressBar: true,
    });
  }

  errorAlert(mensaje: string = 'Hubo un error'): void {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 1100,
      timerProgressBar: true,
    });
  }
  constructor() {}
}
