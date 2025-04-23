import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-container">
      <h2>{{ title }}</h2>
      <div class="placeholder-content">
        <p>This section is under development.</p>
        <p>The {{ title }} features will be available soon!</p>
      </div>
    </div>
  `,
  styles: [`
    .placeholder-container {
      padding: 20px;
      text-align: center;
    }
    
    .placeholder-content {
      margin-top: 20px;
      padding: 30px;
      background-color: #f5f5f5;
      border-radius: 4px;
      border: 1px dashed #ccc;
    }
  `]
})
export class PlaceholderComponent {
  @Input() title: string = 'Component';
}