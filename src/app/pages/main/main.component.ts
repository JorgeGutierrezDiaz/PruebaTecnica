//Basic imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Interfaces
import { CargoInterface } from 'src/core/models/cargo.model';
import { fakeBackendInterface } from 'src/core/models/fakeBackend.model';
import { EmpleadoInterface } from 'src/core/models/empleado.model';

//Services
import { AlertServiceService } from 'src/core/services/alert-service.service';
import { DatabaseService } from 'src/core/services/database.service';

//Constants
import { backend, initialID, Catalogocargos } from 'src/core/fakeBackend';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AlertServiceService],
})
export class MainComponent implements OnInit {
  //  Interfaces
  empleado: EmpleadoInterface[] = [];

  //Columnas
  mostrarColumnaDerecha: boolean = true;

  //Formulario
  empleadoForm!: FormGroup;
  empleadoData: EmpleadoInterface = {
    id: 0,
    nombre: '',
    fechaDeNacimiento: '',
    edad: 0,
    estatus: false,
    idCargo: 1,
  };

  // Catalogos
  catalogoDeEmpleados: EmpleadoInterface[] = [];
  catalogoDeCargos: CargoInterface[] = [];

  constructor(
    private alertService: AlertServiceService,
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder
  ) {
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fechaDeNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      estatus: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    // Intentamos cargar los datos almacenados en localStorage
    const storedData = this.databaseService.getData();
    const lastID = this.databaseService.getLastId();

    // Si no hay datos almacenados, le metemos el fakebackend al LocalStorage
    if (!storedData) {
      this.databaseService.saveData(backend);
    }

    // Si no hay ultimo id almacenados, le metemos el inicial al LocalStorage
    if (!lastID) {
      this.databaseService.saveLatestId(initialID);
    }

    await this.obtenerCatalogos();
  }

  async obtenerCatalogos(): Promise<void> {
    try {
      const database: fakeBackendInterface =
        await this.databaseService.getData();
      this.catalogoDeEmpleados = database.content;
      this.catalogoDeCargos = Catalogocargos;
    } catch (error) {
      this.alertService.errorAlert(
        'No se pudieron obtener los catálogos de datos'
      );
    }
  }

  botonCancelar(): void {
    this.mostrarColumnaDerecha = false;
    this.empleadoForm.reset();
  }

  envioFormulario(): void {
    if (!this.empleadoForm.valid) {
      this.alertService.errorAlert('Formulario incompleta y/o invalido');
    }

    let tempData = this.databaseService.getData();
    let lastID: number = this.databaseService.getLastId();

    this.empleadoData = {
      id: lastID + 1,
      nombre: this.empleadoForm.value.nombre,
      edad: this.empleadoForm.value.edad,
      fechaDeNacimiento: this.empleadoForm.value.fechaDeNacimiento,
      estatus: this.empleadoForm.value.estatus,
      idCargo: 1,
    };

    let newLatestID = this.empleadoData.id;
    tempData.content.push(this.empleadoData);

    this.databaseService.saveData(tempData);
    this.databaseService.saveLatestId(String(newLatestID));
  }

  async dev(): Promise<any> {
    await this.obtenerCatalogos();
    console.log(this.catalogoDeEmpleados);
    console.log(this.catalogoDeCargos);
  }
}
