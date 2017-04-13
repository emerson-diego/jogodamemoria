import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LogoService } from './logo.service';
import { Card } from './Card';
import { Logo } from './Logo';
import { FirebaseService } from '../shared/firebase.service';
import { UsuarioLogadoService } from './../shared/usuario-logado.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css'],
  providers: [LogoService]
})
export class JogoComponent implements OnInit {

  public textInfo: string = '';
  public textButton: string = 'Recomeçar';
  public logos: Logo[];
  public cards: Card[];
  public cardAnterior: Card;
  public canFlip: boolean = false;
  public updateBoard;
  public showAll;
  public record: number = Infinity;
  public tentativas: number;

  private usuarioLogado: String;

  constructor(private _logoService: LogoService, private firebaseService: FirebaseService,
    private usuarioLogadoService: UsuarioLogadoService) { }

  getLogos() {
    this._logoService.getLogos().then(logos => {
      this.logos = logos;
      this.initBoard();
    });
  }

  ngOnInit() {
    this.getLogos();
    console.log('teste');
    //console.log(this.usuarioLogado.getUsuarioLogado())
    this.usuarioLogado = this.usuarioLogadoService.getUsuarioLogado();
  
  }

  initBoard() {
    this.tentativas = 0;
    this.cards = [];
    var size = 2 * (this.logos.length);
    this.logos.forEach(logo => {
      var primeiroCard = false;
      var segundoCard = false;
      while (!primeiroCard || !segundoCard) {
        var index = Math.floor(size * Math.random());
        if (this.cards[index] == undefined) {
          this.cards[index] = {
            "idLogo": logo.id,
            "encontrado": false, "imagem": "none", "virado": false
          };
          if (primeiroCard) {
            segundoCard = true;
          }
          primeiroCard = true;
        }
      }
    });
    this.canFlip = true;
  }

  onFlip(card: Card) {

    if (this.canFlip && card != this.cardAnterior && card.encontrado != true) {
      
      card.imagem = "url(" + 'assets/' + this.logos[card.idLogo].imagem + ")";
      card.virado = true;
      if (this.cardAnterior == undefined) {
        this.cardAnterior = card;
      }
      else {
        this.tentativas++;
        this.canFlip = false;

        this.updateBoard = setTimeout(() => {
          if (card.idLogo == this.cardAnterior.idLogo) {
            card.encontrado = true;
            this.cardAnterior.encontrado = true;

            var gameOver = true;
            this.cards.forEach(card => {
              if (!card.encontrado) {
                gameOver = false;
              }
            });
            if (gameOver) {

              this.cardAnterior.encontrado = true;
              this.inserirPontuacaoRanking();
              this.showAll = setTimeout(() => {
                this.cards.forEach((card) => {
                  card.encontrado = false;
                  card.imagem = "url(" + 'assets/' + this.logos[card.idLogo].imagem + ")";
                  this.canFlip = false;
                  //this.inserirPontuacaoRanking();
                });
              }, 500);

            }
          }
          card.virado = false;
          this.cardAnterior.virado = false;
          card.imagem = "none";
          this.cardAnterior.imagem = "none";
          this.cardAnterior = undefined;

          this.canFlip = true;

        }, 900);



      }
    }
  }

  onReset() {
    clearTimeout(this.updateBoard);
    clearTimeout(this.showAll);
    this.textButton = "Recomeçar";
    this.initBoard();
    this.cardAnterior = undefined;

  }

  inserirPontuacaoRanking(){

   let pontuacaoFinal =100 - (this.tentativas);

     let registroPontuacao = {
      nome: this.usuarioLogado,
      pontuacao: pontuacaoFinal
    }

    
    this.firebaseService.inserir(registroPontuacao);

  }


}

