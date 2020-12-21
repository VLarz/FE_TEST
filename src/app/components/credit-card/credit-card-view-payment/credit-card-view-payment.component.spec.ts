import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardViewPaymentComponent } from './credit-card-view-payment.component';

describe('CreditCardViewPaymentComponent', () => {
  let component: CreditCardViewPaymentComponent;
  let fixture: ComponentFixture<CreditCardViewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardViewPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
