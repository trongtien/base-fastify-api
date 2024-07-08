import { CONFIG_MESSAGE } from 'infrastructure/config/message';

export class ValidateError extends Error {
  constructor(issue: any) {
    super(CONFIG_MESSAGE.BAD_REQUEST);
    this.stack = issue

    Object.setPrototypeOf(this, ValidateError.prototype);
  }
}

export class AppNotFound extends Error {
  constructor() {
    super(CONFIG_MESSAGE.NOT_FOUND);

    Object.setPrototypeOf(this, AppNotFound.prototype);
  }
}

export class AppServerInternal extends Error {
  constructor(message?: string | any) {
    super(message ?? CONFIG_MESSAGE.SERVER_INTERNAL);

    Object.setPrototypeOf(this, AppServerInternal.prototype);
  }
}

export class AppBadRequest extends Error {
  constructor(message?: string) {
    super(message ?? CONFIG_MESSAGE.BAD_REQUEST);

    Object.setPrototypeOf(this, AppBadRequest.prototype);
  }
}

export class AppAccessDenied extends Error {
  constructor() {
    super(CONFIG_MESSAGE.ACCESS_DENIED);

    Object.setPrototypeOf(this, AppAccessDenied.prototype);
  }
}
