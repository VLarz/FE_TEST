import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { creditCardPaymentReducer } from './store/credit-card-payment.reducer';
import { CreditCardPaymentComponent } from './components/credit-card/credit-card-payment/credit-card-payment.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CreditCardViewPaymentComponent } from './components/credit-card/credit-card-view-payment/credit-card-view-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardPaymentComponent,
    CreditCardComponent,
    CreditCardViewPaymentComponent
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
