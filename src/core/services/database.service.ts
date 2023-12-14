import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private key = 'datos';

  getData(): any {
    const dataString = localStorage.getItem(this.key);
    return dataString ? JSON.parse(dataString) : null;
  }

  saveData(data: any): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  constructor() {}
}
