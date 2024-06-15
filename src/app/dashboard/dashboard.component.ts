import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { MenuService } from '../shared/services/menu.service';
import { LancamentoService } from '../shared/services/lancamento.service';

import { IReceita } from '../shared/models/receita.interface';
import { IDespesa } from '../shared/models/despesa.interface';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dataSourceDespesas: IDespesa[] = [];
  dataSourceReceitas: IReceita[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  
  mostrarLoading = false;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private lancamentoService: LancamentoService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
    this.listarLancamentos();
  }

  onDeleteReceita(elemento: IReceita): void {
    if(elemento.id){
      this.removerReceita(elemento);
    }
  }

  onDeleteDespesa(elemento: IDespesa): void {
    if(elemento.id){
      this.removerDespesa(elemento);
    }
  }

  onEditDespesa(elemento: IDespesa): void {
    if(elemento.id) {
      this.lancamentoService.despesaSelecionada = elemento;
      this.lancamentoService.modoEdicao = true;
      this.router.navigate(['lancamentos/despesas/'+elemento.id]);
    }
  }

  onEditReceita(elemento: IReceita): void {
    if(elemento.id) {
      this.lancamentoService.receitaSelecionada = elemento;
      this.lancamentoService.modoEdicao = true;
      this.router.navigate(['lancamentos/receitas/'+elemento.id]);
    }
  }

  private removerReceita(elem: IReceita): void {
    this.mostrarLoading = true;
    this.lancamentoService.removerReceita(elem).subscribe({
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
        this.listarLancamentos();      
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
        this.listarLancamentos();
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

  private listarLancamentos(): void {
    this.lancamentoService.listaLancamentos().subscribe({
      next: (resp) => {
        const listaLancamentos = resp.body;
        this.dataSourceDespesas = listaLancamentos?.filter((lanc) => lanc.ehReceita === false) || [];
        this.dataSourceReceitas = listaLancamentos?.filter((lanc) => lanc.ehReceita === true) || [];
      },
      error: () => {
        this.dataSourceDespesas = [];
        this.dataSourceReceitas = [];
      }
    });
  }
  



}
