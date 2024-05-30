import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DespesasComponent } from './relatorios/despesas/despesas.component';
import { AppState } from './app.state';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReceitasComponent } from './relatorios/receitas/receitas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DespesasComponent,
    PageNotFoundComponent,
    DashboardComponent,
    CadastroComponent,
    ReceitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
