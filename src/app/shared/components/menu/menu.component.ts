import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuTypeEnum } from '../../enums/menu-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}
  
  get estouDashboard(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.DASHBOARD;
  }

  get estouRelatorioReceita(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_RECEITA;
  }

  get estouRelatorioDespesa(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_DESPESA;
  }

  get estouLancamentoReceita(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_RECEITA;
  }

  get estouLancamentoDespesa(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_DESPESA;
  }

  onNavigate(path: string): void {
    this.router.navigate([path]);
  }
}
