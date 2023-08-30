/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-zoom-image',
  templateUrl: 'zoom_image.component.html',
  styleUrls: ['zoom_image.component.scss'],
})
export class ZoomImageComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @Input() img: any;

  disabledBotton = false;
  sliderOpts = {
    zoom: true,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slides.update();
  }

  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
    this.disabledBotton = zoomIn;
  }

  close() {
    this.modalController.dismiss();
  }
}
