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

//Validators
import { fechaNacimientoValidator } from 'src/core/validators/fecha-nacimiento.validator';
import { seleccionaUnoValidator } from 'src/core/validators/selecciona-uno.validator.ts';

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

  //Busqueda
  busqueda: string = '';

  // Catalogos
  catalogoDeEmpleados: EmpleadoInterface[] = [];
  catalogoDeCargos: CargoInterface[] = [];
  filteredEmpleados: EmpleadoInterface[] = [];
  constructor(
    private alertService: AlertServiceService,
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder
  ) {
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fechaDeNacimiento: [
        '',
        [Validators.required, fechaNacimientoValidator()],
      ],
      edad: ['', [Validators.required]],
      estatus: [''],
      cargo: ['0', [Validators.required, seleccionaUnoValidator()]],
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
      // this.alertService.errorAlert('Formulario incompleta y/o invalido');
      this.marcarControlesComoTocados();
      return;
    }

    let tempData = this.databaseService.getData();
    let lastID: number = this.databaseService.getLastId();

    this.empleadoData = {
      id: lastID + 1,
      nombre: this.empleadoForm.value.nombre,
      edad: this.empleadoForm.value.edad,
      fechaDeNacimiento: this.empleadoForm.value.fechaDeNacimiento,
      estatus: this.empleadoForm.value.estatus,
      idCargo: this.empleadoForm.value.cargo,
    };

    let newLatestID = this.empleadoData.id;
    tempData.content.push(this.empleadoData);

    this.databaseService.saveData(tempData);
    this.databaseService.saveLatestId(String(newLatestID));

    this.alertService.successAlert();
  }

  async dev(): Promise<any> {
    await this.obtenerCatalogos();
    console.log(this.empleadoForm);
  }

  calcularEdad() {
    const fechaNacimiento = this.empleadoForm.get('fechaDeNacimiento')?.value;
    if (fechaNacimiento) {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();

      this.empleadoForm.get('edad')?.setValue(edad);
    }
  }

  marcarControlesComoTocados() {
    Object.values(this.empleadoForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
