import React from "react";
import { WithRoleRestrictions } from "../auth/WithRoleRestrictions";
import { useUser } from "@auth0/nextjs-auth0";

const Profile = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            {user && (
                <div>
                    <img src={user.picture ?? ""} alt={user.name ?? ""} />
                    <h2>{user.name}</h2>
                    <WithRoleRestrictions allowedRoles={["super_admin"]} unauthorizedComp={<p>I cannot see that!</p>}>
                        <p>{user.email}</p>
                    </WithRoleRestrictions>
                </div>
            )}
        </>
    );
};

export default Profile;
