import { CreditCardPayment } from '../models/credit-card-payment.model';
import * as PaymentActions from './credit-card-payment.actions';

const initialState: CreditCardPayment[] = [];

export function creditCardPaymentReducer(
  state: CreditCardPayment[] = initialState,
  action: PaymentActions.Actions
): CreditCardPayment[] {

  switch (action.type) {
    case PaymentActions.ADD_PAYMENT:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}
