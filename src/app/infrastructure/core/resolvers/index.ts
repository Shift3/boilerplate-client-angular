import { CreateAgentResolver } from './create-agent.resolver';
import { CreateUserResolver } from './create-user.resolver';
import { GetLoggedInUserResolver } from './get-logged-in-user.resolver';
import { GetOwnRoleListResolver } from './get-own-role-list.resolver';
import { GetRoleListResolver } from './get-role-list.resolver';
import { UpdateAgentResolver } from './update-agent.resolver';
import { UpdateUserResolver } from './update-user.resolver';

/**
 * Object of resolvers for individual wiring.
 */
export const resolverList = {
  CreateAgentResolver,
  CreateUserResolver,
  GetLoggedInUserResolver,
  GetOwnRoleListResolver,
  GetRoleListResolver,
  UpdateAgentResolver,
  UpdateUserResolver,
};
