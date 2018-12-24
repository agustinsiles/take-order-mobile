import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './authentication';

@Injectable()
export class OrdersProvider {
	constructor(public http: Http, public auth: AuthService) {}
	uploadOrders(orders) {
		return this.http.post('url/order/create', { orders }, this.auth.getAuthHeaders())
	}
}
