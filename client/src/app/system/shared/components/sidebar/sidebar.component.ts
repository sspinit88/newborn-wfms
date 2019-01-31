import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  linksArr = [
    {
      name: 'Обзор',
      link: '-',
    },
    {
      name: 'Аналитика',
      link: '-',
    },
    {
      name: 'История',
      link: '-',
    },
    {
      name: 'Добавить заказ',
      link: '-',
    },
    {
      name: 'Ассортимент',
      link: '-',
    },
    {
      name: 'Выйти',
      link: ['/login'],
    },
  ];

  ngOnInit() {
  }

}
