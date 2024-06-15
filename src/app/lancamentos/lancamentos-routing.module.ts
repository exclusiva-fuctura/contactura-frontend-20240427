import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { autenticadorGuard } from '../shared/security/autenticador-guard';

const routes: Routes = [
  // rotas sem parametro
  {path: 'despesas', component: DespesasComponent, canActivate: [autenticadorGuard]},
  {path: 'receitas', component: ReceitasComponent, canActivate: [autenticadorGuard]},
  // rotas com parametro id (bind variable)
  {path: 'despesas/:id', component: DespesasComponent, canActivate: [autenticadorGuard]},
  {path: 'receitas/:id', component: ReceitasComponent, canActivate: [autenticadorGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
