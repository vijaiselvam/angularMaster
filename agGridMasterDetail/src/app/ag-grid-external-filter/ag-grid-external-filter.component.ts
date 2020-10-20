import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Module } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-ag-grid-external-filter',
  templateUrl: './ag-grid-external-filter.component.html',
  styleUrls: ['./ag-grid-external-filter.component.scss']
})
export class AgGridExternalFilterComponent implements OnInit {

  ngOnInit(): void {
  }

  public gridApi;
  public gridColumnApi;

  public modules: Module[] = [ClientSideRowModelModule];
  public columnDefs;
  public defaultColDef;
  public rowData: any;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'athlete',
        minWidth: 180,
      },
      {
        field: 'age',
        filter: 'agNumberColumnFilter',
        maxWidth: 80,
      },
      { field: 'country' },
      {
        field: 'year',
        maxWidth: 90,
      },
      {
        field: 'date',
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
      },
      {
        field: 'gold',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'silver',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'bronze',
        filter: 'agNumberColumnFilter',
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      filter: true,
    };
  }

  externalFilterChanged(newValue) {
    ageType = newValue;
    this.gridApi.onFilterChanged();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }

  isExternalFilterPresent() {
    return ageType !== 'everyone';
  }

  doesExternalFilterPass(node) {
    switch (ageType) {
      case 'below25':
        return node.data.age < 25;
      case 'between25and50':
        return node.data.age >= 25 && node.data.age <= 50;
      case 'above50':
        return node.data.age > 50;
      case 'dateAfter2008':
        {
          console.log('date: ', asDate(node.data.date));
          return asDate(node.data.date) > new Date(2008, 1, 1);
        }
      case 'datebetween2004and2008': {
        return asDate(node.data.date) >= new Date(2004, 1, 1) && asDate(node.data.date) <= new Date(2008, 1, 1)
      }     
      default:
        return true;
    }
  }
}

var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};
var ageType = 'everyone';
function asDate(dateAsString) {
  var splitFields = dateAsString.split('/');
  return new Date(splitFields[2], splitFields[1], splitFields[0]);
}