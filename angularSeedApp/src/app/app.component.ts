import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module, AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ag Grid with enterprise features';

  public gridApi;
  public gridColumnApi;

  public modules: Module[] = AllModules;
  public columnDefs;
  public defaultColDef;
  public autoGroupColumnDef;
  public sideBar;
  public rowData: any;
  public statusBar;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'country',
        rowGroup: true,
        enableRowGroup: true,
      },
      {
        field: 'year',
        rowGroup: true,
        enableRowGroup: true,
        enablePivot: true,
      },
      { field: 'date' },
      { field: 'sport' },
      {
        field: 'gold',
        aggFunc: 'sum',
      },
      {
        field: 'silver',
        aggFunc: 'sum',
      },
      {
        field: 'bronze',
        aggFunc: 'sum',
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
    this.autoGroupColumnDef = { minWidth: 250 };
    this.sideBar = 'columns';
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left',
        },
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'center',
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
  }

  onBtNormal() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.setPivotColumns([]);
    this.gridColumnApi.setRowGroupColumns(['country', 'year']);
  }

  onBtPivotMode() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setPivotColumns([]);
    this.gridColumnApi.setRowGroupColumns(['country', 'year']);
  }

  onBtFullPivot() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.setPivotColumns(['year']);
    this.gridColumnApi.setRowGroupColumns(['country']);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
}