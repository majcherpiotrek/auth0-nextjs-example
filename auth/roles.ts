import { Claims, UserProfile } from "@auth0/nextjs-auth0";
import { Maybe } from "true-myth";
import { filter } from "ramda";

/**
 * The values below must match the role names in https://manage.auth0.com/dashboard/us/laptopdash-dev/roles
 */
const knownRoles = ["super_admin", "pixel_client"] as const;
export type UserRole = typeof knownRoles[number];
export type WithUserRoles<T extends Record<string, any> = {}> = T & { roles : UserRole[]; };

const isKnownRole = (role: string): role is UserRole => knownRoles.includes(role as UserRole);

const filterKnownRoles: (roles: string[]) => UserRole[] = filter<string, UserRole>(isKnownRole);

export const readRolesFromUserProfile = (profile: Claims | UserProfile): Maybe<UserRole[]> => {
    const rolesKey = `${process.env.NEXT_PUBLIC_ROLES_NAMESPACE}/roles`;
    return Maybe.of<string[]>(profile[rolesKey] as string[]).map(filterKnownRoles)
}


