import { IConfigPlayer } from './../Interface/playerRecorder.interface';
import { EventEmitter, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  GenericResponse,
  RecordingData,
  VoiceRecorder,
} from 'capacitor-voice-recorder';

import { IRecordingData } from '../Interface/playerRecorder.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerRecorderService {
  emitRecordingData = new EventEmitter<IRecordingData>();

  constructor(private alertCtrl: AlertController) {}

  async play(): Promise<boolean> {
    if (await this.voicePermission()) {
      return await VoiceRecorder.startRecording()
        .then((result: GenericResponse) => result.value)
        .catch(async (error) => {
          const alert = await this.alertCtrl.create({
            cssClass: 'alertErrorRequest',
            message: `Error start voice recoreder "${error}"`,
            backdropDismiss: false,
            buttons: [
              {
                id: 'btnOkLabel',
                text: 'Ok',
              },
            ],
          });

          await alert.present();

          return false;
        });
    }
    return false;
  }

  async pause(): Promise<boolean> {
    return await VoiceRecorder.pauseRecording()
      .then((result: GenericResponse) => result.value)
      .catch(async (error) => {
        const alert = await this.alertCtrl.create({
          cssClass: 'alertErrorRequest',
          message: `Error pause voice recoreder "${error}"`,
          backdropDismiss: false,
          buttons: [
            {
              id: 'btnOkLabel',
              text: 'Ok',
            },
          ],
        });

        await alert.present();

        return false;
      });
  }

  async resume(): Promise<boolean> {
    return await VoiceRecorder.resumeRecording()
      .then((result: GenericResponse) => result.value)
      .catch(async (error) => {
        const alert = await this.alertCtrl.create({
          cssClass: 'alertErrorRequest',
          message: `Error resume voice recoreder "${error}"`,
          backdropDismiss: false,
          buttons: [
            {
              id: 'btnOkLabel',
              text: 'Ok',
            },
          ],
        });

        await alert.present();

        return false;
      });
  }

  async stop(): Promise<boolean> {
    return await VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        this.emitRecordingData.emit(result.value);
        return true;
      })
      .catch(async (error) => {
        const alert = await this.alertCtrl.create({
          cssClass: 'alertErrorRequest',
          message: `Error stop voice recoreder "${error}"`,
          backdropDismiss: false,
          buttons: [
            {
              id: 'btnOkLabel',
              text: 'Ok',
            },
          ],
        });

        await alert.present();

        return false;
      });
  }

  convertMS(ms: number, config: IConfigPlayer): string {
    let time = '';
    const hours = String(Math.floor(ms / 3600000));
    const minutes = Math.floor(ms / 60000);
    const seconds = Number(((ms % 60000) / 1000).toFixed(0));

    if (config.listViewHours) {
      time += String(hours);
    }

    if (config.listViewMinutes) {
      if (time.length > 0) {
        time += ':';
      }
      time += String(minutes);
    }

    if (config.listViewSeconds) {
      if (time.length > 0) {
        time += ':';
      }
      time += String((seconds < 10 ? '0' : '') + seconds);
    }

    return time;
  }

  private async voicePermission(): Promise<boolean> {
    //VALIDA COMPATIBILIDADE
    return await VoiceRecorder.canDeviceVoiceRecord().then(
      async (compatibility: GenericResponse) => {
        if (compatibility.value) {
          return await VoiceRecorder.hasAudioRecordingPermission().then(
            async (checkPermission: GenericResponse) => {
              if (!checkPermission.value) {
                return await VoiceRecorder.requestAudioRecordingPermission().then(
                  async (requestPermission: GenericResponse) => {
                    if (!requestPermission.value) {
                      //Solicitação negada
                      const alertPermission = await this.alertCtrl.create({
                        cssClass: 'alertPlayerRecorderPermissionDenied',
                        header: 'Solicitação negada pelo usuário!',
                        backdropDismiss: false,
                        buttons: [
                          {
                            id: 'btnOkLabel',
                            text: 'OK',
                          },
                        ],
                      });

                      await alertPermission.present();

                      return requestPermission.value;
                    }

                    //Solicitada e aceitado pelo usuário
                    return requestPermission.value;
                  }
                );
              }

              //Permissão já habilitada
              return checkPermission.value;
            }
          );
        }

        const alertCompatibility = await this.alertCtrl.create({
          cssClass: 'alertPlayerRecorderNotCompatibility',
          header: 'INCOMPATIBILIDADE',
          message:
            'Dispositivo Atual não possui compatibilidade com essa funcionalidade.',
          backdropDismiss: false,
          buttons: [
            {
              id: 'btnOkLabel',
              text: 'OK',
            },
          ],
        });

        await alertCompatibility.present();

        return compatibility.value;
      }
    );
  }
}
