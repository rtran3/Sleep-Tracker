import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  @Input() sleepinessData:any[] = [];

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss(this.sleepinessData);
  }
  
  delete(value){
    this.sleepinessData=this.sleepinessData.filter((item)=> {
      return item.id!=value.id;
    });
  }

}