import { Injectable } from '@angular/core';
import { Logo } from './Logo';

@Injectable()
export class MockLogos {

    public LOGOS: Logo[];

    constructor() {

        this.LOGOS = [

            { "id": 0, "name": "Lula", "imagem": "img/lula.png" },
            { "id": 1, "name": "Dilma", "imagem": "img/dilma.png" },
            { "id": 2, "name": "Collor", "imagem": "img/collor.png" },
            { "id": 3, "name": "Sarney", "imagem": "img/sarney.png" },
            { "id": 4, "name": "Aécio", "imagem": "img/aecio.png" },
            { "id": 5, "name": "Romário", "imagem": "img/romario.png" },
            { "id": 6, "name": "Eduardo Cunha", "imagem": "img/cunha.png" },
            { "id": 7, "name": "Bolsonaro", "imagem": "img/bolsonaro.png" },
            { "id": 8, "name": "Tiririca", "imagem": "img/tiririca.png" },
            { "id": 9, "name": "Renan Calheiros", "imagem": "img/renan.png" },
            { "id": 10, "name": "José Maranhão", "imagem": "img/maranhao.png" },
            { "id": 11, "name": "Cássio Cunha Lima", "imagem": "img/cassio.png" }
        ];
    }

    getLogos(){
        return this.LOGOS;
    }
}
