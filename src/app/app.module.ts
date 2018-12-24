import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';
import { ClientsListPage } from '../pages/clients/clients-list';
import { ClientDetailsPage } from '../pages/clients/client-details/client-details';
import { ProductsListPage } from '../pages/products/products-list';
import { ProductDetailsPage } from '../pages/products/product-details/product-details';
import { ClientSelectionPage } from '../pages/new-order/client-selection/client-selection';
import { ProductsSelectionPage } from '../pages/new-order/products-selection/products-selection';
import { AddProductModal } from '../pages/new-order/products-selection/add-product-modal/add-product-modal';
import { CheckoutPage } from '../pages/new-order/checkout/checkout';
import { ListPage } from '../pages/list/list';
import { ClientsProvider } from '../providers/clients';
import { ProductsProvider } from '../providers/products';
import { SearchPipe } from '../pipes/search';
import { OrdersProvider } from '../providers/orders';
import { AuthService } from '../providers/authentication';
import { LoadingService } from '../providers/loading';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		IndexPage,
		ListPage, 
		ClientsListPage, 
		ClientDetailsPage, 
		ProductsListPage, 
		ProductDetailsPage, 
		SearchPipe, 
		ClientSelectionPage, 
		ProductsSelectionPage, 
		AddProductModal, 
		CheckoutPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		IndexPage, 
		ListPage, 
		ClientsListPage, 
		ClientDetailsPage, 
		ProductsListPage, 
		ProductDetailsPage, 
		ClientSelectionPage, 
		ProductsSelectionPage, 
		AddProductModal, 
		CheckoutPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ClientsProvider, 
		ProductsProvider,
		OrdersProvider,
		AuthService,
    	LoadingService
	]
})
export class AppModule {}
