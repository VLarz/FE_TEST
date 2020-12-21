import { CreditCardPayment } from '../models/credit-card-payment.model';

const initialState: CreditCardPayment = {
  creditCardNumber: '379335307626997',
  cardHolder: 'Vhen Larson Dela Cuesta',
  expirationDate: new Date(Date.now()),
  securityCode: 'SKA',
  amount: 5000
};

export function creditCardPaymentReducer(state = initialState, action) {

}