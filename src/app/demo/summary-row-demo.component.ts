import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Column, Settings, DataTable} from '../../ng-crud-table';
import {getColumnsPlayers} from './columns';

@Component({
  selector: 'app-summary-row-demo',
  template: `
    <app-datatable [table]="table" [loading]="loading"></app-datatable>
  `
})

export class SummaryRowDemoComponent implements OnInit {

  public table: DataTable;
  public columns: Column[];
  public loading: boolean;

  public settings: Settings = {};

  constructor(private http: HttpClient) {
    this.columns = getColumnsPlayers();
    this.columns.splice(17);
    for (const column of this.columns) {
      column.editable = false;
    }
    this.columns[1].title += ' (count)';
    this.columns[5].title += ' (sum)';
    this.columns[14].title += ' (min)';
    this.columns[15].title += ' (max)';
    this.columns[16].title += ' (average)';

    this.columns[1].aggregation = 'count';
    this.columns[5].aggregation = 'sum';
    this.columns[14].aggregation = 'min';
    this.columns[15].aggregation = 'max';
    this.columns[16].aggregation = 'average';

    this.columns.splice(6, 8);
    this.table = new DataTable(this.columns, this.settings);
    this.table.pager.perPage = 50;
  }

  ngOnInit() {
    this.loading = true;
    this.http.get('assets/players.json').subscribe(data => {
      this.table.rows = data;
      this.loading = false;
    });
  }

}
