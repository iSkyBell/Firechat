import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[] = [];
  public usuario:any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( user =>{
      if( !user ){
        return
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
   }

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
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add(mensajeDemo);
  }// fin agregarMensaje
  
  login(proveedor) {
    switch (proveedor) {
      case 'google':
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter':
        this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        break;
    }
  }// fin login
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }// fin logout

}
