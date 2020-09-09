export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor(message: object | string) {
    if (message instanceof Object) super(JSON.stringify(message));
    else super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export abstract class HTTPServerError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor(message: object | string) {
    if (message instanceof Object) super(JSON.stringify(message));
    else super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = "Bad Request") {
    super(message);
  }
}

export class HTTPUnprocessableEntityError extends HTTPClientError {
  readonly statusCode = 422;

  constructor(message: string | object = "Unprocessable Entity") {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;
  constructor(message: string | object = "Not Found") {
    super(message);
  }
}

export class HTTPUnauthorisedError extends HTTPClientError {
  readonly statusCode = 401;
  constructor(message: string | object = "Unauthroised") {
    super("Authentication error: " + message);
  }
}

export class HTTPConflictError extends HTTPClientError {
  readonly statusCode = 409;
  constructor(message: string | object = "Conflict") {
    super(message);
  }
}

export class HTTP500Error extends HTTPServerError {
  readonly statusCode = 500;
  constructor(message: string | object = "Internal Server Error") {
    super(message);
  }
}
