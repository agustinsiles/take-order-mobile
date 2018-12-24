import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './authentication';

@Injectable()
export class ProductsProvider {
	constructor(private http: Http, private auth: AuthService) {}
	syncProducts() {
    	return this.http.get('url/products', this.auth.getAuthHeaders());
	}

	filterProducts(filter) {
		const products = JSON.parse(localStorage.getItem('products')) || [];

		if (!filter) {
			return products;
		}

		const results = [];
		const reg = new RegExp(filter.toLowerCase());

		if (products.length) {
			for (let prod of products) {
				if (reg.test(prod.DESART.toLowerCase()) || reg.test(prod.CODART.toLowerCase())) {
					results.push(prod);
				}
			}
		}

		return results;
	}
}
