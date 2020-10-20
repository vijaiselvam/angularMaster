import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridExternalFilterComponent } from './ag-grid-external-filter.component';

describe('AgGridExternalFilterComponent', () => {
  let component: AgGridExternalFilterComponent;
  let fixture: ComponentFixture<AgGridExternalFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridExternalFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridExternalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
