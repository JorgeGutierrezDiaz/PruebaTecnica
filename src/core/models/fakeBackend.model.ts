import { EmpleadoInterface } from './empleado.model';

export interface fakeBackendInterface {
  content: EmpleadoInterface[]; // Cambia 'EmpleadoInterface' por el tipo de datos correcto
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
