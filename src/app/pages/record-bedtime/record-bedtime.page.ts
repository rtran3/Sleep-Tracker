import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController,ModalController } from '@ionic/angular';

import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';


import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';

@Component({
  selector: 'app-record-bedtime',
  templateUrl: './record-bedtime.page.html',
  styleUrls: ['./record-bedtime.page.scss'],
})
export class RecordBedtimePage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild(IonDatetime) datetime2: IonDatetime;
  datetimeValue="";
  datetimeValue2="";
  formattedDateTime="Select datetime";
  formattedDateTime2="Select datetime";

  bedtimeData:any[]=[];

  constructor(public toastController: ToastController, private modalController:ModalController) { }

  ngOnInit() {
  }

  confirm() {
    this.datetime.confirm();
  }

  formatDate(value: string) {
    this.datetimeValue=value;
    this.formattedDateTime=format(parseISO(value), 'hh:mm a, MMM dd');
  }
  formatDate2(value: string) {
    this.datetimeValue2=value;
    this.formattedDateTime2=format(parseISO(value), 'hh:mm a, MMM dd');
  }

  recordDateTime() {
    if (this.formattedDateTime=="Select datetime" || this.formattedDateTime2=="Select datetime") {
      this.toastController.create({
        cssClass:"toastClass",
        color:"dark",
        message:"Please select datetime",
        duration:2000
      }).then((toast)=> {
        toast.present();
      });
    }
    else {
      if (this.datetimeValue<this.datetimeValue2) {
        var datetimeValueObj=new Date(this.datetimeValue)
        if (!this.bedtimeData.some(item=>item.dateValue().toLocaleDateString()==datetimeValueObj.toLocaleDateString())) {
          this.bedtimeData.unshift(new OvernightSleepData(datetimeValueObj, new Date(this.datetimeValue2),new Date()));

          this.toastController.create({
            cssClass:"toastClass",
            color:"dark",
            position:"bottom",
            message:"Recorded",

            duration:2000
          }).then((toast)=> {
            toast.present();
          });
        }
        else {
          this.toastController.create({
            cssClass:"toastClass",
            color:"dark",
            position:"bottom",
            message:"Record already exists for date of bedtime",

            duration:2000
          }).then((toast)=> {
            toast.present();
          });
        }
      }
      else if (this.datetimeValue==this.datetimeValue2) {
        this.toastController.create({
          cssClass:"toastClass",
          color:"dark",
          position:"bottom",
          message:"Bedtime and wakeup time cannot be the same",

          duration:2000
        }).then((toast)=> {
          toast.present();
        });
      }
      else {
        this.toastController.create({
          cssClass:"toastClass",
          color:"dark",
          position:"bottom",
          message:"Wake up time cannot precede bedtime",
          duration:2000
        }).then((toast)=> {
          toast.present();
        });
      }
    }

  }

  dismiss() {
    if (this.bedtimeData!=[]) {
      this.modalController.dismiss(this.bedtimeData);
    }
    else {
      this.modalController.dismiss();
    }
  }

}
