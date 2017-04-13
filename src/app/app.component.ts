import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { SocialLogin } from "app/shared/social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Jogo da Memória dos \"Heróis Brasileiros\"';

  constructor(public af: AngularFire, private socialLogin: SocialLogin ){

  }

  //cliques: number;

  ngOnInit(): void {
    //this.cliques = 0;
  }

  onValorMudou(event) {
    //this.cliques = event;
    //console.log(this.cliques);
    
  }

   logout() {
    this.socialLogin.logout();
  }


}
