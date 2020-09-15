import { CreateAgencyResolver } from './create-agency.resolver';
import { CreateAgentResolver } from './create-agent.resolver';
import { CreateUserResolver } from './create-user.resolver';
import { GetRoleListResolver } from './get-role-list.resolver';
import { UpdateAgentResolver } from './update-agent.resolver';
import { UpdateUserResolver } from './update-user.resolver';

/**
 * Object of resolvers for individual wiring.
 */
export const resolverList = {
  CreateAgencyResolver,
  CreateAgentResolver,
  CreateUserResolver,
  GetRoleListResolver,
  UpdateAgentResolver,
  UpdateUserResolver,
};
