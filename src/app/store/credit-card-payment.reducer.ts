import { CreditCardPayment } from '../models/credit-card-payment.model';
import * as PaymentActions from './credit-card-payment.actions';

const initialState: CreditCardPayment = {
  creditCardNumber: '3793 3530 7626 9973',
  cardHolder: 'Vhen Larson Dela Cuesta',
  expirationDate: new Date(new Date().setFullYear(2021, 11, 1)),
  securityCode: '416',
  amount: 50000
};

export function creditCardPaymentReducer(
  state: CreditCardPayment[] = [initialState],
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
