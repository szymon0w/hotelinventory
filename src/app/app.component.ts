import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelinventory';

  role = 'Admin';
  BecomeClient(){
    this.role = 'Client';
  }
  BecomeAdmin(){
    this.role = 'Admin';
  }
  BecomeUnauthorized(){
    this.role = 'Unauthorized';
  }
}
