import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams, AlertController } from 'ionic-angular';
import { Response } from '@angular/http';
import { AddProductModal } from './add-product-modal/add-product-modal'
import { ProductsProvider } from '../../../providers/products';
import { CheckoutPage } from '../checkout/checkout';
import { LoadingService } from '../../../providers/loading';
import { clone, findIndex } from 'lodash';

@Component({
	selector: 'page-products-selection',
	templateUrl: 'products-selection.html'
})
export class ProductsSelectionPage {
	order: any = {};
	products: Array<{}> = [];
	shoppingCart: Array<any> = []; 

	constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, 
		private productsProvider: ProductsProvider, private navParams: NavParams, 
		private alertCtrl: AlertController, private loading: LoadingService) {

		this.products = JSON.parse(localStorage.getItem('products')) || [];
		this.order = this.navParams.get('order');
		this.shoppingCart = this.order.products || JSON.parse(sessionStorage.getItem('cart')) || [];
	}

	syncProducts(refresher) {
		this.loading.showLoading('Sincronizando...');

		this.productsProvider.syncProducts().subscribe(
			(response: Response) => { 
				this.products = response.json();
				localStorage.setItem('products', JSON.stringify(this.products));
				refresher.complete();
				this.loading.dismiss();
			}, (error: Response) => {
				const err = error.json();
				refresher.complete();
				this.loading.showError(err.msg);
			}
		);
	}

	addProductDialog(selectedProduct) {
		const productIndex = findIndex(this.shoppingCart, product => product.CODART === selectedProduct.CODART);
		
		const product = productIndex > -1 ? 
			clone(this.shoppingCart[productIndex]) : selectedProduct;
		
		const price = this.getPriceByClient(product);
		const popover = this.popoverCtrl.create(AddProductModal, { product, price });
		
		popover.present();
		popover.onDidDismiss(data => {
			if (data && data.product) this._updateCart(product, productIndex);
		});
	}

	private _updateCart(product, productIndex) {
		product.PVENTA = this.getPriceByClient(product);

		if (productIndex > -1) this.shoppingCart[productIndex] = product;
		else this.shoppingCart.push(product);    
		
		sessionStorage.setItem('cart', JSON.stringify(this.shoppingCart));
	}

	removeFromCart(evt, product) {
		evt.stopPropagation();
		const removeProductConfirm = this.alertCtrl.create({
			title: 'Atencion',
			message: `Desea quitar ${this.shoppingCart[product].DESART}  del pedido?`,
			buttons: [{
				text: 'Cancelar',
				handler: () => {}
			}, {
				text: 'Aceptar',
				handler: () => {
					this.shoppingCart.splice(product, 1);
					sessionStorage.setItem('cart', JSON.stringify(this.shoppingCart));
				}
			}]
		});

		removeProductConfirm.present();
	}

	getPriceByClient(product) {
		return product[`PVENTA_${this.order.client.LISTAPRE}`];
	}

	nextStep() {
		this.order.products = this.shoppingCart;
		this.navCtrl.push(CheckoutPage, {
			order: this.order
		});
	}

	searchProducts(filter) {
		this.products = this.productsProvider.filterProducts(filter);
	}
}
