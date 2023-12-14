import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo.model';

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

  constructor() {}
}
