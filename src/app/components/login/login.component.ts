import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor( public _chat:ChatService ) { }

  ingresar( proveedor:string ) {
    this._chat.login(proveedor);
  }

}
