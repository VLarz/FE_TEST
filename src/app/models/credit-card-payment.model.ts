export interface CreditCardPayment {
    creditCardNumber: string;
    cardHolder: string;
    expirationDate: Date;
    // securityCode?: string;
    securityCode: string; // I changed to mandoratory because CCV is require in every payment.
    amount: number;
}
