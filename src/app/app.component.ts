import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftDrawerComponent } from "./components/left-drawer/left-drawer.component";
import { MainActivityComponent } from "./components/main-activity/main-activity.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftDrawerComponent, MainActivityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
