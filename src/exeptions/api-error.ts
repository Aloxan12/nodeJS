export class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors:any[] = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError(text?:string){
        return new ApiError(401, 'Пользователь не авторизован' + text)
    }

    static BadRequest(message: string, errors: any[] = []){
        return new ApiError(400, message, errors)
    }
}