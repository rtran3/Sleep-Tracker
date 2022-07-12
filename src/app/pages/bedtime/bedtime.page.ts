import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';//added
import { FirstPage } from '../first/first.page';
import {RecordBedtimePage} from '../record-bedtime/record-bedtime.page'
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-bedtime',
  templateUrl: './bedtime.page.html',
  styleUrls: ['./bedtime.page.scss'],
})

export class BedtimePage implements OnInit {
  bedtimeData:any[] = [];
  loggedAt:string="";
  lastBedtime: string="";
  averageHours:string="0";
  averageMinutes:string="0";
  lastSummary: string="";
  shortestSleepTime:string="0 hours, 0 minutes";
  shortestSleepDate:string="";
  longestSleepTime:string="0 hours, 0 minutes";
  longestSleepDate:string="";
  constructor(private modalController:ModalController) {
    Storage.get({key:'bedtimeData'}).then((data)=>{
      if (data.value!=null) {
        var tempJson=JSON.parse(data.value);

        tempJson.forEach((item)=>{
          // this.bedtimeData=[];
          var first=new Date(item["sleepStart"]);
          var second=new Date(item["sleepEnd"]);
          var third=new Date(item["loggedAt"]);
          this.bedtimeData.push(new OvernightSleepData(first,second,third));
        })
      }
    })
    Storage.get({key:'loggedAt'}).then((data)=> {
      if (data.value!=null) {
        this.loggedAt=data.value;
      }
    })
    Storage.get({key:'lastBedtime'}).then((data)=> {
      if (data.value!=null) {
        this.lastBedtime=data.value;
      }
    })
    Storage.get({key:'averageHours'}).then((data)=> {
      if (data.value!=null) {
        this.averageHours=data.value;
      }
    })
    Storage.get({key:'averageMinutes'}).then((data)=> {
      if (data.value!=null) {
        this.averageMinutes=data.value;
      }
    })
    Storage.get({key:'lastSummary'}).then((data)=> {
      if (data.value!=null) {
        this.lastSummary=data.value;
      }
    })
    Storage.get({key:'shortestSleepTime'}).then((data)=> {
      if (data.value!=null) {
        this.shortestSleepTime=data.value;
      }
    })
    Storage.get({key:'shortestSleepDate'}).then((data)=> {
      if (data.value!=null) {
        this.shortestSleepDate=data.value;
      }
    })
    Storage.get({key:'longestSleepTime'}).then((data)=> {
      if (data.value!=null) {
        this.longestSleepTime=data.value;
      }
    })
    Storage.get({key:'longestSleepDate'}).then((data)=> {
      if (data.value!=null) {
        this.longestSleepDate=data.value;
      }
    })
  }

  ngOnInit() {
  }
 
