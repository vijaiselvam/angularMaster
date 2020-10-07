import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetailCellRendererComponent } from './detail-cell-renderer/detail-cell-renderer.component';
import { AgGridModule } from '@ag-grid-community/angular';

@NgModule({
  declarations: [
    AppComponent,
    DetailCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([DetailCellRendererComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
