interface Strategy {
  [key: string]: number | undefined
}

const ErrorStrategy: Strategy = {
  BadRequest: 400,
  NotFound: 404,
  Conflict: 409,
  UnprocessableEntity: 422,
  InternalServerError: 500,
  NotImplemented: 501,
}

export default function ErrorHandler(errorClassName: string) {
  const httpStatus = ErrorStrategy[errorClassName]

  return !httpStatus ? 500 : httpStatus
}
