import { Component } from '@angular/core';
import { IDespesa } from 'src/app/shared/models/despesa.interface';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent {

  dataSource: IDespesa[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
}
