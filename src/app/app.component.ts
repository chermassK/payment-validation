import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public cardNumber = '';
  public cardholderName = '';
  public expirationMonth = '';
  public expirationYear = '';

  public currentYear = new Date().getFullYear();
  public paymentFormGroup = new FormGroup(
    {
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{16}$/),
      ]),
      cardholderName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      expirationMonth: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d{1,2}'),
      ]),
      expirationYear: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{4}$/),
        this.yearValidator(),
      ]),
      cvvCvc: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d{1,3}'),
      ]),
    },
    { updateOn: 'change' }
  );

  ngOnInit() {}

  getErrorMessage(formControlName: string) {
    const formControl = this.paymentFormGroup.get(formControlName);
    if (formControl?.hasError('pattern') || formControl?.hasError('required')) {
      switch (formControlName) {
        case 'cardNumber': {
          return 'Invalid Card Number';
        }
        case 'cardholderName': {
          return 'Invalid Cardholder Name';
        }
        case 'expirationMonth': {
          return 'Invalid Month';
        }
        case 'expirationYear': {
          return 'Invalid Year';
        }
        case 'cvvCvc': {
          return 'Invalid CVV/CVC.';
        }
      }
    }
    return;
  }

  yearValidator() {
    return (form: FormControl) => {
      const year = form.value;
      if (year >= this.currentYear && year <= this.currentYear + 3) {
        return null;
      }
      return { year: true };
    };
  }

  formatMounthInput(event: any) {
    let inputValue = event.target.value;
    event.target.value = this.padWithLeadingZeros(inputValue, 2);
  }

  formatYearInput(event: any) {
    let inputValue = event.target.value;
    event.target.value = this.padWithLeadingZeros(inputValue, 4);
  }

  formatCVVInput(event: any) {
    let inputValue = event.target.value;
    event.target.value = this.padWithLeadingZeros(inputValue, 3);
  }

  formatCardNumber(cardNum: string): string {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0, j = cardNum.length; i < j; i += chunkSize) {
      let chunk = cardNum.slice(i, i + chunkSize);
      chunk = chunk.padStart(chunkSize, '0');
      chunks.push(chunk);
    }
    return chunks.join('-');
  }

  padWithLeadingZeros(num: string, totalLength: number): string {
    return Number(num).toString().padStart(totalLength, '0');
  }
}
