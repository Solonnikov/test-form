import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  step1 = true;
  step2 = false;
  step3 = false;
  data: any;
  submitted: any;

  @Input() formDefault: User;
  registerForm: FormGroup;

  @Output() submitAction = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {

    this.createForm();

    this.authService.getData().subscribe(data => {
      this.data = data;
      this.registerForm.controls['sum'].setValue(data.sum);
      this.registerForm.controls['term'].setValue(data.term);
      this.registerForm.controls['inn'].setValue(data.inn);
      this.registerForm.controls['lastName'].setValue(data.lastName);
      this.registerForm.controls['firstName'].setValue(data.firstName);
      this.registerForm.controls['city'].setValue(data.city);
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formDefault'] && typeof this.formDefault === 'object') {
      this.registerForm.setValue(this.formDefault);
    }
  }

  createForm(): void {
    // Get Allowed Age
    const today = +new Date();
    const utcDate = Date.UTC(1900, 1, 1);
    const utcDateMil = new Date(utcDate).getTime();
    const utcDateDays = Math.abs(utcDateMil / 1000 / 60 / 60 / 24);
    const diff: any = + new Date() - utcDate;
    const diffDays = Math.round(Math.abs(diff / 1000 / 60 / 60 / 24));
    const allowedAge = diffDays - (21 * 365);
    console.log(allowedAge);

    this.registerForm = this.fb.group({
      sum: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      term: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      inn: ['', [Validators.required, Validators.max(Number(allowedAge + '00000')), Validators.pattern('^[0-9]{10}$')]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  onRegisterSubmit() {
    console.log(JSON.stringify(this.registerForm.value));
    this.submitAction.emit(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      res => this.router.navigate(['/success'])
    );
  }
}





