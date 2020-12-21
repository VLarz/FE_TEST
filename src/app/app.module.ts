import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardPaymentComponent } from './components/credit-card/credit-card-payment/credit-card-payment.component';
import { CreditCardViewPaymentComponent } from './components/credit-card/credit-card-view-payment/credit-card-view-payment.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { creditCardPaymentReducer } from './components/credit-card/store/credit-card-payment.reducer';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardPaymentComponent,
    CreditCardComponent,
    CreditCardViewPaymentComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      creditCardPayments: creditCardPaymentReducer
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
