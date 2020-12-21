import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { creditCardPaymentReducer } from './components/store/credit-card-payment.reducer';
import { CreditCardPaymentComponent } from './components/credit-card-payment/credit-card-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({creditCardPayment: creditCardPaymentReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
