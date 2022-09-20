import { UserProfile } from "@auth0/nextjs-auth0";
import { Maybe, Result, Toolbelt } from "true-myth";
import { AuthError } from "./errors";
import { filter } from "ramda";

/**
 * The values below must match the role names in https://manage.auth0.com/dashboard/us/laptopdash-dev/roles
 */
const knownRoles = ["super_admin", "pixel_client"] as const;
type UserRole = typeof knownRoles[number];

const isKnownRole = (role: string): role is UserRole => knownRoles.includes(role as UserRole);

class MissingRolesError extends AuthError {
    constructor() {
        super("There are no roles configured on the user profile");
    }
}

const filterKnownRoles: (roles: string[]) => UserRole[] = filter<string, UserRole>(isKnownRole);

export const readRolesFromUserProfile = (profile: UserProfile): Result<UserRole[], AuthError> =>
    Toolbelt.fromMaybe<string[], AuthError>(
        new MissingRolesError(),
        Maybe.of<string[]>(profile[`${process.env.ROLES_NAMESPACE}/roles`] as string[])
    ).map(filterKnownRoles)

