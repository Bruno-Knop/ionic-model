import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';

import { IRecordingData } from '../../Interface/playerRecorder.interface';
import { IConfigPlayer } from './../../Interface/playerRecorder.interface';
import { PlayerRecorderService } from './../../Service/playerRecorder.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('range', { static: false }) range: IonRange;
  @Input() config: IConfigPlayer;
  @Input() index: number;
  @Input() audio: IRecordingData;

  intervalPlayer: any;
  activeTrack: IRecordingData = null;
  activeTrackIndex: number;
  player: Howl = null;
  countPlayerDuration = 0;
  progressAudioPlayer = 0;
  playerDuration = '0:00';
  audioDuration = '0:00';
  isPlaying = false;

  constructor(public playerService: PlayerRecorderService) {}

  ngOnInit() {
    this.audioDuration = this.playerService.convertMS(
      this.audio.msDuration,
      this.config
    );
  }

  async playerAudio() {
    if (this.activeTrackIndex === this.index) {
      if (this.isPlaying) {
        this.player.pause();
        clearInterval(this.intervalPlayer);
      } else {
        this.player.play();
      }

      this.isPlaying = !this.isPlaying;
    } else {
      this.isPlaying = false;

      if (this.player) {
        this.player.stop();
      }

      await this.setAudio();

      this.player.play();
    }
  }

  async seek() {
    if (this.player === null) {
      await this.setAudio();
    }

    const newValue = +this.range.value;
    const duration = this.player.duration();
    this.playerDuration = this.playerService.convertMS(
      Math.floor(duration * (newValue / 100)) * 1000,
      this.config
    );
    this.player.seek(duration * (newValue / 100));
  }

  private playIntervalPlayer() {
    this.intervalPlayer = setInterval(() => {
      const seek = this.player.seek();
      this.progressAudioPlayer = (seek / this.player.duration()) * 100 || 0;
      this.countPlayerDuration += 100;
      console.log(this.audio.msDuration >= this.countPlayerDuration);
      if (this.audio.msDuration >= this.countPlayerDuration) {
        this.playerDuration = this.playerService.convertMS(
          this.countPlayerDuration,
          this.config
        );
      }

      if (this.progressAudioPlayer === 0) {
        this.countPlayerDuration = 0;
        clearInterval(this.intervalPlayer);
      }
    }, 100);
  }

  private setAudio() {
    this.player = new Howl({
      src: [
        `data:audio/${this.config.typeAudio};base64,${this.audio.recordDataBase64}`,
      ],
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = this.audio;
        this.activeTrackIndex = this.index;
        this.playIntervalPlayer();
      },
      onend: () => {
        this.isPlaying = false;
        setTimeout(() => {
          this.playerDuration = '0:00';
        }, 300);
      },
    });
  }
}
