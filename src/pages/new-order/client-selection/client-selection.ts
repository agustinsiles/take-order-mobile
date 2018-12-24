import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsSelectionPage } from '../products-selection/products-selection';
import { ClientsProvider } from '../../../providers/clients';
import { LoadingService } from '../../../providers/loading';
import { Response } from '@angular/http';

@Component({
	selector: 'page-client-selection',
	templateUrl: 'client-selection.html'
})
export class ClientSelectionPage {
	order: any;
	clientList: Array<{}> = [];

	constructor(private navCtrl: NavController, private navParams: NavParams, private clientsProvider: ClientsProvider, private loading: LoadingService) {
		this.clientList = JSON.parse(localStorage.getItem('clients')) || [];
		this.order = this.navParams.get('order') || {};
	}
	
	syncClients(refresher) {
		this.loading.showLoading('Sincronizando...');

		this.clientsProvider.syncClients().subscribe(
			(response: Response) => { 
				this.clientList = response.json();
				localStorage.setItem('clients', JSON.stringify(this.clientList));
				refresher.complete();
				this.loading.dismiss();
			}, (error: Response) => {
				const err = error.json();
				refresher.complete();
				this.loading.showError(err.msg);
			}
		);
	}

	nextStep() {
		this.navCtrl.push(ProductsSelectionPage, {
			order: this.order
		});
	}

	searchClients(filter) {
		this.clientList = this.clientsProvider.filterClients(filter);
	}
}
