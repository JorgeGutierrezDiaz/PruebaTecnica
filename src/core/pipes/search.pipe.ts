import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, estatusFiltro: any): any[] {
    if (!items || (!searchText && estatusFiltro === undefined)) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      const cumpleFiltroBusqueda =
        String(item.id).includes(searchText) ||
        item.nombre.toLowerCase().includes(searchText);

      const cumpleFiltroEstatus =
        estatusFiltro === undefined || item.estatus === estatusFiltro;

      return cumpleFiltroBusqueda && cumpleFiltroEstatus;
    });
  }
}
