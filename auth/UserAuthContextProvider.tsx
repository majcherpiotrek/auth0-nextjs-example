import { readRolesFromUserProfile, UserRole } from "./roles";
import React, { PropsWithChildren } from "react";
import { UserContext, useUser } from "@auth0/nextjs-auth0";

interface UserAuthContext extends UserContext {
    roles: UserRole[];
}

const missingUserProvider = 'You forgot to wrap your app in <UserProvider>';

const UserAuthContext = React.createContext<UserAuthContext>({
    get roles(): never {
        throw new Error(missingUserProvider);
    },
    get user(): never {
        throw new Error(missingUserProvider);
    },
    get error(): never {
        throw new Error(missingUserProvider);
    },
    get isLoading(): never {
        throw new Error(missingUserProvider);
    },
    checkSession: (): never => {
        throw new Error(missingUserProvider);
    }
});

export const UserAuthContextProvider = ({ children }: PropsWithChildren) => {
    const userContext = useUser();
    const [roles, setRoles] = React.useState<UserRole[]>([]);

    React.useEffect(() => {
        if (!userContext.isLoading && userContext.user) {
            readRolesFromUserProfile(userContext.user).match({
                Just: setRoles,
                Nothing: () => {
                    // TODO It means that the roles were not passed in the token claims or they were passed under another key.
                    //  We shouldn't crash the app at this point but maybe send an error to a logging service
                    console.error("There are no roles configured on the user profile")
                    setRoles([]);
                },
            })
        }
    }, [userContext.user, userContext.isLoading]);

    // isLoading: false, roles: []
    // isLoading: false, roles: ["super_admin"]

    return <UserAuthContext.Provider value={{ ...userContext, roles }}>{children}</UserAuthContext.Provider>;
}

export const useUserAuthContext = () => React.useContext(UserAuthContext);
