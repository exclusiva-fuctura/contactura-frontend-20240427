import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDespesa } from 'src/app/shared/models/despesa.interface';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent {

  formulario!: FormGroup;
  dataSource: IDespesa[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  get valorTotal(): number {
    return 0;
  }

  onPequisar(): void {

  }
}
