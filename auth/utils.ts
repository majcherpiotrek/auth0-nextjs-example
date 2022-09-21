import { readRolesFromUserProfile, UserRole } from "./roles";
import { complement, intersection, isEmpty } from "ramda";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { Maybe } from "true-myth";

const nonEmpty = complement(isEmpty);

export const hasAllowedRoles = (allowedRoles: UserRole[], roles: UserRole[]): boolean => nonEmpty(intersection(allowedRoles, roles));

export const getRolesFromGetServerSidePropsContext = ({ req, res }: Pick<GetServerSidePropsContext, "req" | "res">): UserRole[] => {
    const session = getSession(req, res);
    return Maybe.of(session?.user).andThen(readRolesFromUserProfile).unwrapOr([]);
}
