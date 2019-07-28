import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SurveyDetailObj } from './models/survey';
import { DataSource } from '@angular/cdk/collections';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['id', 'title', 'licensee', 'payment', 'dealerGroups',
                      'clientAccs', 'arrangement', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    ////this.loadData();
  }

  refresh() {
    ////this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '800px',
      height: '800px',
      data: {
            "id": 472589923,
            "title": "XXXXXXXXX",
            "licensee": {
              name: "wei", respondentName: "wang", email: "wei.wang@ricewarner.com",
              phoneNum: "+61-7-3867-4936", productName:"abcdefg", referStr: "123456"
            },
            payment: {
              isPaymentTiered: true,
              paymentPercent: 0.99,
              tieredList: [
                {tieredMin: 0,  tieredMax: 10000,  sumFUM: 20000,
                sumAccounts: 30, sumPerPayable: 0.5,
                sumDollarPayable: 66666666},
                {tieredMin: 10000,  tieredMax: 50000,  sumFUM: 30000,
                sumAccounts: 40, sumPerPayable: 0.6,
                sumDollarPayable: 77777777},
                {tieredMin: 50000,  tieredMax: -1,  sumFUM: 40000,
                sumAccounts: 50, sumPerPayable: 0.7,
                sumDollarPayable: 88888888}]
            },
            dealerGroups: 10,
            clientAccs: 20,
            arrangement: {
              arrAnswer: "Arrangement terminated in relation to some but not all recipients of Grandfathered Remuneration",
              firstTerminateDate: '09/04/2009', terminateAccounts: 31,
              isStepEnsured: true, appliedDate: '11/12/2017', accountPercent: 0.9,
              principalMethod: "Other (if ‘Other’, please describe the steps in no more than 250 characters)",
              pm_OtherText: "pmpmpmpmpmpmpmpm",
              noStepReason: "The Licensee has decided not to pass the benefits on to on to affected account holders as there is no legal requirement to do so; or",
              nsr_OtherText: "If noStepReason is 'Other', describe the Licensee’s principal\
                                      reason in no more than 250 characters",
              principalReason: " The Licensee has not terminated arrangements as there is no legal requirement to do so; or",
              pr_OtherText: "If principalReason is 'Other', describe the Licensee’s principal\
                                      reason in no more than 250 characters",
              isBefore1Jan2021: true,
              estLastDate: "25/07/2019"
            }
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, title: title, state: state, url: url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  /*public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }*/
}

export class ExampleDataSource extends DataSource<SurveyDetailObj> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: SurveyDetailObj[] = [];
  renderedData: SurveyDetailObj[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SurveyDetailObj[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((survey: SurveyDetailObj) => {
          const searchStr = (survey.id + survey.title + survey.arrangement.arrAnswer).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: SurveyDetailObj[]): SurveyDetailObj[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'dealerGroups':
          [propertyA, propertyB] = [a.dealerGroups, b.dealerGroups]; break;
        case 'clientAccs': [propertyA, propertyB] = [a.clientAccs, b.clientAccs]; break;
        case 'arrAnswer':
          [propertyA, propertyB] = [a.arrangement.arrAnswer, b.arrangement.arrAnswer]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
