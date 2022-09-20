export abstract class AuthError extends Error {
    protected constructor(message: string) {
        super(message);
    }
}
