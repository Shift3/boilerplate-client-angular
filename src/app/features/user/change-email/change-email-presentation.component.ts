import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-email-presentation',
  templateUrl: './change-email-presentation.component.html',
  styleUrls: ['./change-email-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailPresentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
