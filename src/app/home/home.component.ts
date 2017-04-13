import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { UsuarioLogadoService } from './../shared/usuario-logado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: firebase.User;

  constructor(public af: AngularFire,
    public flashMessage: FlashMessagesService, private router: Router, 
    private usuarioLogadoService: UsuarioLogadoService) {



  }


  ngOnInit() {

    this.af.auth.subscribe(usuario => {
      if (usuario) {
        // user logged in
        this.usuario = usuario.auth;
        //  console.log(this.usuario);
        console.log(usuario.auth.displayName);
        this.usuarioLogadoService.setUsuarioLogado(usuario.auth.displayName);
        this.router.navigate(['jogo']);
      }
    });
  }

  login() {
    this.af.auth.login();

  }

  ngOnDestroy() {
    this.af.auth.unsubscribe();
  }
}
