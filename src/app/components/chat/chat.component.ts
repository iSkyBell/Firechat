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
    if( this.mensaje.length === 0 ){ return; }

    this._chat.agregarMensaje( this.mensaje )
              .then( () => this.mensaje = '' )
              .catch( (err)=> console.error('Error al enviar', err) );
  }

  cargarMensajes(){
    this._chat.cargarMensajes().subscribe();
  }

}
