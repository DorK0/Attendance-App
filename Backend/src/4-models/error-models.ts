class ClientError {
    public status: number;
    public message: string;
    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

//frontend requesting resource with id which we don't have.
export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `id ${id} not found`);
    }
}

//frontend requesting resource with id which we don't have.
export class DataNotFoundError extends ClientError {
    public constructor(userId: number, month: string) {
        super(404, `No attendance records found for user ${userId} in month ${month}.`);
    }
}

//frontend requesting a non existing route:
export class RouteNotFoundError extends ClientError {
    public constructor(method: string, route: string) {
        super(404, `Route ${route} on method ${method} not exist`);
    }
}

//frontend trying to POST/PUT/PATH an object with validation errors: 
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message);
    }
}

//user failed login or tries to enter somewhere but we don't know who the user is:
export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(401, message)
    }
}

//user tries to enter somewhere which he don't have permission to:
export class ForbiddenError extends ClientError {
    public constructor(message: string) {
        super(403, message)
    }
}
