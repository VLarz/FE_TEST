import { CreditCardPayment } from '../models/credit-card-payment.model';
import * as PaymentActions from './credit-card-payment.actions';

const initialState: CreditCardPayment = {
  creditCardNumber: '379335307626997',
  cardHolder: 'Vhen Larson Dela Cuesta',
  expirationDate: new Date(Date.now()),
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