  async recordBedTime() {
    var modal= await this.modalController.create({
      component: RecordBedtimePage,
      componentProps: {
        'bedtimeData': this.bedtimeData
      },
    });
    modal.onDidDismiss().then((response) => {
      if (response['data'].length!=0 || response['data']) {
        this.bedtimeData=response['data'];
        var bedtimeDataJson=[];
        this.bedtimeData.forEach((item)=>{
          bedtimeDataJson.push(item.toObject());
        })
        Storage.set({key:'bedtimeData',value:JSON.stringify(bedtimeDataJson)}).then(()=>{});
        this.loggedAt=this.bedtimeData[0].timeString();
        Storage.set({key:'loggedAt',value:this.loggedAt}).then(()=>{});

        this.lastBedtime=this.bedtimeData[0].dateString();
        Storage.set({key:'lastBedtime',value:this.lastBedtime}).then(()=>{});

        this.lastSummary=this.bedtimeData[0].summaryString();
        Storage.set({key:'lastSummary',value:this.lastSummary}).then(()=>{});

        var averageSleep:number=0;
        this.bedtimeData.forEach((item)=> {
          averageSleep+=item.sleepMs();
        });
        averageSleep=averageSleep/this.bedtimeData.length
        this.averageHours=(Math.floor(averageSleep/ (1000*60*60))).toString();
        Storage.set({key:'averageHours',value:this.averageHours}).then(()=>{});
        this.averageMinutes=(Math.floor(averageSleep/ (1000*60) % 60)).toString();
        Storage.set({key:'averageMinutes',value:this.averageMinutes}).then(()=>{});

        function compare(first, second) {
          if (first.sleepMs() < second.sleepMs()){
            return -1;
          }
          if (first.sleepMs()> second.sleepMs()){
            return 1;
          }
          return 0;
        };
        var bedtimeDataCopy=[...this.bedtimeData];
        bedtimeDataCopy.sort(compare);
        var maxIndex=bedtimeDataCopy.length-1
        this.longestSleepTime=bedtimeDataCopy[maxIndex].summaryString();
        Storage.set({key:'longestSleepTime',value:this.longestSleepTime}).then(()=>{});
        this.longestSleepDate=bedtimeDataCopy[maxIndex].dateString();
        Storage.set({key:'longestSleepDate',value:this.longestSleepDate}).then(()=>{});
        this.shortestSleepTime=bedtimeDataCopy[0].summaryString();
        Storage.set({key:'shortestSleepTime',value:this.shortestSleepTime}).then(()=>{});
        this.shortestSleepDate=bedtimeDataCopy[0].dateString();
        Storage.set({key:'shortestSleepDate',value:this.shortestSleepDate}).then(()=>{});
      };
    });
    await modal.present();
  }
  async first() {
    var modal= await this.modalController.create({
      component: FirstPage,
      componentProps: {
        'bedtimeData': this.bedtimeData
      }
    });
    modal.onDidDismiss().then((response) => {
      if (response['data']) {
        this.bedtimeData=response['data'];
        var bedtimeDataJson=[];
        this.bedtimeData.forEach((item)=>{
          bedtimeDataJson.push(item.toObject());
        })
        Storage.set({key:'bedtimeData',value:JSON.stringify(bedtimeDataJson)}).then(()=>{});
        if (this.bedtimeData.length!=0) {
          this.loggedAt=this.bedtimeData[0].timeString();
          Storage.set({key:'loggedAt',value:this.loggedAt}).then(()=>{});
          this.lastBedtime=this.bedtimeData[0].dateString();
          Storage.set({key:'lastBedtime',value:this.lastBedtime}).then(()=>{});
          this.lastSummary=this.bedtimeData[0].summaryString();
          Storage.set({key:'lastSummary',value:this.lastSummary}).then(()=>{});


          var averageSleep:number=0;
          this.bedtimeData.forEach((item)=> {
            averageSleep+=item.sleepMs();
          });
          averageSleep=averageSleep/this.bedtimeData.length
          this.averageHours=(Math.floor(averageSleep/ (1000*60*60))).toString();
          Storage.set({key:'averageHours',value:this.averageHours}).then(()=>{});
          this.averageMinutes=(Math.floor(averageSleep/ (1000*60) % 60)).toString();
          Storage.set({key:'averageMinutes',value:this.averageMinutes}).then(()=>{});

          function compare( a, b ) {
          if (a.sleepMs() < b.sleepMs()){
            return -1;
          }
          if ( a.sleepMs()> b.sleepMs()){
            return 1;
          }
          return 0;
          };
          var bedtimeDataCopy=[...this.bedtimeData];
          bedtimeDataCopy.sort(compare);
          var maxIndex=bedtimeDataCopy.length-1
          this.longestSleepTime=bedtimeDataCopy[maxIndex].summaryString();
          Storage.set({key:'longestSleepTime',value:this.longestSleepTime}).then(()=>{});
          this.longestSleepDate=bedtimeDataCopy[maxIndex].dateString();
          Storage.set({key:'longestSleepDate',value:this.longestSleepDate}).then(()=>{});
          this.shortestSleepTime=bedtimeDataCopy[0].summaryString();
          Storage.set({key:'shortestSleepTime',value:this.shortestSleepTime}).then(()=>{});
          this.shortestSleepDate=bedtimeDataCopy[0].dateString();
          Storage.set({key:'shortestSleepDate',value:this.shortestSleepDate}).then(()=>{});
        }
        else {
          this.loggedAt="";
          Storage.set({key:'loggedAt',value:this.loggedAt}).then(()=>{});
          this.lastBedtime="";
          Storage.set({key:'lastBedtime',value:this.lastBedtime}).then(()=>{});
          this.lastSummary="";
          Storage.set({key:'lastSummary',value:this.lastSummary}).then(()=>{});
          this.averageHours="0";
          Storage.set({key:'averageHours',value:this.averageHours}).then(()=>{});
          this.averageMinutes="0";
          Storage.set({key:'averageMinutes',value:this.averageMinutes}).then(()=>{});
          this.shortestSleepTime="0 hours, 0 minutes";
          Storage.set({key:'shortestSleepTime',value:this.shortestSleepTime}).then(()=>{});
          this.shortestSleepDate="";
          Storage.set({key:'shortestSleepDate',value:this.shortestSleepDate}).then(()=>{});
          this.longestSleepTime="0 hours, 0 minutes";
          Storage.set({key:'longestSleepTime',value:this.longestSleepTime}).then(()=>{});
          this.longestSleepDate="";
          Storage.set({key:'longestSleepDate',value:this.longestSleepDate}).then(()=>{});

        }
      };
    });
    await modal.present();
  }
}
