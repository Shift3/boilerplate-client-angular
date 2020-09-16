import { CreateAgencyResolver } from './create-agency.resolver';
import { CreateAgentResolver } from './create-agent.resolver';
import { CreateUserResolver } from './create-user.resolver';
import { GetAgencyListResolver } from './get-agency-list.resolver';
import { GetLoggedInUserResolver } from './get-logged-in-user.resolver';
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
  GetLoggedInUserResolver,
  GetRoleListResolver,
  UpdateAgencyResolver,
  UpdateAgentResolver,
  UpdateUserResolver,
};
