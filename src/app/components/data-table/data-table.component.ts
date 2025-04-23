import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';


export interface Event {
  createdAt: Date,
  tag: string,
  group: string,
  metaData: Object,
}



const data: Event[] = [
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
  { createdAt: new Date(), tag: "Tag1", group: "Group1", metaData: {} },
]


@Component({
  selector: 'app-data-table',
  imports: [MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  dataSource = data;
  headers = ["Date", "Tag", "Group", "Meta Data"];

  displayVal(item: any) {
    if ((typeof item) == "object") {
      return JSON.stringify(item)
    }
    return item
  }

  keys(item: any) {
    return Object.keys(item)
  }
  values(item: any) {
    return Object.values(item)
  }
}
