import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-cell-renderer',
  templateUrl: './detail-cell-renderer.component.html',
  styleUrls: ['./detail-cell-renderer.component.scss']
})
export class DetailCellRendererComponent implements OnInit, ICellRendererAngularComp, AfterViewInit {

  @ViewChild('mywrap') wrapper;
  public data;
  private id: any;
  public randomId;
  private heightUpdated: boolean = false;
  public recordsAvailable: boolean = false;
  public params;

  agInit(params: any): void {
    this.params = params;
    this.id = params.data.calls;
  }

  refresh(params: any): boolean {
    return true
  }

  constructor(private http: HttpClient) {
    console.log('constructor')
  }

  ngAfterViewInit() {
    // if we've already updated the row height then return
    if (this.heightUpdated) {
      return;
    }
    setTimeout(() => {
      this.params.node.setRowHeight(this.wrapper.nativeElement.offsetHeight)
      this.params.api.onRowHeightChanged();
      this.heightUpdated = true;
    }, 300);
  }

  ngOnInit() {
    console.log('oninit');
    this.data = {};
    this.getDatas();
  }

  getDatas() {
    const id = Math.floor(Math.random() * 10);
    this.randomId = id;
    if (this.randomId < 5) {
      this.recordsAvailable = false;
    } else {
      this.recordsAvailable = true;
    }
    this.http
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe(data => {
        this.data = data;
      });
  }

}
