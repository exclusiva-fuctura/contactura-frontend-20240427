import { Component } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private menuService: MenuService,
  ) {
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;
  }
}
