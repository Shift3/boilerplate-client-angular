import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from '@core/services/api/api.service';
import { environment } from '@env/environment.test';
import {
  IChangeUserSettingRequest,
  ChangeUserSettingRequest,
} from '@models/user-setting';
import { IUserSettingDTO, UserSettingDTO } from '@models/user-setting';
import { Logger } from '@utils/logger';
import { ToastrTestingModule } from '@utils/test/toastr-testing-module';
import { UserSettingService } from './user-setting.service';

import { TranslocoTestingModule } from '@ngneat/transloco';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] UserSettingService', () => {
      const route: string = `${environment.apiRoute}/user-settings`;
      let testUserSetting: IUserSettingDTO;
      let service: UserSettingService;
      let apiService: ApiService;
      let httpTestingController: HttpTestingController;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
            ToastrTestingModule,
            TranslocoTestingModule,
          ],
          providers: [ApiService, UserSettingService],
        });
        service = TestBed.inject(UserSettingService);
        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
        testUserSetting = new UserSettingDTO({
          language: 0,
          userId: 1,
        });
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      describe('updateUserSetting()', () => {
        it('should use PUT as the request method', () => {
          const userSetting: IChangeUserSettingRequest = new ChangeUserSettingRequest(
            {
              language: 'en-US',
            },
          );
          service.updateUserSetting(userSetting, 1).subscribe();
          const req = httpTestingController.expectOne(`${route}/1`);

          expect(req.request.method).toBe('PUT');
        });

        it('should show ');
      });
    });
