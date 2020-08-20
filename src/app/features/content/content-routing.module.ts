import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentDetailPresentationComponent } from './agents/agent-detail/agent-detail-presentation.component';
import { AgentDetailSmartComponent } from './agents/agent-detail/agent-detail-smart.component';
import { AgentListPresentationComponent } from './agents/agent-list/agent-list-presentation.component';
import { AgentListSmartComponent } from './agents/agent-list/agent-list-smart.component';
import { AgentTableComponent } from './agents/agent-table/agent-table.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'agent-list',
        pathMatch: 'full',
      },
      {
        path: 'agent-list',
        component: AgentListSmartComponent,
        data: { title: 'Agent List' },
      },
      {
        path: 'create-agent',
        component: AgentDetailSmartComponent,
        data: { title: 'Add Agent' },
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
  AgentDetailSmartComponent,
  AgentDetailPresentationComponent,
  AgentListPresentationComponent,
  AgentListSmartComponent,
  AgentTableComponent,
  ContentLayoutComponent,
];
