import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from '../material/material.module';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    MenuComponent,
    LoadingComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
