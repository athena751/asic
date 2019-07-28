export class SurveyDetailObj {
  id: number;
  title: string;
  licensee: LicenseeSumObj;
  /*For the Relevant Period, how much Grandfathered Remuneration
  has the Licensee paid in relation to the Financial Product?*/
  payment: LicenseePayObj;
  dealerGroups: number;
  clientAccs: number;
  arrangement: ArrangementObj;
}

export class LicenseeSumObj {
  name: string;
  respondentName: string;
  email: string;
  phoneNum: string;
  productName: string;
  referStr: string;
}

export class LicenseePayObj {
  isPaymentTiered: boolean;
  paymentPercent: number;//If isPaymentTiered is false, a percentage of an amount invested
  /*If isPaymentTiered is true, tiered elements*/
  tieredList: LicTieredObj[];
}

export class LicTieredObj {
  tieredMin: number;
  tieredMax: number;
  sumFUM: number;
  sumAccounts: number;
  sumPerPayable: number;
  sumDollarPayable: number;
}

export class ArrangementObj {
  arrAnswer: string;
  firstTerminateDate: Date;
  terminateAccounts: number;
  isStepEnsured: boolean; //Yes/True or No/False
  appliedDate: Date; //Together with isStepEnsured
  accountPercent: number; //Together with isStepEnsured
  /*If isStepEnsured is Yes*/
  principalMethod: string;
  pm_OtherText: string; /*If principalMethod is 'Other', describe the steps in
                          no more than 250 characters*/
  /*If isStepEnsured is No*/
  noStepReason: string;
  nsr_OtherText: string; /*If noStepReason is 'Other', describe the Licensee’s principal
                          reason in no more than 250 characters*/
  /*If 'arrAnswer' in SurveyDetailObj was either 'No' or
  'Arrangement terminated in relation to some but not all
  recipients of Grandfathered Remuneration'*/
  principalReason: string;
  pr_OtherText: string; /*If principalReason is 'Other', describe the Licensee’s principal
                          reason in no more than 250 characters*/
  isBefore1Jan2021: boolean;
  estLastDate: Date; /*if 'isBefore1Jan2021' is 'yes', estimate the date
                        by which the last such arrangement will have been terminated*/
}
