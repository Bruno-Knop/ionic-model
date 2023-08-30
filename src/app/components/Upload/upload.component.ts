import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';
import { IFilesUpload } from 'src/app/Interfaces/combos.interface';
import { IDictionaryPropertys } from 'src/app/Interfaces/dictionary.interface';
import { IResult } from 'src/app/Interfaces/result.interface';
import { StorageService } from 'src/app/Services/storageService.service';

import { ControllService } from './../../Services/controller.service';
import { ZoomImageComponent } from './../zoom_image/zoom_image.component';
import { IConfigUpload } from './Interface/upload.interface';
import { UploadService } from './Service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() config: IConfigUpload;
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  dictionary: IDictionaryPropertys = {
    filesUploadedLabel: '',
    dropFilesLabel: '',
    msgWantToRemoveLabel: '',
    msgLoading: '',
    filesLabel: '',
    yesLabel: '',
    notLabel: '',
  };

  constructor(
    private alertCtrl: AlertController,
    private moadlCtrl: ModalController,
    private controller: ControllService,
    private uploadService: UploadService,
    private service: StorageService
  ) {}

  async ngOnInit() {
    await this.service.getDictionary().then((result) => {
      Object.keys(this.dictionary).forEach((value) => {
        const controls = result.map((x) => x.property);
        if (controls.includes(value)) {
          this.dictionary[value] = result.find(
            (x) => x.property.trim() === value
          ).language;
        }
      });
    });
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => fileItem.file);
  }

  async removeLocalFile(file: FileItem) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertUploadRemoveFile',
      message: this.dictionary.msgWantToRemoveLabel.replace(
        '[FILE]',
        file.file.name
      ),
      backdropDismiss: false,
      buttons: [
        {
          id: 'btnYesLabel',
          text: this.dictionary.yesLabel,
          handler: async () => {
            const loading = await this.controller.loadingController(
              this.dictionary.msgLoading
            );
            await this.fileUploader.removeFromQueue(file);
            loading.dismiss();
          },
        },
        {
          id: 'btnNotLabel',
          text: this.dictionary.notLabel,
        },
      ],
    });

    await alert.present();
  }

  async removeFile(file: IFilesUpload) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertUploadRemoveFile',
      message: this.dictionary.msgWantToRemoveLabel.replace(
        '[FILE]',
        file.filename
      ),
      backdropDismiss: false,
      buttons: [
        {
          id: 'btnYesLabel',
          text: this.dictionary.yesLabel,
          handler: async () => {
            const loading = await this.controller.loadingController(
              this.dictionary.msgLoading
            );
            await this.uploadService
              .deleteFromData(file, this.config.endpoint)
              .then((result) => {
                loading.dismiss();
                if (result.success) {
                  this.config.listFilesUploaded = [...result.data.rows];
                }

                this.controller.toastControllerBottom(result.message);
              });
          },
        },
        {
          id: 'btnNotLabel',
          text: this.dictionary.notLabel,
        },
      ],
    });

    await alert.present();
  }

  async uploadFiles(id: number): Promise<IResult<IFilesUpload>> {
    const files = this.getFiles();
    if (files.length > 0) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file.rawFile, file.name.replaceAll(' ', '-'));
      });

      return await this.uploadService
        .uploadFormData(formData, id, this.config.endpoint)
        .then((x) => x);
    }
    return {
      success: true,
      message: '',
      data: {},
      errors: [],
    };
  }

  async openView(img: string) {
    const modal = await this.moadlCtrl.create({
      component: ZoomImageComponent,
      backdropDismiss: false,
      componentProps: {
        img,
      },
    });

    await modal.present();
  }
}
