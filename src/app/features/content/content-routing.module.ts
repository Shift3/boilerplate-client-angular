import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { ProviderListPresentationComponent } from './providers/provider-list/provider-list-presentation.component';
import { ProviderListSmartComponent } from './providers/provider-list/provider-list-smart.component';
import { ProviderTableComponent } from './providers/provider-table/provider-table.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'provider-list',
        pathMatch: 'full',
      },
      {
        path: 'provider-list',
        component: ProviderListSmartComponent,
        data: { title: 'Provider List' },
      },
    ],
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
  ProviderListPresentationComponent,
  ProviderListSmartComponent,
  ProviderTableComponent,
];
