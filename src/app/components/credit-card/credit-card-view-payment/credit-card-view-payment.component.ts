import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditCardPayment } from 'src/app/models/credit-card-payment.model';

import { AppState } from '../../../app.state';

@Component({
  selector: 'app-credit-card-view-payment',
  templateUrl: './credit-card-view-payment.component.html',
  styleUrls: ['./credit-card-view-payment.component.scss']
})
export class CreditCardViewPaymentComponent implements OnInit {

  paymentRecords: Observable<CreditCardPayment[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.paymentRecords = this.store.select('creditCardPayments');
    // no need to unsubscribe and ngOndestroy, Angular and NgRX will auto unsubscribe
  }

}
