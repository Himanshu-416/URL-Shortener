class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super()
    this.data = null;
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    this.success = false;
    this.stack = stack;
  }
}

export default ApiError;
