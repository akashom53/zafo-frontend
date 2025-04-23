import { Component } from '@angular/core';
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { DataTableComponent } from "../data-table/data-table.component";

@Component({
  selector: 'app-main-activity',
  imports: [DashboardComponent, DataTableComponent],
  templateUrl: './main-activity.component.html',
  styleUrl: './main-activity.component.scss'
})
export class MainActivityComponent {

}
