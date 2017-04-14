import { Injectable } from '@angular/core';

import { Logo } from './Logo';
import {MockLogos} from './mock-logos';

@Injectable()
export class LogoService {

  constructor(private mockLogos: MockLogos) { }

   getLogos() {
    return Promise.resolve(this.mockLogos.getLogos());
  }
  // See the "Take it slow" appendix
  getLogosSlowly() {
    return new Promise<Logo[]>(resolve =>
      setTimeout(() => resolve(this.mockLogos.getLogos()), 2000) // 2 seconds
    );
  }

}

