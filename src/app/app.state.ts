import { CreditCardPayment } from './models/credit-card-payment.model';

export interface AppState {
  readonly creditCardPayments: CreditCardPayment[];
}
