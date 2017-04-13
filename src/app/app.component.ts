import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Jogo da Memória dos \"Heróis Brasileiros\"';

  //cliques: number;

  ngOnInit(): void {
    //this.cliques = 0;
  }

  onValorMudou(event) {
    //this.cliques = event;
    //console.log(this.cliques);
    
  }


}
