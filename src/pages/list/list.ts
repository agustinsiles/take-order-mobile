import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
	selector: 'list-items',
	templateUrl: 'list.html'
})
export class ListPage {
	searchTerm: String = '';

	currentPage: any = 1;
	itemsPerPage: any = 50;
	pageQuantity: any = [];
	dataLength: any = 0;

	@Input() itemsList: Array<any> = [];  
	@Input() selectedItem: any = {};  
	@Output() onItemSelected: EventEmitter<any> = new EventEmitter();
	@Output() onSearch: EventEmitter<any> = new EventEmitter();

	ngOnInit() {
		if (this.itemsList) {
			this.dataLength = !!this.itemsList.length;
			this.populateData();
		};
	}

	ngOnChanges(changes: SimpleChanges) {
		const itemsList = changes.itemsList
		if (itemsList && !itemsList.firstChange && itemsList.currentValue !== itemsList.previousValue) {
			this.populateData();
		}
	}

	private populateData() {
		this.pageQuantity = [];
		this.currentPage = 1;

		const pages = this.itemsList.length <= this.itemsPerPage ? 1 : Math.ceil(this.itemsList.length / this.itemsPerPage);
		for (let i = 0; i < pages; i++) this.pageQuantity.push(i);
	}

	searchItem(event: any) {
		this.onSearch.emit(event.target.value);
	}

	setPage(pageNo) {
        this.currentPage = pageNo;
    }

	onClicked(item) {    
		this.onItemSelected.emit(item);
	}

	isSelected(item) {
		if (item.CODCLI) {
			return item.CODCLI === this.selectedItem;
		}
		
		return item.CODART === this.selectedItem;
	}
}
