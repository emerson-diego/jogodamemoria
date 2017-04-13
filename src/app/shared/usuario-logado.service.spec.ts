import { TestBed, inject } from '@angular/core/testing';

import { UsuarioLogadoService } from './usuario-logado.service';

describe('UsuarioLogadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioLogadoService]
    });
  });

  it('should ...', inject([UsuarioLogadoService], (service: UsuarioLogadoService) => {
    expect(service).toBeTruthy();
  }));
});
