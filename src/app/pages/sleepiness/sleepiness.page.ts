import { Component, OnInit } from '@angular/core';

import { ToastController, ModalController } from '@ionic/angular';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

import { SecondPage } from '../second/second.page';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  sleepinessList:any[] = [
    {'item':StanfordSleepinessData.ScaleValues[1],'itemNum':1},
    {'item':StanfordSleepinessData.ScaleValues[2],'itemNum':2},
    {'item':StanfordSleepinessData.ScaleValues[3],'itemNum':3},
    {'item':StanfordSleepinessData.ScaleValues[4],'itemNum':4},
    {'item':StanfordSleepinessData.ScaleValues[5],'itemNum':5},
    {'item':StanfordSleepinessData.ScaleValues[6],'itemNum':6},
    {'item':StanfordSleepinessData.ScaleValues[7],'itemNum':7}
  ]
  sleepinessData:any[]=[];
  radioValue:number=0;

  loggedAt:string="";
  lastDate: string="";
  lastSleepSummary: string="";

  constructor(public toastController: ToastController, private modalController:ModalController) {
    Storage.get({key:'sleepinessData'}).then((data)=>{
      if (data.value!=null) {
        var tempJson=JSON.parse(data.value);

        tempJson.forEach((item)=>{
          var first=item["loggedValue"];
          var second=new Date(item["loggedAt"]);
          this.sleepinessData.push(new StanfordSleepinessData(first,second));
        })
      }
    })

    Storage.get({key:'loggedAtSleepy'}).then((data)=>{
      if (data.value!=null) {
        this.loggedAt=data.value;
      }
    });

    Storage.get({key:'lastDate'}).then((data)=>{
      if (data.value!=null) {
        this.lastDate=data.value;
      }
    });
    Storage.get({key:'lastSleepSummary'}).then((data)=>{
      if (data.value!=null) {
        this.lastSleepSummary=data.value;
      }
    });
  }

  ngOnInit() {
  }

  async second() {
    var modal= await this.modalController.create({
      component: SecondPage,
      componentProps: {
        'sleepinessData': this.sleepinessData
      }
    });

    modal.onDidDismiss().then((response) => {
      if (response['data']) {
        this.sleepinessData=response['data'];
        var sleepinessDataJson=[];
        this.sleepinessData.forEach((item)=>{
          sleepinessDataJson.push(item.toObject());
        });
        Storage.set({key:'sleepinessData',value:JSON.stringify(sleepinessDataJson)}).then(()=>{});
        if (this.sleepinessData.length!=0) {
          this.loggedAt=this.sleepinessData[0].timeString();
          Storage.set({key:'loggedAtSleepy',value:this.loggedAt}).then((data)=>{});
          this.lastDate=this.sleepinessData[0].dateString();
          Storage.set({key:'lastDate',value:this.lastDate}).then((data)=>{});
          this.lastSleepSummary=this.sleepinessData[0].summaryString();
          Storage.set({key:'lastSleepSummary',value:this.lastSleepSummary}).then((data)=>{});
        }
        else {
          this.loggedAt="";
          Storage.set({key:'loggedAtSleepy',value:this.loggedAt}).then((data)=>{});
          this.lastDate="";
          Storage.set({key:'lastDate',value:this.lastDate}).then((data)=>{});
          this.lastSleepSummary="";
          Storage.set({key:'lastSleepSummary',value:this.lastSleepSummary}).then((data)=>{});
        }
      };
    });
    await modal.present();
  }
  save() {
    if (this.radioValue!=0) {
      this.sleepinessData.unshift(new StanfordSleepinessData(this.radioValue, new Date()));
      var sleepinessDataJson=[];
      this.sleepinessData.forEach((item)=>{
        sleepinessDataJson.push(item.toObject());
      });
      Storage.set({key:'sleepinessData',value:JSON.stringify(sleepinessDataJson)}).then((data)=>{});
      this.loggedAt=this.sleepinessData[0].timeString();
      Storage.set({key:'loggedAtSleepy',value:this.loggedAt}).then((data)=>{});
      this.lastDate=this.sleepinessData[0].dateString();
      Storage.set({key:'lastDate',value:this.lastDate}).then((data)=>{});
      this.lastSleepSummary=this.sleepinessData[0].summaryString();
      Storage.set({key:'lastSleepSummary',value:this.lastSleepSummary}).then((data)=>{});

      this.toastController.create({
        cssClass:"toastClass",
        color:"dark",
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
        message:"Please select an option",
        duration:2000
      }).then((toast)=> {
        toast.present();
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
