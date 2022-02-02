import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-change-email-smart',
  template: `
    <app-change-email-presentation>
    </app-change-email-presentation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeEmailSmartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
