export interface CreditCardPayment {
    creditCardNumber: string;
    cardHolder: string;
    expirationDate: Date;
    // securityCode?: string;
    securityCode: string; // I changed to mandoratory because CCV is required in every payment.
    amount: number;
}
