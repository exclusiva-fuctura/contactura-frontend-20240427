import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MenuTypeEnum } from 'src/app/shared/enums/menu-type.enum';
import { OperacaoTypeEnum } from 'src/app/shared/enums/operacao-type.enum';
import { IDespesa } from 'src/app/shared/models/despesa.interface';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements OnInit{

  formulario!: FormGroup;
  mostrarLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private lancamentoService: LancamentoService,
  ) {  }
  
  ngOnInit(): void {
    this.initForm();

    this.menuService.ondeEstou = MenuTypeEnum.LANCAMENTO_DESPESA;

    if (this.lancamentoService.modoEdicao){
      const selecionado = this.lancamentoService.despesaSelecionada;
      const valor = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(selecionado.valor);
      this.formulario.patchValue({
        tipo: selecionado.tipo,
        ehFixo: selecionado.ehFixo,
        data: selecionado.data,
        descricao: selecionado.descricao,
        valor: valor
      });
    }
  }
  /**
   * listagem dos tipos
   */
    get tipos(): string[] {
      return ['Alimentação','Habitação','Transporte','Educação','Lazer','Viagem'];
    }

    get buttonLabel(): string {
      return this.lancamentoService.modoEdicao ? 'Editar' : 'Salvar';
    }

    onLimpar(): void {
      this.formulario.reset();
    }

    onSalvar(): void {
      const despesa = this.formulario.value;
      // 1.000,00 (pt-BR) => 1000.00 (en-US)
      const valor = despesa.valor.toString().replace('.','').replace(',','.');
      despesa.valor = +valor;
      // formatar data aceitavel YYYY-MM-DD
      const data = moment(despesa.data).format('YYYY-MM-DD');
      despesa.data = data;

      if(this.lancamentoService.modoEdicao) {
        despesa.id = this.lancamentoService.despesaSelecionada.id;
        this.editarDespesa(despesa);
      } else {
        this.criarDespesa(despesa);
      }
    }

    private initForm(): void {
      this.formulario = this.formBuilder.group({
        tipo: ['', Validators.required],
        ehFixo: false,
        data: moment().format(), 
        descricao: ['', Validators.required],
        valor: ['', Validators.required]
      });
    }

    private criarDespesa(despesa: IDespesa): void {
      this.mostrarLoading = true;
      this.lancamentoService.criarDespesa(despesa).subscribe({
        next: (resp) => { 
          if(resp.status === HttpStatusCode.Ok) {
            Swal.fire(
              'Sucesso',
              'Criado com sucesso',
              'success'
              );
            this.formulario.reset();  
          }
          this.mostrarLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire(
            'Alerta',
            err.error.mensagem ? err.error.mensagem : err.error,
            'warning'
            );
            this.mostrarLoading = false;
        }
      });
    }

    private editarDespesa(elem: IDespesa): void {
      this.mostrarLoading = true;
      this.lancamentoService.atualizarDespesa(elem).subscribe({
        next: (response) => {
          this.mostrarLoading = false;
          const retorno = response.body;
          if (retorno) {
            Swal.fire(
              'Sucesso',
              retorno.mensagem,
              'success'
              );
          }        
        },
        error: (err) => {
          this.mostrarLoading = false;
          Swal.fire(
            'Erro na operação',
            err.error.mensagem,
            'warning'
            );
        }
      })
    }
}
