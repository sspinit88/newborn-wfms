import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/servises/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Newborn';

  constructor(
      private authServices: AuthService
  ) {
  }

  // реализуем сохранение рабочего токена, что бы пользователя не выкидывало каждый раз после обновления страницы
  ngOnInit() {
    // сохраняем в переменной данные токена, хранимые в локалстор
    const potentialToken = localStorage.getItem('auth-token');
    // если токен есть
    if (potentialToken !== null) {
      // сохраняем токин в переменной token сервиса авторизации
      this.authServices.setToken(potentialToken);
      // console.log('potentialToken', potentialToken);
    }
  }

}
