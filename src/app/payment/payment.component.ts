import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() paymentOwner: any;
  payments: any;
  schoolyears: any;
  familyPayment: any;
  familyTotals: any;
  chargeTotal: any;
  paymentTotal: any;
  balanceTotal: any;

  constructor(
    @Inject('paymentService') private paymentService,
    @Inject('schoolYearService') private schoolYearService
  ) { }

  loadSchoolYears() {
    this.schoolYearService.getSchoolYears()
      .subscribe(
        schoolyears => this.schoolyears = schoolyears,
        err => {
          console.log(err);
        });
  }

  addPayment(value) {
    this.familyPayment = this.mapPayment(value);
    this.paymentService.addPayment(this.familyPayment).subscribe(
      v => {
        this.loadFamilyPaymentTotal(this.paymentOwner.value);
        this.loadFamilyPayments(this.paymentOwner.value);
      }
    )
  }

  loadFamilyPaymentTotal(id) {
    this.paymentService.getFamilyPaymentTotals(id).subscribe(
      v => {
        this.familyTotals = v[0];
        setTimeout (() => this.processTotals(this.familyTotals), 100);
      }
    )
  }

  processTotals(totals) {

    if(totals.TotalCharges == null) {
      this.chargeTotal = 0;
    } else {
      this.chargeTotal = totals.TotalCharges;
    }
    if(totals.TotalPayments == null) {
      this.paymentTotal = 0;
    } else {
      this.paymentTotal = totals.TotalPayments;
    }
    this.balanceTotal = this.chargeTotal - this.paymentTotal;
  }

  loadFamilyPayments(id) {
    this.paymentService.getFamilyPayments(id).subscribe(
      v => this.payments = v
    )
  }

  deletePayment(id) {
    this.paymentService.deletePayment(id).subscribe(
      () => {
        this.loadFamilyPaymentTotal(this.paymentOwner.value);
        this.loadFamilyPayments(this.paymentOwner.value);
      }
    )
  }

  mapPayment(v) {
    let paymentMap = {
      Payment_Type: v.Payment_Type,
      Payment_Amount: v.Payment_Amount,
      Payment_Description: v.Payment_Description,
      Family_ID: this.paymentOwner.value,
      Year_ID: v.Year_ID
    }
    return paymentMap;
}

  ngOnInit() {
    this.loadSchoolYears();
    this.loadFamilyPaymentTotal(this.paymentOwner.value);
    this.loadFamilyPayments(this.paymentOwner.value);
  }

}
