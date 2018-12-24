import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientDetailsPage } from './client-details/client-details';
import { ClientsProvider } from '../../providers/clients';
import { LoadingService } from '../../providers/loading';
import { Response } from '@angular/http';

@Component({
	templateUrl: 'clients-list.html'
})
export class ClientsListPage {  
	clientList: Array<{}> = [];

	constructor(private navCtrl: NavController, private loading: LoadingService, private clientsProvider: ClientsProvider) {
		this.clientList = JSON.parse(localStorage.getItem('clients')) || [];
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

	clientDetails(client) {
		debugger;
		this.navCtrl.push(ClientDetailsPage, { client });
	}

	searchClients(filter) {
		this.clientList = this.clientsProvider.filterClients(filter);
	}
}
