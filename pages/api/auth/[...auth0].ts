import { handleAuth, handleLogin, HandleLogin } from "@auth0/nextjs-auth0";

const login: HandleLogin = async (req, res, options) => {
    console.log("options", options);
    return handleLogin(req, res, {
        ...options,
        authorizationParams: {
            ...options?.authorizationParams,
            scope: `openid email profile roles ${
                options?.authorizationParams?.scope ?? ""
            }`,
        },
    });
};

export default handleAuth({ login });
