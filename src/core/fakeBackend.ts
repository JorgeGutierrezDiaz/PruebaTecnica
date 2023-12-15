import { CargoInterface } from './models/cargo.model';
import { EmpleadoInterface } from './models/empleado.model';

//Guardamos la base de datos, despues esto lo usamos para guardarlo todo el objeto completo en localstorage simulando una api
export let backend = {
  content: [],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 100,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 6,
  last: true,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  size: 10,
  numberOfElements: 6,
  first: true,
  empty: false,
};

export let Catalogocargos: CargoInterface[] = [
  { id: 0, descripcion: 'Seleccione...' },
  { id: 1, descripcion: 'Gerente' },
  { id: 2, descripcion: 'Coordinador' },
  { id: 3, descripcion: 'Subdirector' },
];
export let initialID = '0';



export let arrayPruebas: EmpleadoInterface[] = [
  { id: 1, nombre: "Juan Ranurez", fechaDeNacimiento: "2005-01-12", edad: 1, estatus: true, idCargo: 2 },
  { id: 2, nombre: "María López", fechaDeNacimiento: "1990-06-21", edad: 32, estatus: false, idCargo: 1 },
  { id: 3, nombre: "Carlos Pérez", fechaDeNacimiento: "1985-09-15", edad: 37, estatus: true, idCargo: 3 },
  { id: 4, nombre: "Laura González", fechaDeNacimiento: "2000-02-08", edad: 22, estatus: false, idCargo: 3 },
  { id: 5, nombre: "Roberto Ramírez", fechaDeNacimiento: "1998-11-30", edad: 24, estatus: true, idCargo: 2 },
  { id: 6, nombre: "Ana Silva", fechaDeNacimiento: "1982-03-17", edad: 40, estatus: false, idCargo: 1 },
  { id: 7, nombre: "Diego Mendoza", fechaDeNacimiento: "1995-06-05", edad: 27, estatus: true, idCargo: 2 },
  { id: 8, nombre: "Sofía Martínez", fechaDeNacimiento: "2002-09-19", edad: 19, estatus: false, idCargo: 3 },
  { id: 9, nombre: "Javier Reyes", fechaDeNacimiento: "1978-01-28", edad: 44, estatus: true, idCargo: 2 },
  { id: 10, nombre: "Patricia Fernández", fechaDeNacimiento: "1993-04-14", edad: 29, estatus: false, idCargo: 2 },
  { id: 11, nombre: "Elena Castillo", fechaDeNacimiento: "1996-07-22", edad: 26, estatus: true, idCargo: 2 },
  { id: 12, nombre: "Raúl Torres", fechaDeNacimiento: "1989-12-05", edad: 32, estatus: false, idCargo: 3 },
  { id: 13, nombre: "Isabel Ramírez", fechaDeNacimiento: "1975-04-18", edad: 47, estatus: true, idCargo: 3 },
  { id: 14, nombre: "Miguel Sánchez", fechaDeNacimiento: "2004-10-09", edad: 17, estatus: false, idCargo: 1 },
  { id: 15, nombre: "Adriana Vargas", fechaDeNacimiento: "1991-08-14", edad: 30, estatus: true, idCargo: 1 },
  { id: 16, nombre: "Gabriel Mora", fechaDeNacimiento: "1987-03-03", edad: 35, estatus: false, idCargo: 3 },
  { id: 17, nombre: "Verónica Díaz", fechaDeNacimiento: "2000-01-26", edad: 22, estatus: true, idCargo: 2 },
  { id: 18, nombre: "Héctor Gómez", fechaDeNacimiento: "1998-09-12", edad: 23, estatus: false, idCargo: 2 },
  { id: 19, nombre: "Patricio Ruiz", fechaDeNacimiento: "1984-11-30", edad: 37, estatus: true, idCargo: 2 },
  { id: 20, nombre: "Diana Herrera", fechaDeNacimiento: "1994-06-17", edad: 28, estatus: false, idCargo: 1 },
  { id: 21, nombre: "Fernando González", fechaDeNacimiento: "1988-02-28", edad: 34, estatus: true, idCargo: 1 },
  { id: 22, nombre: "Alejandra Torres", fechaDeNacimiento: "1993-05-15", edad: 28, estatus: false, idCargo: 1 },
  { id: 23, nombre: "Roberto Soto", fechaDeNacimiento: "2002-12-10", edad: 19, estatus: true, idCargo: 2 },
  { id: 24, nombre: "Laura Mendoza", fechaDeNacimiento: "1997-09-22", edad: 24, estatus: false, idCargo: 3 },
  { id: 25, nombre: "Martín Ramírez", fechaDeNacimiento: "1982-11-05", edad: 39, estatus: true, idCargo: 2 },
  { id: 26, nombre: "Ana López", fechaDeNacimiento: "1995-04-13", edad: 26, estatus: false, idCargo: 1 },
  { id: 27, nombre: "Sergio Gómez", fechaDeNacimiento: "2003-07-18", edad: 18, estatus: true, idCargo: 2 },
  { id: 28, nombre: "Carmen Herrera", fechaDeNacimiento: "1986-08-30", edad: 35, estatus: false, idCargo: 3 },
  { id: 29, nombre: "Pablo Vargas", fechaDeNacimiento: "1990-03-07", edad: 31, estatus: true, idCargo: 2 },
  { id: 30, nombre: "María Ruiz", fechaDeNacimiento: "2001-06-24", edad: 20, estatus: false, idCargo: 2 }
];
