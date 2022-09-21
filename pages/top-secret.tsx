import { readRolesFromUserProfile, UserRole, WithUserRoles } from "../auth/roles";
import { ProtectedPage } from "../auth/ProtectedPage";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Maybe } from "true-myth";
import { getRolesFromGetServerSidePropsContext } from "../auth/utils";

const TopSecret = withPageAuthRequired(({ roles }: WithUserRoles) => <ProtectedPage allowedRoles={["super_admin"]} roles={roles}>
    <h1>This is Top Secret!</h1>
</ProtectedPage>);

export default TopSecret;

export const getServerSideProps: GetServerSideProps<WithUserRoles> = async ({ req, res }) => {
    const roles = getRolesFromGetServerSidePropsContext({ req, res })

    return {
        props: { roles },
    };
}
