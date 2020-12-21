import { Action } from '@ngrx/store';

import { CreditCardPayment } from '../../../models/credit-card-payment.model';

export const ADD_PAYMENT = '[CREDIT CARD PAYMENT] ADD_PAYMENT';

export class AddPayment implements Action {
  readonly type = ADD_PAYMENT;

  constructor(public payload: CreditCardPayment) {}
}

export type Actions = AddPayment;
