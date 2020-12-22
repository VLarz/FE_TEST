import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { RecordsComponent } from './components/records/records.component';


const routes: Routes = [
  { path: '', redirectTo: 'records', pathMatch: 'full'},
  { path: 'records', component: RecordsComponent },
  { path: 'payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
