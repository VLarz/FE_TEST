import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import Swal from 'sweetalert2';

import { CreditCardPayment } from '../../models/credit-card-payment.model';
import { CryptoJSService } from '../../services/cryptojs.service';
import { PaymentService } from '../../services/payment.service';
import * as PaymentActions from '../../store/credit-card-payment.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isSuccessful = false;
  isExpired = false;
  paymentForm: FormGroup;

  get expirationMonth(): string {
    return this.paymentForm.get('expirationMonth').value;
  }

  get expirationYear(): string {
    return this.paymentForm.get('expirationYear').value;
  }
  constructor(private store: Store<AppState>,
              private paymentService: PaymentService,
              private readonly formBuilder: FormBuilder,
              private cryptoJSService: CryptoJSService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const allowDigitOnly = /^[0-9]\d*$/;

    this.paymentForm = this.formBuilder.group({
      creditCardNumber: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(14),
        ]
      ),
      cardHolder: new FormControl(null, Validators.required),
      expirationMonth: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(allowDigitOnly),
          this.monthValidation.bind(this),
          this.expirationValidation.bind(this)
        ]),
      expirationYear: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(allowDigitOnly),
          this.expirationValidation.bind(this)
        ]
      ),
      securityCode: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(allowDigitOnly),
          Validators.minLength(3),
        ]
      ),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  monthValidation(control: FormControl): { [s: string]: boolean } {
    if (control.value > 12 || +control.value === 0 || control.value === '00') {
      return { monthExceeded: true };
    }
    return null;
  }

  expirationValidation(control: FormControl): void {
    if (control.value === null) {
      return;
    }

    if (+this.expirationMonth < 13 && this.expirationMonth && this.expirationYear) {
      const newDate = new Date();
      newDate.setFullYear(+('20' + this.expirationYear), +this.expirationMonth - 1, 1);
      const currentDate = new Date();
      if (newDate < currentDate) {
        console.log(true);
        this.isExpired = true;
      } else {
        this.isExpired = false;
      }
    }

  }

  onSubmit(): void {
    if (this.paymentForm.invalid && this.isExpired) {
      return;
    }

    const expirationDate = new Date();
    expirationDate.setFullYear(+('20' + this.expirationYear), +this.expirationMonth - 1, 1);

    const payload: CreditCardPayment = {
      creditCardNumber: this.cryptoJSService.encrypt(this.paymentForm.get('creditCardNumber').value),
      cardHolder: this.cryptoJSService.encrypt(this.paymentForm.get('cardHolder').value),
      expirationDate: this.cryptoJSService.encrypt(expirationDate).toString(),
      securityCode: this.cryptoJSService.encrypt(this.paymentForm.get('securityCode').value),
      amount: this.paymentForm.get('amount').value
    };

    this.paymentService.storePaymentRecords(payload)
      .subscribe(() => {
        this.store.dispatch(new PaymentActions.AddPayment(payload));
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
        });
        this.paymentForm.reset();
      });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
