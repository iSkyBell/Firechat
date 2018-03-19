import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats:any[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<any>('chats');
    return this.itemsCollection.valueChanges();
  }

}
