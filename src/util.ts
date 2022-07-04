import { Request, Response, NextFunction } from 'express';

/**
 * Helper function to extract error message in a type-safe manner
 *
 * @param error
 * @returns
 */
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Placeholder function to centralize logging service
 *
 * @param param
 */
function reportError({ message }: { message: string }) {
  console.error(message);
}

/**
 * Express middleware to dispatch errors
 *
 * @param err
 * @param _req
 * @param res
 * @param next
 */
function logErrors(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const message = {
    message: getErrorMessage(err),
  };
  reportError(message);
  res.status(500).json(message);
  next(err);
}

export { getErrorMessage, reportError, logErrors };
