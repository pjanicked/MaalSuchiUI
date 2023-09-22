import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MaalSuchiUI';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Login',
            routerLink: '/login'
        },
        {
            label: 'Store',
            routerLink: '/store'
        },
        {
          label: 'Vendor',
          routerLink: '/vendor'
      }
    ];
}
}
