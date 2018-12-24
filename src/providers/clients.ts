import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './authentication';

@Injectable()
export class ClientsProvider {
	constructor(private http: Http, private auth: AuthService) {}
	syncClients() {	
		return this.http.get('url/clientes', this.auth.getAuthHeaders());
	}

	filterClients(filter) {
		const clients = JSON.parse(localStorage.getItem('clients')) || [];

		if (!filter) {
			return clients;
		}

		const results = [];
		const reg = new RegExp(filter.toLowerCase());

		if (clients.length) {
			for (let cli of clients) {
				if (reg.test(cli.NOMCLI.toLowerCase()) || reg.test(cli.CODCLI.toLowerCase())) {
					results.push(cli);
				}
			}
		}

		return results;
	}
}
