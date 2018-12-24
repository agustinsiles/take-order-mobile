import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IndexPage } from '../index/index';
import { AuthService } from '../../providers/authentication';
import { LoadingService } from '../../providers/loading';
import { Response } from '@angular/http';

@Component({
	templateUrl: 'login.html',
})
export class LoginPage {
	credentials = {};

	constructor(private nav: NavController, private loading: LoadingService, private auth: AuthService) {
		const isAuthenticated = !!JSON.parse(localStorage.getItem('credentials'));
		if (isAuthenticated) this.nav.setRoot(IndexPage);
		else this._clearStorage();
	}

	public login() {
		this.loading.showLoading('Ingresando...');
    	this.auth.login(this.credentials).subscribe((response: Response) => {
			this.loading.dismiss();
			const data = response.json();
			if (data.token) {
				this._setStorage(data);
				this.nav.setRoot(IndexPage);
			}
    	}, (error: Response) => {
			const err = error.json();
			this._clearStorage();
			this.loading.showError(err.msg || 
				'Imposible conectarse con el servidor. Intente nuevamente.');
      	});
  	}

	private _setStorage(data) {
		localStorage.setItem('token', data.token);
		localStorage.setItem('credentials', JSON.stringify(this.credentials));
	}
	
	private _clearStorage() {
		localStorage.removeItem('token');
		localStorage.removeItem('credentials');
	}
}
