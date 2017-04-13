import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import "rxjs/add/operator/map";

@Injectable()
export class FirebaseService {

  listaPontuacao: FirebaseListObservable<any[]>;
  registroPontuacao: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
    this.listaPontuacao = this.af.database.list('/pontuacao', {
      query: {
        orderByChild: 'pontuacao',
       // limitToFirst: 10
      }
    }) as FirebaseListObservable<RegistroPontuacao[]>
    //.map((array) => array.reverse()) as FirebaseListObservable<RegistroPontuacao[]>
  }

  getListings() {
    return this.listaPontuacao;

  }



  inserir(registroPontuacao) {
    return this.listaPontuacao.push(registroPontuacao);

  }
}




interface RegistroPontuacao {
  $key?: string;
  nome?: string;
  pontuacao?: number;

}