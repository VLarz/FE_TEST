import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import { CreditCardPayment } from '../../models/credit-card-payment.model';
import { PaymentService } from '../../services/payment.service';
import * as PaymentActions from '../../store/credit-card-payment.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isSuccessful = false;
  paymentForm: FormGroup;

  constructor(private store: Store<AppState>,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const allowDigitOnly = /^[0-9]\d*$/;

    this.paymentForm = new FormGroup({
      creditCardNumber: new FormControl(null, Validators.required),
      cardHolder: new FormControl(null, Validators.required),
      expirationMonth: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(allowDigitOnly),
          this.monthValidation.bind(this),
          // this.expirationValidation.bind(this)
        ]),
      expirationYear: new FormControl(null, [Validators.required, Validators.pattern(allowDigitOnly)]),
      securityCode: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(allowDigitOnly),
          Validators.minLength(3)
        ]
      ),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  monthValidation(control: FormControl): {[s: string]: boolean} {
    if (control.value > 12 || +control.value === 0 || control.value === '00') {
      return {monthExceeded: true};
    }
    return null;
  }

  // var yy = today.getFullYear().toString().substr(-2);

  // expirationValidation(): {[s: string]: boolean} {

  //   if (this.paymentForm.get('expirationMonth').value) {
  //     return;
  //   }
  //   // const month = '12';
  //   // const year = this.paymentForm.get('expirationYear').value;
  //   const currentMonth = new Date().getMonth() + 1;
  //   const currentYear = new Date().getFullYear().toString().substr(-2);
  //   // if (+month <= currentMonth) {
  //   //   return {expired: true};
  //   // }
  // }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    const month = this.paymentForm.get('expirationMonth').value;
    const year = this.paymentForm.get('expirationMonth').value;
    const newDate = new Date();
    newDate.setFullYear(+('20' + year), +month - 1, 1);

    const payload: CreditCardPayment = {
      creditCardNumber: this.paymentForm.get('creditCardNumber').value,
      cardHolder: this.paymentForm.get('cardHolder').value,
      expirationDate: newDate,
      securityCode: this.paymentForm.get('securityCode').value,
      amount: this.paymentForm.get('amount').value
    };

    this.paymentService.storePaymentRecords(payload)
      .subscribe(() => {
        this.store.dispatch(new PaymentActions.AddPayment(payload));
        alert('Payment Successful');
        this.paymentForm.reset();
    });
  }
}
