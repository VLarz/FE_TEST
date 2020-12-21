import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PaymentActions from '../store/credit-card-payment.actions';
@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor(private store: Store<AppState>) { }

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
    // if (!this.paymentForm.valid) {
    //   return;
    // }
    this.store.dispatch(new PaymentActions.AddPayment(this.paymentForm.value));
  }
}
