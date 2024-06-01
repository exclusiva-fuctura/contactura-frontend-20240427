import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor() { }

  get usuarioLogado(): boolean {
    return true; 
  }
}
