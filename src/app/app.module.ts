import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { } from '@angular/material/core';

import {AppComponent} from './app.component';
import {DataService} from './services/data.service';
import {
  NumberWithCommasPipe, NumberWithCommasNoCurrencyPipe, ThousandSuffixesPipe,
  AsicPercentagePipe
} from './services/numberWithCommas.pipe';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {DirectivesModule} from './directives';


@NgModule({
  declarations: [
    AppComponent, AddDialogComponent, EditDialogComponent, DeleteDialogComponent,
    NumberWithCommasPipe, NumberWithCommasNoCurrencyPipe, ThousandSuffixesPipe,
    AsicPercentagePipe
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, MatDialogModule,
    FormsModule, MatButtonModule, MatInputModule, MatIconModule, MatSortModule,
    MatTableModule, MatToolbarModule, MatPaginatorModule, ReactiveFormsModule,
    MatExpansionModule, DirectivesModule, MatRadioModule, MatDatepickerModule,
    MatCardModule, MatNativeDateModule
  ],
  entryComponents: [
    AddDialogComponent, EditDialogComponent, DeleteDialogComponent
  ],
  providers: [
    DataService, NumberWithCommasPipe, NumberWithCommasNoCurrencyPipe,
    ThousandSuffixesPipe, AsicPercentagePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'en-AU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
