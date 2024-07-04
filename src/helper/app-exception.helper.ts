import { APP_MESSAGE } from './message.helper';

export class ValidateError extends Error {
  constructor(issue: any) {
    super(APP_MESSAGE.BAD_REQUEST);
    this.stack = issue

    Object.setPrototypeOf(this, ValidateError.prototype);
  }
}

export class AppNotFound extends Error {
  constructor() {
    super(APP_MESSAGE.NOT_FOUND);

    Object.setPrototypeOf(this, AppNotFound.prototype);
  }
}

export class AppServerInternal extends Error {
  constructor(message?: string | any) {
    super(message ?? APP_MESSAGE.SERVER_INTERNAL);

    Object.setPrototypeOf(this, AppServerInternal.prototype);
  }
}

export class AppBadRequest extends Error {
  constructor(message?: string) {
    super(message ?? APP_MESSAGE.BAD_REQUEST);

    Object.setPrototypeOf(this, AppBadRequest.prototype);
  }
}

export class AppAccessDenied extends Error {
  constructor() {
    super(APP_MESSAGE.ACCESS_DENIED);

    Object.setPrototypeOf(this, AppAccessDenied.prototype);
  }
}
