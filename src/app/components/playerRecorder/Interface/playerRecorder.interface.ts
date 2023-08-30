export declare type Base64String = string;
export class IConfigPlayer {
  listPlayer: IRecordingData[] = [];
  msDuration = 0;
  //validation
  listView = true;
  listViewHours = false;
  listViewMinutes = true;
  listViewSeconds = true;
  //Player
  typeAudio: 'aac' | 'wav' | 'mp3' = 'aac';
  //Recorder
  boolCountRecorder = true;
  boolPressAndHold = true;
  maxRecorederMS = 300000;
}

export class IRecordingData {
  recordDataBase64: Base64String;
  msDuration: number;
  mimeType: string;
}
