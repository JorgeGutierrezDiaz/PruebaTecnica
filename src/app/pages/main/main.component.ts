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
  mostrarColumnaDerecha: boolean = false;

  //Formulario
  empleadoForm!: FormGroup;
  editarEmpleadoForm!: FormGroup;
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
  estatusFiltro: boolean | undefined = undefined;

  //Paginacion
  itemsPorPagina = 5;
  pagina = 1;

  //Inline Editing
  modoDeEdicion: boolean = false;
  indiceRegistroEditando: number = -1;

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
      estatus: [true],
      cargo: ['0', [Validators.required, seleccionaUnoValidator()]],
    });

    this.editarEmpleadoForm = this.formBuilder.group({
      id: [0],
      nombre: ['', [Validators.required]],
      fechaDeNacimiento: [
        '',
        [Validators.required, fechaNacimientoValidator()],
      ],
      edad: ['', [Validators.required]],
      estatus: [true],
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

  async agregarRegistrosRapido(): Promise<void> {
    await this.databaseService.insertTestingData();
    await this.obtenerCatalogos();
  }

  filtradoPorEstatus(propiedadFiltro: Event): void {
    const valorSeleccionado = (propiedadFiltro.target as HTMLSelectElement)
      .value;

    // Si es "todos", no aplicamos filtro
    this.estatusFiltro =
      valorSeleccionado === 'todos' ? undefined : valorSeleccionado === 'true';
  }

  async borrarEmpleado(empleado: EmpleadoInterface): Promise<void> {
    const response = await this.databaseService.deleteEmployee(
      this.catalogoDeEmpleados,
      empleado
    );

    if (response) {
      this.alertService.successAlert('Empleado eliminado correctamente');
      await this.obtenerCatalogos();
    } else {
      this.alertService.errorAlert('Ocurrio un error');
    }
  }

  botonCancelar(): void {
    this.mostrarColumnaDerecha = false;
    this.empleadoForm.reset({
      nombre: '',
      fechaDeNacimiento: '',
      edad: '',
      estatus: true,
      cargo: '0',
    });
  }

  cambiarResultadosPorPagina(numero: any): void {
    this.itemsPorPagina = parseInt(numero.target.value);
  }

  editarEmpleado(empleado: EmpleadoInterface, indice: number) {
    this.editarEmpleadoForm.patchValue({
      id: empleado.id,
      nombre: empleado.nombre,
      fechaDeNacimiento: empleado.fechaDeNacimiento,
      edad: empleado.edad,
      estatus: empleado.estatus,
      cargo: empleado.idCargo,
    });
    this.indiceRegistroEditando = indice;
    this.modoDeEdicion = true;
  }

  async cambiarStatus(empleado: EmpleadoInterface): Promise<any> {
    let copiaEmpleado = empleado;
    copiaEmpleado.estatus = !copiaEmpleado.estatus;
    this.databaseService.editEmployeeUsingID(copiaEmpleado);

    await this.obtenerCatalogos();
  }

  async envioFormulario(): Promise<void> {
    if (!this.empleadoForm.valid) {
      // this.alertService.errorAlert('Formulario incompleta y/o invalido');
      this.marcarControlesComoTocados();
      return;
    }

    let tempData = await this.databaseService.getData();
    let lastID: number = await this.databaseService.getLastId();

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

    await this.databaseService.saveData(tempData);
    await this.databaseService.saveLatestId(String(newLatestID));
    this.alertService.successAlert();
    await this.obtenerCatalogos();
    this.empleadoForm.reset({
      nombre: '',
      fechaDeNacimiento: '',
      edad: '',
      estatus: true,
      cargo: '0',
    });
  }

  cancelarEdicion(): void {
    this.modoDeEdicion = false;
    this.indiceRegistroEditando = -1;
    this.editarEmpleadoForm.reset();
  }

  guardarEdicion(): void {
    if (!this.editarEmpleadoForm.valid) {
      Object.values(this.editarEmpleadoForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    let empleadoEditado: EmpleadoInterface = {
      id: this.editarEmpleadoForm.value.id,
      nombre: this.editarEmpleadoForm.value.nombre,
      fechaDeNacimiento: this.editarEmpleadoForm.value.fechaDeNacimiento,
      edad: this.editarEmpleadoForm.value.edad,
      estatus: this.editarEmpleadoForm.value.estatus,
      idCargo: this.editarEmpleadoForm.value.cargo,
    };
    this.databaseService.editEmployeeUsingID(empleadoEditado);
    this.alertService.successAlert('Empleado modificado correctamente');

    this.cancelarEdicion();
    this.obtenerCatalogos();
  }

  getDescripcionCargo(idCargo: string): string {
    const cargo = Catalogocargos.find((c) => c.id === parseInt(idCargo));
    return cargo ? cargo.descripcion : 'No especificado';
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
  abrirFormulario(): void {
    this.mostrarColumnaDerecha = true;
  }

  marcarControlesComoTocados() {
    Object.values(this.empleadoForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
