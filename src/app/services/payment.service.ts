import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { CreditCardPayment } from '../models/credit-card-payment.model';
import { environment } from '../../environments/environment';
import { ENDPOINT } from '../const/endpoints.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  storePaymentRecords(record: CreditCardPayment): Observable<CreditCardPayment> {
    return this.http
      .post<CreditCardPayment>(
        `${environment.apiUrl}${ENDPOINT.PAYMENT_RECORDS}`,
        record
      );
  }
}
