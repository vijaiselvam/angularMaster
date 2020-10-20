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
  public isApiLoaded: boolean;
  public isTableError: boolean;
  public loremData;
  public params;
  public lorem1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat finibus nibh, nec pulvinar turpis semper eget. Etiam iaculis ante vitae eros commodo, sit amet maximus dolor aliquet. Aliquam ipsum tortor, gravida eget eleifend ac, luctus et massa. Maecenas egestas vel lacus nec condimentum. Donec blandit augue justo, eget condimentum urna ornare eget. Donec malesuada euismod eros, et aliquet libero finibus sed. Morbi turpis tortor, venenatis semper felis eu, finibus gravida leo. Sed in sapien et augue laoreet viverra id vel est.`
  public lorem2 = `In tincidunt neque ultricies lacus viverra faucibus. Quisque facilisis lorem ut purus consequat scelerisque. Maecenas sollicitudin, neque vel ornare pretium, nibh sapien eleifend quam, nec venenatis dui tellus id tortor. Nullam at nulla et orci semper commodo non sed nisi. Nullam non dui in tellus placerat semper. Integer id efficitur sapien. Donec velit ante, vehicula id eleifend in, facilisis ac dolor. Donec bibendum felis nulla, quis aliquet arcu luctus at. Donec in fringilla mi. Pellentesque sed lectus eget odio interdum convallis ut vel purus. In consectetur dolor nec sapien imperdiet viverra. Mauris ipsum ipsum, vulputate ut maximus non, egestas sed quam. Proin nec lobortis libero. Ut a tortor posuere, lacinia purus ac, fermentum nunc. Proin eu semper diam. Quisque ullamcorper scelerisque efficitur. Nullam aliquam feugiat finibus. Nam bibendum dapibus mattis. Maecenas malesuada commodo turpis, vitae suscipit dolor condimentum nec.`
  public lorem3 = `Donec bibendum felis nulla, quis aliquet arcu luctus at. Donec in fringilla mi. Pellentesque sed lectus eget odio interdum convallis ut vel purus. In consectetur dolor nec sapien imperdiet viverra. Mauris ipsum ipsum, vulputate ut maximus non, egestas sed quam. Proin nec lobortis libero. Ut a tortor posuere, lacinia purus ac, fermentum nunc. Proin eu semper diam. Quisque ullamcorper scelerisque efficitur. Nullam aliquam feugiat finibus. Nam bibendum dapibus mattis. Maecenas malesuada commodo turpis, vitae suscipit dolor condimentum nec. Duis dignissim tristique nibh sed scelerisque. Vestibulum erat elit, gravida sit amet suscipit a, pulvinar a est. Donec sagittis libero id mauris finibus, nec hendrerit magna egestas. Donec pellentesque sagittis rutrum. Aliquam erat volutpat. Nullam a venenatis risus. Mauris fermentum purus sollicitudin dui dictum, eu dignissim tellus vulputate. Fusce aliquet lacus massa. Pellentesque in pharetra est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur ut leo ut erat hendrerit blandit. Sed ante tortor, placerat a egestas sed, ultricies in turpis. Praesent eget eros laoreet, placerat nibh et, fringilla erat. Quisque tempor bibendum efficitur. Duis mi urna, eleifend at porttitor ac, ornare vitae mauris. Sed placerat dui non varius iaculis. Duis eleifend enim a volutpat mollis. Vestibulum vulputate tortor nisl, id tempus augue egestas eget. Aliquam at risus odio. Aliquam congue, metus in vestibulum molestie, purus ex dictum tortor, ac lobortis turpis tellus at tellus. Vestibulum vel molestie lacus, dapibus pellentesque tortor. Vivamus a placerat leo, quis varius magna. Curabitur interdum, elit malesuada malesuada blandit, leo urna malesuada odio, sit amet laoreet dolor sapien vel mauris. Integer vel felis vitae neque euismod mollis eget vel elit. Mauris vestibulum elementum enim nec iaculis.`

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
    // setTimeout(() => {
      this.getDatas();
    // }, 2000);
    
  }

  getDatas() {
    const id = Math.floor(Math.random() * 10);
    this.randomId = id;
    this.http
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe(data => {
        this.isApiLoaded = true;
        this.isTableError = false;
        this.data = data;
        if(this.randomId < 3) {
          this.loremData = this.lorem1;
        } else if (this.randomId < 6) {
          this.loremData = this.lorem2;
        } else {
          this.loremData = this.lorem3;
        }
      }, (err) => {
        this.isTableError = true;
        this.isApiLoaded = true;
      }, () => {

      });
  }

}
