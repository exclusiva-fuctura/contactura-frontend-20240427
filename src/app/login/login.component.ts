import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorGuard } from '../shared/security/autenticador-guard';
import { AutenticadorService } from '../shared/services/autenticador.service';
import { HttpStatusCode } from '@angular/common/http';
import { UsuarioService } from '../shared/services/usuario.service';
import Swal from 'sweetalert2';

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
}
