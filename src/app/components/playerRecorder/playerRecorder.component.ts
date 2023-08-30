import { Component, Input, OnInit } from '@angular/core';

import { IConfigPlayer } from './Interface/playerRecorder.interface';
import { PlayerRecorderService } from './Service/playerRecorder.service';

@Component({
  selector: 'app-player-recorder',
  templateUrl: './playerRecorder.component.html',
  styleUrls: ['./playerRecorder.component.scss'],
})
export class PlayerRecorderComponent implements OnInit {
  @Input() configPlayer = new IConfigPlayer();

  constructor(private playerRecorderService: PlayerRecorderService) {}

  ngOnInit() {
    this.playerRecorderService.emitRecordingData.subscribe((recordingData) => {
      this.configPlayer.listPlayer.push(recordingData);
    });
  }
}
