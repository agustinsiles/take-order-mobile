import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProductsListPage } from '../products/products-list';
import { ClientsListPage } from '../clients/clients-list';
import { ClientSelectionPage } from '../new-order/client-selection/client-selection';
import { OrdersProvider } from '../../providers/orders';
import { LoadingService } from '../../providers/loading';
import { LoginPage } from '../login/login';
import { Response } from '@angular/http';
import { map } from 'lodash';

@Component({
	templateUrl: 'index.html'
})
export class IndexPage {
	orders: Array<any> = [];

	constructor(private navCtrl: NavController, private alertCtrl: AlertController, private orderService: OrdersProvider, private loading: LoadingService) {
		this.orders = JSON.parse(localStorage.getItem('orders')) || [];
	}

	syncOrders(orders) {
		this.loading.showLoading('Sincronizando...');

		if (orders.length > 0) {
			this.orderService.uploadOrders(orders).subscribe(
				(response: Response) => {
					const data = response.json();
					if (data.added) this._updateCart(orders);
					else this.loading.showError('Error al sincronizar. Intente nuevamente');
				}, (error: Response) => {
					if (error.status === 401) {
						localStorage.removeItem('credentials');
						this.loading.showError('Su sesión ha expirado. Por favor, ingrese sus datos nuevamente utilizando el mismo código de viajante de antes.');
						this.navCtrl.setRoot(LoginPage);
					} else {
						const err = error.json();
						this.loading.showError(err.msg);
					}
				}
			);
		} else {
			this.loading.showError('Debe seleccionar un pedido para sincronizar.');
		}
	}

	private _updateCart(orders) {
		if (orders.length > 1) {
			this.orders = [];
		} else {
			const i = this.orders.findIndex(x => x.NPEDIDO === orders[0].NPEDIDO);
			this.orders.splice(i, 1);	
		}

		localStorage.setItem('orders', JSON.stringify(this.orders));
		this.loading.dismiss();
	}

	getProductsString(order) {
		return map(order.products, 'DESART').join(', ');
	}

	openClientsList() {
		this.navCtrl.push(ClientsListPage);
	}

	openProductsList() {
		this.navCtrl.push(ProductsListPage);
	}

	createOrder(order) {
		sessionStorage.removeItem('cart');
		this.navCtrl.push(ClientSelectionPage, { order });
	}

	deleteOrder(isDeleteAll, order) {
		const message = isDeleteAll ? 'Desea eliminar TODOS los pedidos? ' : ' Desea eliminar el pedido? '
		const cancelOrderConfirm = this.alertCtrl.create({
			title: 'Atencion',
			message,
			buttons: [{
				text: 'Cancelar',
				handler: () => {}
			}, {
				text: 'Aceptar',
				handler: () => { 
					if (isDeleteAll) this.orders = [];
					else this.orders.splice(order, 1);
					localStorage.setItem('orders', JSON.stringify(this.orders));
				}
			}]
		});

		cancelOrderConfirm.present();
	}

	huskyVersion() {
		this.alertCtrl.create({
			title: 'Husky Mobile: 0.90',
			subTitle: `Seleccione Artículos o Clientes y deslice hacia abajo para sincronizar sus datos. 
				Ante cualquier duda comuniquese con huskysoftware@gmail.com`,
			buttons: ['Ok']
		}).present();
	}
}
