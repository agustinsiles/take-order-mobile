import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {
 	constructor(private http: Http) {}
	 
	login(credentials) {
		return this.http.post('url/login', credentials);		
	}

	getAuthHeaders() {
		const jwt = localStorage.getItem('token'),
			headers = new Headers();

		if (jwt) {
			headers.append('Content-Type', 'application/json');
			headers.append('Authorization', `Bearer ${jwt}`);      
		}
		
		return new RequestOptions({ headers });
	}
}
