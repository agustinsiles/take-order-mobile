import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {
	private filterByString(filter) {
		filter = filter.toLowerCase();
		return value => {
			const tmp = value;
			if (value.CODART) {
				value = tmp.CODART;
			
				if (value.toLowerCase().indexOf(filter) === -1) {
					value = tmp.DESART;
				}
			}

			if (value.CODCLI) {
				value = tmp.CODCLI;
			
				if (value.toLowerCase().indexOf(filter) === -1) {
					value = tmp.NOMCLI;
				}
			}

			return !filter || value.toLowerCase().indexOf(filter) !== -1;
		}
	}

	transform(array: any[], filter: any): any {
		return array.filter(this.filterByString(filter));
	}
}
