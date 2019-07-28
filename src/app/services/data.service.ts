import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SurveyDetailObj} from '../models/survey';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<SurveyDetailObj[]> = new BehaviorSubject<SurveyDetailObj[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): SurveyDetailObj[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<SurveyDetailObj[]>(this.API_URL).subscribe(data => {
        console.log("Call the API to get all existed surveys", data);
        ////this.dataChange.next(data);
        this.dataChange.next([{
            "id": 472589923,
            "title": "XXXXXXXXX",
            "licensee": {
              name: "wei", respondentName: "wang", email: "wei.wang@ricewarner.com",
              phoneNum: "7-3867-4936", productName:"abcdefg", referStr: "123456"
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
              firstTerminateDate: new Date(), terminateAccounts: 31,
              isStepEnsured: true, appliedDate: new Date(), accountPercent: 0.9,
              principalMethod: "Other (if ‘Other’, please describe the steps in no more than 250 characters)",
              pm_OtherText: "pmpmpmpmpmpmpmpm",
              noStepReason: "The Licensee has decided not to pass the benefits on to on to affected account holders as there is no legal requirement to do so; or",
              nsr_OtherText: "If noStepReason is 'Other', describe the Licensee’s principal\
                                      reason in no more than 250 characters",
              principalReason: " The Licensee has not terminated arrangements as there is no legal requirement to do so; or",
              pr_OtherText: "If principalReason is 'Other', describe the Licensee’s principal\
                                      reason in no more than 250 characters",
              isBefore1Jan2021: true,
              estLastDate: new Date()
            }
          }]);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (inDet: SurveyDetailObj): void {
    this.dialogData = inDet;
  }

  updateIssue (inDet: SurveyDetailObj): void {
    this.dialogData = inDet;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




