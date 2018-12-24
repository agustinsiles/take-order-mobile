import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
	product: any = {};
	constructor(private navParams: NavParams) {
		this.product = this.navParams.get('product');
	}
}
