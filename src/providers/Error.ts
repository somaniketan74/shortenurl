class CommonError extends Error {
    code: string
    userError: boolean
    statusCode: number
    constructor(data: any, ...args: any) {
        super(...args);
        this.code = data.code;
        this.userError = data.userError;
        this.statusCode = data.statusCode;
    }
}
export class VadidationError extends CommonError {
    errors: any;
    constructor(...args: any) {
        super({ "code": 'VALIDATION_ERROR', "userError": true, "statusCode": 400 }, ...args);
    }
};

export class AuthError extends CommonError {
    constructor(...args: any) {
        super({ "code": 'AUTH_ERROR', "userError": true, "statusCode": 401 }, ...args);
    }
}