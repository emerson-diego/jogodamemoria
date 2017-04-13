import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  listaPontuacao: FirebaseListObservable<any[]>;
  registroPontuacao: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
    this.listaPontuacao = this.af.database.list('/pontuacao') as FirebaseListObservable<RegistroPontuacao[]>
  }

  getListings() {
    return this.listaPontuacao;
  }

  getListingDetails(id) {
    this.registroPontuacao = this.af.database.object('/pontuacao/' + id) as FirebaseObjectObservable<RegistroPontuacao>
    return this.registroPontuacao;
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