import { Component } from '@angular/core';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent {

  // private editarReceita(elem: IReceita): void {
  //   this.mostrarLoading = true;
  //   this.lancamentoService.atualizarReceita(elem).subscribe({
  //     next: (response) => {
  //       this.mostrarLoading = false;
  //       const retorno = response.body;
  //       if (retorno) {
  //         Swal.fire(
  //           'Sucesso',
  //           retorno.mensagem,
  //           'success'
  //           );
  //       }        
  //     },
  //     error: (err) => {
  //       this.mostrarLoading = false;
  //       Swal.fire(
  //         'Erro na operação',
  //         err.error.mensagem,
  //         'warning'
  //         );
  //     }
  //   })
  // }
}
