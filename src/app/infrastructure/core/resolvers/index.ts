import { CreateAgencyResolver } from './create-agency.resolver';
import { CreateAgentResolver } from './create-agent.resolver';
import { CreateUserResolver } from './create-user.resolver';
import { GetAgencyListResolver } from './get-agency-list.resolver';
import { GetRoleListResolver } from './get-role-list.resolver';
import { UpdateAgencyResolver } from './update-agency.resolver';
import { UpdateAgentResolver } from './update-agent.resolver';
import { UpdateUserResolver } from './update-user.resolver';

/**
 * Object of resolvers for individual wiring.
 */
export const resolverList = {
  CreateAgencyResolver,
  CreateAgentResolver,
  CreateUserResolver,
  GetAgencyListResolver,
  GetRoleListResolver,
  UpdateAgencyResolver,
  UpdateAgentResolver,
  UpdateUserResolver,
};
