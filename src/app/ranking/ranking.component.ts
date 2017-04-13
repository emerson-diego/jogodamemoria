
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { FirebaseService} from './../shared/firebase.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RankingComponent implements OnInit {

 listaPontuacao:any;


  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
     this.firebaseService.getListings().subscribe(listaPontuacao => {
      console.log(listaPontuacao);
      this.listaPontuacao = listaPontuacao;
    });

  }

}
