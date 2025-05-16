import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeSeriesDataPoint {
  week_start: string;
  search_results_visits: number;
  [key: string]: any; // Allow for additional properties
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: TimeSeriesDataPoint[] = [];
  @Input() type: string = 'line';
  @Input() xAxis: string = '';
  @Input() yAxis: string = '';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // Properties for chart data
  labels: string[] = [];
  values: number[] = [];
  maxValue: number = 0;
  minValue: number = 0;
  chartWidth: number = 0;
  chartHeight: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.processData();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.processData();
      // Only try to draw if the view has been initialized
      if (this.chartCanvas) {
        setTimeout(() => this.drawChart(), 0);
      }
    }
  }

  /**
   * Process the input data to extract labels and values
   */
  private processData(): void {
    if (!this.data || this.data.length === 0) {
      return;
    }

    // Extract x-axis labels (e.g., dates) and y-axis values
    this.labels = this.data.map(item => {
      // Handle different possible x-axis field names
      if (this.xAxis && item[this.xAxis]) {
        return item[this.xAxis];
      } else if (item.week_start) {
        return item.week_start;
      } else {
        // Fallback to first property that's not the y-axis value
        const key = Object.keys(item).find(k => k !== this.yAxis);
        return key ? item[key] : 'Unknown';
      }
    });

    // Extract y-axis values
    this.values = this.data.map(item => {
      // Handle different possible y-axis field names
      if (this.yAxis && item[this.yAxis]) {
        return item[this.yAxis];
      } else if (item.search_results_visits) {
        return item.search_results_visits;
      } else {
        // Fallback to first numeric property
        const key = Object.keys(item).find(k => typeof item[k] === 'number');
        return key ? item[key] : 0;
      }
    });

    // Calculate min and max values for scaling
    this.maxValue = Math.max(...this.values, 0);
    this.minValue = Math.min(...this.values, 0);

    // Add a little padding to the max value for better visualization
    this.maxValue = this.maxValue * 1.1;
  }

  /**
   * Draw the chart on the canvas
   */
  private drawChart(): void {
    if (!this.chartCanvas || this.values.length === 0) {
      return;
    }

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    this.chartWidth = canvas.width = canvas.offsetWidth;
    this.chartHeight = canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, this.chartWidth, this.chartHeight);

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, this.chartWidth, this.chartHeight);

    // Draw grid lines
    this.drawGrid(ctx);

    // Draw axes
    this.drawAxes(ctx);

    // Draw data based on chart type
    if (this.type === 'bar') {
      this.drawBarChart(ctx);
    } else {
      // Default to line chart
      this.drawLineChart(ctx);
    }

    // Draw labels
    this.drawLabels(ctx);
  }

  private drawGrid(ctx: CanvasRenderingContext2D): void {
    const padding = 40; // Padding for axes labels
    const chartAreaWidth = this.chartWidth - padding * 2;
    const chartAreaHeight = this.chartHeight - padding * 2;

    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 0.5;

    // Draw horizontal grid lines
    const numHorizontalLines = 5;
    for (let i = 0; i <= numHorizontalLines; i++) {
      const y = padding + (chartAreaHeight / numHorizontalLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(this.chartWidth - padding, y);
      ctx.stroke();

      // Draw y-axis labels
      const value = this.maxValue - (i / numHorizontalLines) * (this.maxValue - this.minValue);
      ctx.fillStyle = '#6c757d';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value).toString(), padding - 5, y + 3);
    }
  }

  private drawAxes(ctx: CanvasRenderingContext2D): void {
    const padding = 40;

    // Draw x and y axes
    ctx.strokeStyle = '#343a40';
    ctx.lineWidth = 1;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, this.chartHeight - padding);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, this.chartHeight - padding);
    ctx.lineTo(this.chartWidth - padding, this.chartHeight - padding);
    ctx.stroke();

    // Draw axis titles
    ctx.fillStyle = '#343a40';
    ctx.font = '12px Arial';

    // Y-axis title
    ctx.save();
    ctx.translate(10, this.chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(this.yAxis || 'Value', 0, 0);
    ctx.restore();

    // X-axis title
    ctx.textAlign = 'center';
    ctx.fillText(this.xAxis || 'Date', this.chartWidth / 2, this.chartHeight - 10);
  }

  private drawLineChart(ctx: CanvasRenderingContext2D): void {
    if (this.values.length <= 1) return;

    const padding = 40;
    const chartAreaWidth = this.chartWidth - padding * 2;
    const chartAreaHeight = this.chartHeight - padding * 2;

    // Calculate scaling factors
    const xStep = chartAreaWidth / (this.values.length - 1);
    const yRange = this.maxValue - this.minValue;

    // Draw the line
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < this.values.length; i++) {
      const x = padding + i * xStep;
      const y = padding + chartAreaHeight - ((this.values[i] - this.minValue) / yRange) * chartAreaHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw data points
      ctx.fillStyle = '#007bff';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.stroke();
  }

  private drawBarChart(ctx: CanvasRenderingContext2D): void {
    const padding = 40;
    const chartAreaWidth = this.chartWidth - padding * 2;
    const chartAreaHeight = this.chartHeight - padding * 2;

    // Calculate bar width
    const barWidth = (chartAreaWidth / this.values.length) * 0.8;
    const barSpacing = (chartAreaWidth / this.values.length) * 0.2;
    const yRange = this.maxValue - this.minValue;

    // Draw bars
    ctx.fillStyle = '#007bff';

    for (let i = 0; i < this.values.length; i++) {
      const x = padding + i * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight = ((this.values[i] - this.minValue) / yRange) * chartAreaHeight;
      const y = this.chartHeight - padding - barHeight;

      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }

  private drawLabels(ctx: CanvasRenderingContext2D): void {
    const padding = 40;
    const chartAreaWidth = this.chartWidth - padding * 2;

    // Draw x-axis labels
    ctx.fillStyle = '#6c757d';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    // Determine how many labels to show to avoid overcrowding
    const maxLabels = 10;
    const step = Math.ceil(this.labels.length / maxLabels);

    for (let i = 0; i < this.labels.length; i += step) {
      const x = padding + (i / (this.labels.length - 1)) * chartAreaWidth;
      const y = this.chartHeight - padding + 15;

      // Shorten long labels
      let label = this.labels[i];
      if (label.length > 10) {
        label = label.substring(0, 10) + '...';
      }

      ctx.fillText(label, x, y);
    }
  }
}
