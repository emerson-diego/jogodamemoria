import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioLogadoService {

  usuarioLogado: String;

  constructor() { }


  setUsuarioLogado(usuarioLogado: String){
    this.usuarioLogado = usuarioLogado;
  }

  getUsuarioLogado(){
    return this.usuarioLogado;
  }

}
