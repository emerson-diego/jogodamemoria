import { MockLogos } from './jogo/mock-logos';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { JogoComponent } from './jogo/jogo.component';
import { RankingComponent } from './ranking/ranking.component';
import { HomeComponent } from './home/home.component';
import { SocialLogin } from './shared/social-login';

import {UsuarioLogadoService } from './shared/usuario-logado.service';
import {FirebaseService} from './shared/firebase.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyC1X_gsSZA50eU9UTAvSVZM7IBG_hXfNKE',
  authDomain: 'memorygame-dcf75.firebaseapp.com',
  databaseURL: 'https://memorygame-dcf75.firebaseio.com',
  storageBucket: 'memorygame-dcf75.appspot.com',
  messagingSenderId: '141561373290',
  projectId: 'memorygame-dcf75',
};

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'jogo', component:JogoComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    RankingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MockLogos,FirebaseService,UsuarioLogadoService, SocialLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
