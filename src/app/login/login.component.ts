import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
