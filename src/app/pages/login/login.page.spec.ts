import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/authentication/auth-service.service';
import { ControllService } from 'src/app/Services/controller.service';
import { StorageService } from 'src/app/Services/storageService.service';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: arg => ({}) });
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({ then: () => ({}) }) })
    });
    const authServiceStub = () => ({ login: value => ({ then: () => ({}) }) });
    const controllServiceStub = () => ({
      toastControllerBottom: string => ({}),
      loadingController: object => ({ dismiss: () => ({}) }),
      navigateMenu: () => ({})
    });
    const storageServiceStub = () => ({
      getAPI: () => ({}),
      setAPI: url => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginPage],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: ControllService, useFactory: controllServiceStub },
        { provide: StorageService, useFactory: storageServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`version has default value`, () => {
    expect(component.version).toEqual(environment.version);
  });

  it(`visiblePass has default value`, () => {
    expect(component.visiblePass).toEqual(true);
  });

  describe('settings', () => {
    it('makes expected calls', () => {
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const storageServiceStub: StorageService = fixture.debugElement.injector.get(
        StorageService
      );
      spyOn(alertControllerStub, 'create').and.callThrough();
      spyOn(storageServiceStub, 'getAPI').and.callThrough();
      spyOn(storageServiceStub, 'setAPI').and.callThrough();
      component.settings();
      expect(alertControllerStub.create).toHaveBeenCalled();
      expect(storageServiceStub.getAPI).toHaveBeenCalled();
      expect(storageServiceStub.setAPI).toHaveBeenCalled();
    });
  });
});
