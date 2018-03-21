import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', 
                            ref => ref.orderBy('fecha','desc').limit(5) );
    return this.itemsCollection.valueChanges().map( (mensajes:Mensaje[]) => {
      this.chats = mensajes;
      this.chats.reverse();
    });
  }// fin cargarMensajes

  agregarMensaje(texto: string) {
    let mensajeDemo:Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensajeDemo);
  }// fin agregarMensaje

}
