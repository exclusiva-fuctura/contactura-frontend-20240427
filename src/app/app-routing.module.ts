import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReceitasComponent } from './relatorios/receitas/receitas.component';
import { DespesasComponent } from './relatorios/despesas/despesas.component';
import { autenticadorGuard } from './shared/security/autenticador-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [autenticadorGuard] },
  { path: 'relatorios/despesa', component: DespesasComponent, canActivate: [autenticadorGuard] },
  { path: 'relatorios/receita', component: ReceitasComponent, canActivate: [autenticadorGuard] },
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m =>
  m.LancamentosModule)},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
