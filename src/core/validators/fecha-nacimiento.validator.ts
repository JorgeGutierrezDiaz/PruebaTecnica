import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fechaNacimientoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = control.value;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
      return { formatoInvalido: true };
    }

    const fechaNacimientoDate = new Date(fechaNacimiento);
    const fechaActual = new Date();

    if (
      isNaN(fechaNacimientoDate.getTime()) ||
      fechaNacimientoDate > fechaActual
    ) {
      return { fechaInvalida: true };
    }

    return null; // No hay errores
  };
}
