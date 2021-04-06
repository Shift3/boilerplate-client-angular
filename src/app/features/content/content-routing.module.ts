import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentDetailPresentationComponent } from './agents/agent-detail/agent-detail-presentation.component';
import { AgentDetailSmartComponent } from './agents/agent-detail/agent-detail-smart.component';
import { AgentListPresentationComponent } from './agents/agent-list/agent-list-presentation.component';
import { AgentListSmartComponent } from './agents/agent-list/agent-list-smart.component';
import { AgentTableComponent } from './agents/agent-table/agent-table.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';

import { AdminAuthGuard } from '@core/guards/admin-auth.guard';
import { CanEditAuthGuard } from '@core/guards/can-edit-auth.guard';
import {
  IRoutingContentTranslationKey,
  RoutingContentTranslationKey,
} from '@models/translation/routing';
import { resolverList } from '@core/resolvers';

const contentRoutingTranslationKeys: IRoutingContentTranslationKey = new RoutingContentTranslationKey();
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
        data: { title: contentRoutingTranslationKeys.agentList },
      },
      {
        path: 'create-agent',
        component: AgentDetailSmartComponent,
        canActivate: [AdminAuthGuard],
        data: {
          title: contentRoutingTranslationKeys.createAgent,
        },
        resolve: {
          agent: resolverList.CreateAgentResolver,
        },
      },
      {
        path: 'set-translation/:id/:languageCode',
        component: AgentDetailSmartComponent,
        canActivate: [CanEditAuthGuard],
        data: {
          title: contentRoutingTranslationKeys.setTranslation,
        },
        resolve: {
          agent: resolverList.UpdateAgentResolver,
        },
      },
      {
        path: 'update-agent/:id',
        component: AgentDetailSmartComponent,
        canActivate: [CanEditAuthGuard],
        data: {
          title: contentRoutingTranslationKeys.updateAgent,
        },
        resolve: {
          agent: resolverList.UpdateAgentResolver,
        },
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
export class ContentRoutingModule {}

export const components = [
  AgentDetailSmartComponent,
  AgentDetailPresentationComponent,
  AgentListPresentationComponent,
  AgentListSmartComponent,
  AgentTableComponent,
  ContentLayoutComponent,
];
