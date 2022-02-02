import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-profile-detail-smart',
  template: `
    <app-user-profile-detail-presentation>
    </app-user-profile-detail-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileDetailSmartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
