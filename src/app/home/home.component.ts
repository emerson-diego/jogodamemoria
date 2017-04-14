import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { SocialLogin } from './../shared/social-login';
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
    private usuarioLogadoService: UsuarioLogadoService, private socialLogin: SocialLogin) {

  }


  ngOnInit() {

    this.socialLogin.subscribe();
  }

  login(provider:String) {
    // this.af.auth.login();
    this.socialLogin.login(provider);

  }


}
