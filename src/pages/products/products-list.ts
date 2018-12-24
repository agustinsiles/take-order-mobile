import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductDetailsPage } from './product-details/product-details';
import { ProductsProvider } from '../../providers/products';
import { LoadingService } from '../../providers/loading';
import { Response } from '@angular/http';

@Component({
	templateUrl: 'products-list.html'
})
export class ProductsListPage {
	productsList: Array<{}> = [];

	constructor(private navCtrl: NavController, private productsProvider: ProductsProvider, private loading: LoadingService) {
		this.productsList = JSON.parse(localStorage.getItem('products')) || [];
	}

	syncProducts(refresher) {
		this.loading.showLoading('Sincronizando...');

		this.productsProvider.syncProducts().subscribe(
			(response: Response) => { 
				this.productsList = response.json();
				localStorage.setItem('products', JSON.stringify(this.productsList));
				refresher.complete();
				this.loading.dismiss();
			}, (error: Response) => {
				const err = error.json();
				refresher.complete();
				this.loading.showError(err.msg);
			}
		);
	}
	
	productDetails(product) {
		this.navCtrl.push(ProductDetailsPage, { product });
	}

	searchProducts(filter) {
		this.productsList = this.productsProvider.filterProducts(filter);
	}
}
