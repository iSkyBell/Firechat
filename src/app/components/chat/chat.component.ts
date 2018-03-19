import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  mensaje:string = '';

  constructor( public _chat:ChatService ) {
    this.cargarMensajes();
   }

  enviarMensaje(){
    console.log(this.mensaje);
  }

  cargarMensajes(){
    this._chat.cargarMensajes().subscribe(params =>{
      console.log(params);
    });
  }

}
