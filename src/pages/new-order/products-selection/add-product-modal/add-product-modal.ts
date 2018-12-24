import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-add-product-modal',
	templateUrl: 'add-product-modal.html'
})
export class AddProductModal {
	product: any = {};
	price: number;
	constructor(private viewCtrl: ViewController, private navParams: NavParams) {
		this.product = this.navParams.get('product');
		this.price = this.navParams.get('price');
		this.product.CANT_PED = this.product.CANT_PED || 1;
	}

	close(addProduct) {
		this.viewCtrl.dismiss(addProduct ? { product: this.product } : null);
	}

	get total() {
		return (this.product.CANT_PED * this.price).toFixed(2);
	}
}
