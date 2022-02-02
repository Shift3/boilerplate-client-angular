import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-profile-detail-presentation',
  templateUrl: './user-profile-detail-presentation.component.html',
  styleUrls: ['./user-profile-detail-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileDetailPresentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
