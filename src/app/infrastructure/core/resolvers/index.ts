import { CreateUserResolver } from './create-user.resolver';
import { GetRoleListResolver } from './get-role-list.resolver';
import { UpdateUserResolver } from './update-user.resolver';

/**
 * Object of resolvers for individual wiring.
 */
export const resolverList = {
    CreateUserResolver,
    GetRoleListResolver,
    UpdateUserResolver,
};
