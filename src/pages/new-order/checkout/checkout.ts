import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { IndexPage } from '../../index/index';

@Component({
	selector: 'page-checkout',
  	templateUrl: 'checkout.html'
})
export class CheckoutPage {
	order: any = {};
	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
		this.order = this.navParams.get('order');
		this.order.TOTAL = 0;
		this.order.FMOV = this._getDate();
		this.order.FENTREGA = this.order.FENTREGA || this._getDate();

		for (const prod of this.order.products) {
			prod.TOTAL = (prod.CANT_PED * this._getPriceByClient(prod));
			this.order.TOTAL += prod.TOTAL;
		}
	}	

  	submit() {
		this.order.CVIAJ = JSON.parse(localStorage.getItem('credentials')).CVIAJ;
		this._updateOrders();
		this.navCtrl.setRoot(IndexPage);
  	}

  	cancel() {
		const cancelOrderConfirm = this.alertCtrl.create({
	  		title: 'Atención',
			message: 'Desea cancelar el pedido? Todos los cambios serán perdidos.',
			buttons: [{
				text: 'No',
				handler: () => {}
			}, {
				text: 'Si',
				handler: () => this.navCtrl.setRoot(IndexPage)
			}]
		});

		cancelOrderConfirm.present();
	}

	getProductPrice(product) {
		return (product.CANT_PED * this._getPriceByClient(product)).toFixed(2);
	}

	private _getPriceByClient(product) {
		return product[`PVENTA_${this.order.client.LISTAPRE}`];
	}

	private _updateOrders() {
		const orders = JSON.parse(localStorage.getItem('orders')) || [];
	
		// Edited order
		if (this.order.NPEDIDO) {
			const i = orders.findIndex(x => x.NPEDIDO === this.order.NPEDIDO);
			orders[i] = this.order;
		} else {
			this.order.NPEDIDO = this._guid();
			orders.push(this.order);
		}
		
		localStorage.setItem('orders', JSON.stringify(orders));
	}

	private _randomString() {
		return Math.floor((1 + Math.random()) * 0x10000 + 
			new Date().getTime()).toString(30);
	}

	private _guid() {
		return this._randomString() + this._randomString();
	}

	private _getDate() {
		const d = new Date();
		const month = ("0" + (d.getMonth() + 1)).slice(-2);
		const day = ("0" + (d.getDate())).slice(-2);
		const year = d.getFullYear();
	
		return `${year}-${month}-${day}`;
	}
}
