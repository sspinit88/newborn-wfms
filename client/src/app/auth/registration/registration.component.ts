import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../servises/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../../shared/servises/material.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  regSub: Subscription;

  constructor(
      private authServices: AuthService,
      private materialService: MaterialService,
      private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.form.disable();
    this.regSub = this.authServices.registration(this.form.value)
        .subscribe(
            () => {
              this.router.navigate(['/login'], {
                queryParams: {
                  registrationHeld: true,
                }
              })
            },
            (error) => {
              this.materialService.toast(error.error.message);
              this.form.enable();
            }
        );

  }

  toggleError() {
    if (this.form.get('email').invalid &&
        this.form.get('email').touched
    ) {
      return 'red-text';
    }
  }

  toggleErrorPas() {
    if (this.form.get('password').invalid &&
        this.form.get('password').touched
    ) {
      return 'red-text';
    }
  }

}
