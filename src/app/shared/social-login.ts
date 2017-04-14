import { Router } from '@angular/router';
import { UsuarioLogadoService } from './usuario-logado.service';
import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class SocialLogin {

    usuario: firebase.User;

    constructor(public af: AngularFire, private usuarioLogadoService: UsuarioLogadoService,
        private router: Router) { }

    login(loginProvider) {
        let provider;
        if (loginProvider === 'google') {
            provider = AuthProviders.Google;
        }
        else if (loginProvider === 'facebook') {
            provider = AuthProviders.Facebook;
        }
        else if (loginProvider === 'twitter') {
            provider = AuthProviders.Twitter;
        }

        return this.af.auth.login({
            provider: provider,
            method: AuthMethods.Popup,
        });
    }

    // Logs out the current user
    logout() {
        this.af.auth.logout();
        this.af.auth.unsubscribe();

    }

    subscribe() {
       
            this.af.auth.subscribe(usuario => {
                if (usuario) {
                    // user logged in
                    this.usuario = usuario.auth;
                    // console.log(this.usuario);
                    // console.log(usuario.auth.displayName);
                    this.usuarioLogadoService.setUsuarioLogado(usuario.auth);
                    this.router.navigate(['jogo']);
                }
                else {
                    // this.af.auth.unsubscribe();
                    this.router.navigate(['']);
                }
            });
    }
}