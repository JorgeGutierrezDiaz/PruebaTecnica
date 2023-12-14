//Basic imports
import { Component, OnInit } from '@angular/core';

//Models
import { Cargo } from 'src/core/models/cargo.model';

//Services
import { AlertServiceService } from 'src/core/services/alert-service.service';
import { DatabaseService } from 'src/core/services/database.service';

//Constants
import { backend } from 'src/core/fakeBackend';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AlertServiceService],
})
export class MainComponent implements OnInit {
  //Catalogos
  cargos: Cargo[] = [];

  constructor(
    private alertService: AlertServiceService,
    private database: DatabaseService
  ) {}

  ngOnInit(): void {
    // Intentamos cargar los datos almacenados en localStorage
    const storedData = this.database.getData();

    // Si no hay datos almacenados, le metemos el fakebackend al LocalStorage
    if (!storedData) {
      this.database.saveData(backend);
    } 
  }
}
