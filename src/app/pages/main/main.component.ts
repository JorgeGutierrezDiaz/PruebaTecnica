//Basic imports
import { Component, OnInit } from '@angular/core';

//Interfaces
import { Cargo } from 'src/core/models/cargo.model';
import { Empleado } from 'src/core/models/empleado.model';

//Services
import { AlertServiceService } from 'src/core/services/alert-service.service';
import { DatabaseService } from 'src/core/services/database.service';

//Constants
import { backend, initialID } from 'src/core/fakeBackend';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AlertServiceService],
})
export class MainComponent implements OnInit {
  //Catalogos
  empleado: Empleado[] = [];

  //Columnas
  mostrarColumnaDerecha: boolean = true;

  //Formulario
  empleadoForm!: FormGroup;
  empleadoData: Empleado = {
    id: 0,
    nombre: '',
    fechaDeNacimiento: '',
    edad: 0,
    estatus: false,
    idCargo: 1,
  };

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

  ngOnInit(): void {
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
  }

  botonCancelar(): void {
    this.mostrarColumnaDerecha = false;

    console.log(this.empleadoForm);
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

  dev(): void {
    let lastID = this.databaseService.getLastId();
    let data = this.databaseService.getData();

    console.log(data);
    console.log(lastID);
  }
}
