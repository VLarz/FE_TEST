import { CreditCardPayment } from '../models/credit-card-payment.model';

// export interface State {

// }

export interface AppState {
  readonly creditCardPayments: CreditCardPayment[]; // creditCardPayments: State if it's more
}
