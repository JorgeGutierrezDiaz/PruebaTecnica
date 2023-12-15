import { Injectable } from '@angular/core';
import { EmpleadoInterface } from '../models/empleado.model';
import { fakeBackendInterface } from '../models/fakeBackend.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private keyDatos = 'datos';
  private keyLastId = 'ultimoID';

  getData(): any {
    const dataString = localStorage.getItem(this.keyDatos);
    return dataString ? JSON.parse(dataString) : null;
  }

  //Usamos tipo Any por la estructura del fakebackend, pero deberia ir aqui una interfaz
  saveData(data: any): any {
    localStorage.setItem(this.keyDatos, JSON.stringify(data));
  }

  getLastId(): number {
    const lastId = localStorage.getItem(this.keyLastId) ?? '0';
    return Number(lastId);
  }

  saveLatestId(latestId: string): any {
    localStorage.setItem(this.keyLastId, latestId);
  }

  editEmployeeUsingID(employeeEdited: EmpleadoInterface) {
    let data: fakeBackendInterface = this.getData();

    const indiceObjetoAModificar = data.content.findIndex(
      (objeto) => objeto.id === employeeEdited.id
    );

    if (indiceObjetoAModificar !== -1) {
      data.content[indiceObjetoAModificar] = employeeEdited;
    }

    this.saveData(data);
  }

  deleteEmployee(
    employees: EmpleadoInterface[],
    employee: EmpleadoInterface
  ): boolean {
    const employeesCopy = employees;
    const index = employeesCopy.findIndex(
      (empleado) => empleado.id === employee.id
    );

    if (index !== -1) {
      employeesCopy.splice(index, 1);

      let data = this.getData();
      data.content = [];
      data.content.push(...employeesCopy);
      this.saveData(data);
      return true;
    } else {
      return false;
    }
  }

  constructor() {}
}
