import React, { PropsWithChildren } from "react";
import { UserRole, WithUserRoles } from "./roles";
import { hasAllowedRoles } from "./utils";
import { Unauthorized } from "../components/Unauthorized";


interface Props {
    allowedRoles: UserRole[];
}

export const ProtectedPage = ({ children, allowedRoles, roles }: WithUserRoles<PropsWithChildren<Props>>) => {
    if (hasAllowedRoles(allowedRoles, roles)) {
        return <>{children}</>;
    }

    return <Unauthorized />;
}
