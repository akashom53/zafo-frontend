import { Component } from '@angular/core';
import { LeftDrawerComponent } from "./components/left-drawer/left-drawer.component";
import { MainActivityComponent } from "./components/main-activity/main-activity.component";

@Component({
  selector: 'app-root',
  imports: [LeftDrawerComponent, MainActivityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
