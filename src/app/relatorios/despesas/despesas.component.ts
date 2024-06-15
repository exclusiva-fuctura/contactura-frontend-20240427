import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDespesa } from 'src/app/shared/models/despesa.interface';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MenuTypeEnum } from 'src/app/shared/enums/menu-type.enum';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent {

  formulario!: FormGroup;
  dataSource: IDespesa[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  mostrarLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private lancamentoService: LancamentoService
  ) {
    this.initFormulario();
    this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
  }

  get valorTotal(): number {
    let valores = 0
    for (let desp of this.dataSource) {
      valores = desp.valor + valores;
    }
    return valores;
  }

  onPequisar(): void {
    const form = this.formulario.value;
    this.listarLancamentos(moment(form.data).format('YYYY-MM-DD'));
  }

  onDeletar(elemento: IDespesa): void {
    if(elemento.id){
      this.removerDespesa(elemento);
    }
  }

  onEditar(elemento: IDespesa): void {
    if(elemento.id) {
      this.lancamentoService.despesaSelecionada = elemento;
      this.lancamentoService.modoEdicao = true;
      this.router.navigate(['lancamentos/despesas/'+elemento.id]);
    }
  }

  private initFormulario(): void {
    this.formulario = this.formBuilder.group({
      data: moment().format()
    });
  }

  private listarLancamentos(data: string): void {
    this.lancamentoService.listaLancamentos().subscribe({
      next: (resp) => {
        const listaLancamentos = resp.body;
        this.dataSource = listaLancamentos?.filter((lanc) => {
          if (lanc.ehReceita === false && lanc.data === data) {
            return lanc;
          }
          return null;
        }) || [];
        
      },
      error: () => {
        this.dataSource = [];
      }
    });
  }

  private removerDespesa(elem: IDespesa): void {
    this.mostrarLoading = true;
    this.lancamentoService.removerDespesa(elem).subscribe({
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
        const form = this.formulario.value;
        this.listarLancamentos(moment(form.data).format('YYYY-MM-DD'));
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
