import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AutenticadorService } from '../shared/services/autenticador.service';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private autenticadorService: AutenticadorService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onEntrar(): void {

    const login = this.formulario.value;

    this.autenticadorService.autenticador(login).subscribe({ 
        next: (body) => {
          if (body.status === HttpStatusCode.Created) {
              this.usuarioService.token = body.headers.get('authorization') || '';
            
            this.router.navigate(['dashboard']);
          }
        },
        error: (err) => {
          Swal.fire(
            'Erro no login',
            err.error.mensagem,
            'error'
            );
        }
      });
  }

  onCadastro(): void {
    this.router.navigate(['cadastro']);
  }
}
