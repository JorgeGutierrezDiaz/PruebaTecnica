import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function seleccionaUnoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valorSeleccionado = control.value;
    const CONST_opcionInvalida = '0';
    if (valorSeleccionado === CONST_opcionInvalida) {
      return { seleccionaUno: true };
    }

    return null;
  };
}
