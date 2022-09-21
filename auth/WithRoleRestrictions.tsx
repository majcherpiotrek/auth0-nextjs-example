import { readRolesFromUserProfile, UserRole } from "./roles";
import React, { PropsWithChildren } from "react";
import { hasAllowedRoles } from "./utils";
import { useUser } from "@auth0/nextjs-auth0";
import { Maybe } from "true-myth";

interface Props {
    allowedRoles: UserRole[];
    unauthorizedComp?: React.ReactNode;

}

export const WithRoleRestrictions = ({ allowedRoles, children, unauthorizedComp }: PropsWithChildren<Props>) => {
    const { user } = useUser();
    const roles = Maybe.of(user).andThen(readRolesFromUserProfile).unwrapOr([]);
    console.log(user);

    return !hasAllowedRoles(allowedRoles, roles) ? <>{(unauthorizedComp ?? <React.Fragment />)}</> : <>{children}</>;
}
