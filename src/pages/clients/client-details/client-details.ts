import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'client-details.html'
})
export class ClientDetailsPage {
	client: any = {};
	totalBalance: any = 0;
	constructor(public navParams: NavParams) {
		this.client = navParams.get('client');
		for (let rec of this.client.receipts) {
			debugger
			this.totalBalance += rec.SALDO;
		}
	}
}
