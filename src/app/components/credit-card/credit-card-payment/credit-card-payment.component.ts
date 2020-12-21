import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit {

  paymentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.paymentForm = new FormGroup({
      creditCardNumber: new FormControl(null, Validators.required),
      cardHolder: new FormControl(null, Validators.required),
      expirationMonth: new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      expirationYear: new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      securityCode: new FormControl(null, Validators.maxLength(3)),
      amount: new FormControl(null, [Validators.required,  Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit(): void {
    console.log(this.paymentForm.value);
  }
}
