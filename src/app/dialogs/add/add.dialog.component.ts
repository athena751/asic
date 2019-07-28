import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {DataService} from '../../services/data.service';
import { SurveyDetailObj } from '../../models/survey';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.scss']
})

export class AddDialogComponent {
  data: SurveyDetailObj;

  constructor(////public dialogRef: MatDialogRef<AddDialogComponent>,
              ////@Inject(MAT_DIALOG_DATA) public data: SurveyDetailObj,
              public dataService: DataService) { 
    this.data = {
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
              arrAnswer: "1",
              firstTerminateDate: new Date(), terminateAccounts: 31,
              isStepEnsured: true, appliedDate: new Date(), accountPercent: 0.9,
              principalMethod: "7",
              pm_OtherText: "",
              noStepReason: "7",
              nsr_OtherText: "",
              principalReason: "7",
              pr_OtherText: "",
              isBefore1Jan2021: true,
              estLastDate: new Date()
            }
      };
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
    console.log("Submitted survey result is", this.data);
  }

/*  onNoClick(): void {
    this.dialogRef.close();
  }*/

  private confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }

  private onResetInput(): void {

  }
}
