import { Component } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';
import { IReceita } from '../shared/models/receita.interface';
import { LancamentoService } from '../shared/services/lancamento.service';
import Swal from 'sweetalert2';
import { IDespesa } from '../shared/models/despesa.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dataSourceDespesas: any[] = [];
  dataSourceReceitas: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  
  mostrarLoading = false;

  constructor(
    private menuService: MenuService,
    private lancamentoService: LancamentoService
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
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

  onEditDespesa(elemeto: IDespesa): void {
    if(elemeto.id) {
      
    }
  }

  onEditReceita(elemeto: IReceita): void {
    if(elemeto.id) {
      
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

  private editarReceita(elem: IReceita): void {
    this.mostrarLoading = true;
    this.lancamentoService.atualizarReceita(elem).subscribe({
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
