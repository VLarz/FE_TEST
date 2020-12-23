import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CreditCardPayment } from 'src/app/models/credit-card-payment.model';
import { CryptoJSService } from '../../services/cryptojs.service';

import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {

  paymentRecords: CreditCardPayment[] = [];
  subscription: Subscription;

  constructor(private store: Store<AppState>,
              private cryptoJSService: CryptoJSService) { }

  ngOnInit(): void {
    this.initRecords();
  }

  initRecords(): void {
    this.subscription = this.store.select('creditCardPayments').subscribe(
      res => {
        res.forEach(record => {
          this.paymentRecords.push({
            creditCardNumber: this.cryptoJSService.decrypt(record.creditCardNumber),
            cardHolder: this.cryptoJSService.decrypt(record.cardHolder),
            expirationDate: this.cryptoJSService.decrypt(record.expirationDate),
            securityCode: this.cryptoJSService.decrypt(record.securityCode),
            amount: record.amount,
          });
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    /**
     * No need unsubcribe because Angular and NgRx will auto subcribe
     * but to be sure I choose this approach for extra safety to
     * avoid memory leak
     */
  }

}
