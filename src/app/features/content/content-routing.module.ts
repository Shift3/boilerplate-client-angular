import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from './content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
  },
];

/**
 * Lazy loaded module for all content-related routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule { }

export const components = [
  ContentLayoutComponent,
];
