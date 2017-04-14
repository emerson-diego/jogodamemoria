import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { FirebaseService} from './../shared/firebase.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit {

 listaPontuacao:Array<any>;


  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
     this.firebaseService.getListings().subscribe(listaPontuacao => {
      //console.log(listaPontuacao);
      this.listaPontuacao = listaPontuacao.sort(function(a, b){return b.pontuacao-a.pontuacao}).slice(0,10);
      //this.listaPontuacao = this.listaPontuacao.slice
   
    });

  }

   ordenaLista(){
      
    }


}
