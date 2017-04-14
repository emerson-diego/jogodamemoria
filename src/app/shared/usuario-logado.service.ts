import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioLogadoService {

  usuarioLogado: firebase.User;

  constructor() { }


  setUsuarioLogado(usuarioLogado: firebase.User) {
    this.usuarioLogado = usuarioLogado;
  }

  getUsuarioLogado() {
    return this.usuarioLogado;
  }

}
