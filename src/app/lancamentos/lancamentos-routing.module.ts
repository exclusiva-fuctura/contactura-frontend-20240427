import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { AutenticadorGuard } from '../shared/security/autenticador-guard';

const routes: Routes = [
  // rotas sem parametro
  {path: 'despesas', component: DespesasComponent},
  {path: 'receitas', component: ReceitasComponent},
  // rotas com parametro id (bind variable)
  {path: 'despesas/:id', component: DespesasComponent},
  {path: 'receitas/:id', component: ReceitasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
