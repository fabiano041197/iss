import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard'
      },
      {
        label: 'Cadastrais', icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Pessoas',
              items: [
                { label: 'Pessoas', routerLink: 'pessoas' }
              ]
            }
          ]
        ]
      }
    ]
  }
}
