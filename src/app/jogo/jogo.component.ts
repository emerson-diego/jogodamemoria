
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LogoService } from './logo.service';
import { Card } from './Card';
import { Logo } from './Logo';
import { FirebaseService } from '../shared/firebase.service';
import { UsuarioLogadoService } from './../shared/usuario-logado.service';
import { SocialLogin } from '../shared/social-login';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css'],
  providers: [LogoService]
})
export class JogoComponent implements OnInit {

  public textInfo = '';
  public textButton = 'Recomeçar';
  public logos: Logo[];
  public cards: Card[];
  public cardAnterior: Card;
  public canFlip = false;
  public updateBoard;
  public showAll;
  public record: number = Infinity;
  public tentativas: number;

  private usuarioLogado: firebase.User;
  public bonus: number;
  private acertosConsecutivos: number;
  private acertouAnteriormente: boolean;
  public pontuacaoFinal: string;
  public gameOver:boolean;

  public teste;

  constructor(private _logoService: LogoService,
    private firebaseService: FirebaseService,
    private usuarioLogadoService: UsuarioLogadoService,public af: AngularFire, private socialLogin: SocialLogin) { }

  getLogos() {
    this._logoService.getLogos().then(logos => {
      this.logos = logos;
      this.initBoard();
    });
  }

  ngOnInit() {
    this.getLogos();
    // console.log('teste');
    // console.log(this.usuarioLogado.photoURL);
    // console.log(this.usuarioLogado.displayName);
  }


  initBoard() {
    this.usuarioLogado = this.usuarioLogadoService.getUsuarioLogado();
    this.bonus = 0;
    this.acertosConsecutivos = 0;
    this.tentativas = 0;
    this.acertouAnteriormente = false;
    this.gameOver = false;
    this.cards = [];
    const size = 2 * (this.logos.length);
    this.logos.forEach(logo => {
      let primeiroCard = false;
      let segundoCard = false;
      while (!primeiroCard || !segundoCard) {
        let index = Math.floor(size * Math.random());
        if (this.cards[index] == undefined) {
          this.cards[index] = {
            'idLogo': logo.id,
            'encontrado': false, 'imagem': 'none', 'virado': false
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

      card.imagem = 'url(' + 'assets/' + this.logos[card.idLogo].imagem + ')';
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

            if (this.acertouAnteriormente) {
              this.acertosConsecutivos++;
              this.bonus += this.acertosConsecutivos;
            }

            this.acertouAnteriormente = true;

            this.gameOver = true;
            this.cards.forEach(card => {
              if (!card.encontrado) {
                this.gameOver = false;
              }
            });
            if (this.gameOver) {

              this.cardAnterior.encontrado = true;
              this.inserirPontuacaoRanking();
              this.showAll = setTimeout(() => {
                this.cards.forEach((cardInterno) => {
                  cardInterno.encontrado = false;
                  cardInterno.imagem = 'url(' + 'assets/' + this.logos[cardInterno.idLogo].imagem + ')';
                  this.canFlip = false;
                  // this.inserirPontuacaoRanking();
                });
              }, 500);

            }


          }
          else { // não acertou
            this.acertouAnteriormente = false;
            this.acertosConsecutivos = 0;
          }
          card.virado = false;
          this.cardAnterior.virado = false;
          card.imagem = 'none';
          this.cardAnterior.imagem = 'none';
          this.cardAnterior = undefined;

          this.canFlip = true;

        }, 900);



      }
    }
  }

  onReset() {
    clearTimeout(this.updateBoard);
    clearTimeout(this.showAll);
    this.initBoard();
    this.cardAnterior = undefined;

  }

  inserirPontuacaoRanking() {

    let pontuacaoFim = 1000 - ((this.tentativas - 12)*10) + this.bonus;
    let dataHora = new Date().toLocaleDateString() + ' '  + new Date().toLocaleTimeString();

    let registroPontuacao = {
      foto: this.usuarioLogado.photoURL,
      nome: this.usuarioLogado.displayName,
      pontuacao: pontuacaoFim,
      data: dataHora
    }

    this.pontuacaoFinal = pontuacaoFim.toString();
    this.firebaseService.inserir(registroPontuacao);

  }

   logout() {
    this.socialLogin.logout();
  }





}

