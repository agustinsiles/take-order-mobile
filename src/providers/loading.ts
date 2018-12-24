import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadingService {
	loading: Loading;
	constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

	showLoading(content) {
    	this.loading = this.loadingCtrl.create({ content, dismissOnPageChange: true	});
		return this.loading.present();
  	}
 
  	showError(subTitle) {
    	this.dismiss();

	    const alert = this.alertCtrl.create({
      		title: 'Husky Software',
      		subTitle: subTitle || 'Hubo un problema con su conexión. Por favor, intente nuevamente.',
      		buttons: ['OK']
    	});

    	return alert.present();
  	}

	dismiss() {
		this.loading.dismiss();
	}
}
