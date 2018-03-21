import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje:string = '';
  elemento:any;

  constructor( public _chat:ChatService ) {
    this.cargarMensajes();
   }

   ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }   

  enviarMensaje(){
    if( this.mensaje.length === 0 ){ return; }

    this._chat.agregarMensaje( this.mensaje )
              .then( () => this.mensaje = '' )
              .catch( (err)=> console.error('Error al enviar', err) );
  }

  cargarMensajes(){
    this._chat.cargarMensajes().subscribe( () => {
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    });
  }

}
