import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditCardPaymentComponent } from './components/credit-card/credit-card-payment/credit-card-payment.component';
import { CreditCardViewPaymentComponent } from './components/credit-card/credit-card-view-payment/credit-card-view-payment.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';

const routes: Routes = [
  { path: '', component: CreditCardComponent },
  { path: 'records', component: CreditCardViewPaymentComponent },
  { path: 'payment', component: CreditCardPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
