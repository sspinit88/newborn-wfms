import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {AuthService} from "../servises/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../../shared/servises/material.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  authSub: Subscription;

  constructor(
      private authService: AuthService,
      private router: Router,
      private materialService: MaterialService,
      private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    // вывод сообщений
    this.activatedRoute.queryParams.subscribe(
        (params: Params) => {
          if (params['registrationHeld']) {
            this.materialService.toast('Войдите в систему, используя свой логин и пароль');
          }
          else if (params['sessionFailed']) {
            this.materialService.toast('Время сессии истекло, для продолжнения работы войдите в систему повторно.');
          }
        }
    );


  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    const user: UserModel = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authSub = this.authService.login(user)
        .subscribe(
            () => {
              this.router.navigate(['/system']);
            },
            (error) => {
              // console.log(error);
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
