import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GestureController, IonButton } from '@ionic/angular';

import { IConfigPlayer } from '../../Interface/playerRecorder.interface';
import { PlayerRecorderService } from '../../Service/playerRecorder.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnInit, AfterViewInit {
  @ViewChild('btnRecorder', { read: ElementRef }) btnRecorder: ElementRef;
  @Input() config = new IConfigPlayer();
  intervalVoiceDuration: any;
  limitRecorderDuration = '';
  recorderDuration = '0:00';
  isRecorder = false;

  constructor(
    private recorderService: PlayerRecorderService,
    private gestureCtrl: GestureController,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.limitRecorderDuration = this.recorderService.convertMS(
      this.config.maxRecorederMS,
      this.config
    );
  }

  ngAfterViewInit() {
    const longPress = this.gestureCtrl.create({
      el: this.btnRecorder.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: () => {
        this.start();
      },
      onEnd: () => {
        this.stop();
      },
    });

    if (this.config.boolPressAndHold) {
      longPress.enable();
    }
  }

  async start() {
    await this.recorderService
      .play()
      .then((r) => (r ? this.startVoiceDuration() : null));
  }

  async pause() {
    await this.recorderService
      .pause()
      .then((r) => (r ? this.pauseVoiceDuration() : null));
  }

  async resume() {
    await this.recorderService
      .resume()
      .then((r) => (r ? this.startVoiceDuration() : null));
  }

  async stop() {
    await this.recorderService
      .stop()
      .then((r) => (r ? this.stopVoiceDuration() : null));
  }

  private startVoiceDuration() {
    this.isRecorder = true;
    this.intervalVoiceDuration = setInterval(() => {
      let msDurationValid = 1000;
      this.config.msDuration += 10;

      if (this.config.msDuration >= this.config.maxRecorederMS) {
        this.stop();
      }

      if (this.config.msDuration >= msDurationValid) {
        this.zone.run(() => {
          this.recorderDuration = this.recorderService.convertMS(
            this.config.msDuration,
            this.config
          );
          msDurationValid++;
        });
      }
    }, 10);
  }

  private pauseVoiceDuration() {
    clearInterval(this.intervalVoiceDuration);
  }

  private stopVoiceDuration() {
    clearInterval(this.intervalVoiceDuration);
    this.zone.run(() => {
      this.isRecorder = false;
      this.config.msDuration = 0;
      this.recorderDuration = '0:00';
    });
  }
}
