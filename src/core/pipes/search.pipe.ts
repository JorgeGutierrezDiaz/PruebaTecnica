import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return (
        String(item.id).includes(searchText) ||
        item.nombre.toLowerCase().includes(searchText) ||
        String(item.edad).includes(searchText)
      );
    });
  }
}
