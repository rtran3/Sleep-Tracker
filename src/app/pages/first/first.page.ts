import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  @Input() bedtimeData:any[] = [];
  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss(this.bedtimeData);
  }

  delete(value){
    var temp=this.bedtimeData.filter((item)=> {
      return item.id!=value.id;
    });
    this.bedtimeData=temp;
  }

  async share(value) {
    Share.share({
      text:"Finished a sleep session of "+value.summaryString()+" on the "+value.dateString()+". How well did you sleep?"
    })
  }
}
