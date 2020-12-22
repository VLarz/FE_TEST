import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreditCardPayment } from 'src/app/models/credit-card-payment.model';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  paymentRecords: Observable<CreditCardPayment[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.paymentRecords = this.store.select('creditCardPayments');
    // No need to unsubscribe and ngOndestroy, Angular and NgRx will auto unsubscribe.
  }

}
