import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilesUpload } from 'src/app/Interfaces/combos.interface';
import { environment } from 'src/environments/environment.prod';

import { IResult } from './../../../Interfaces/result.interface';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  async getFormData(
    id: number,
    endpoint: string
  ): Promise<IResult<IFilesUpload>> {
    return this.http
      .get<any>(`${API}/v1/FTPUpload?id=${id}&endpoint=${endpoint}`)
      .toPromise()
      .then((result: IResult<IFilesUpload>) => result)
      .catch(() => ({
        success: false,
        message: 'Error endpoint get "FTPUpload"',
        data: {},
        errors: [],
      }));
  }

  async uploadFormData(
    formData: FormData,
    id: number,
    endpoint: string
  ): Promise<IResult<IFilesUpload>> {
    return this.http
      .post<any>(`${API}/v1/FTPUpload?id=${id}&endpoint=${endpoint}`, formData)
      .toPromise()
      .then((result: IResult<IFilesUpload>) => result)
      .catch(() => ({
        success: false,
        message: 'Error endpoint post "FTPUpload"',
        data: {},
        errors: [],
      }));
  }

  async deleteFromData(
    file: IFilesUpload,
    endpoint: string
  ): Promise<IResult<IFilesUpload>> {
    return this.http
      .delete<any>(
        `${API}/v1/FTPUpload?id=${file.id}&endpoint=${endpoint}&filename=${file.filename}`
      )
      .toPromise()
      .then((result: IResult<IFilesUpload>) => result)
      .catch(() => ({
        success: false,
        message: 'Error endpoint delete "FTPUpload"',
        data: {},
        errors: [],
      }));
  }
}
