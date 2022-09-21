import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { WithUserRoles } from "../auth/roles";
import { GetServerSideProps } from "next";
import { getRolesFromGetServerSidePropsContext, hasAllowedRoles } from "../auth/utils";

const SsrAuth = withPageAuthRequired((props: WithUserRoles) => <div><h1>This was authorized on the server</h1></div>);

export default SsrAuth;

export const getServerSideProps: GetServerSideProps<WithUserRoles> = async (context) => {
    const roles = getRolesFromGetServerSidePropsContext(context);
    // TODO  Those allowed roles could be fetched from some static configuration based on the request url
    if (!hasAllowedRoles(["super_admin"], roles)) {
        return {
            notFound: true
        };
    }

    return {
        props: { roles }
    };
}

/*
{
    "/top-secret": ["super_admin"],
    "/not-so-secret": ["super_admin", "pixel_client"]
}
 */
