import type { BaseError, ErrorCollection, FieldError } from './@types/error.types';

/**
 * Internal helper to create BaseError objects from messages
 */
function createBaseErrors(messages: string[]): BaseError[] {
  return messages.map(message => ({ messages: [message] }));
}

/**
 * Create an ErrorCollection from a single message or array of messages
 */
export function makeError(messages: string | string[]): ErrorCollection {
  const messageArray = Array.isArray(messages) ? messages : [messages];
  return createBaseErrors(messageArray);
}

/**
 * Create a FieldError with errors for a specific field
 */
export function makeFieldError(field: string, messages: string | string[]): FieldError {
  return {
    [field]: makeError(messages),
  };
}

/**
 * Create a FieldError for form validation with optional global messages
 */
export function makeFormError(field: string, messages: string | string[], globalMessages?: string | string[]): FieldError {
  const fieldError: FieldError = { [field]: makeError(messages) };
  if (globalMessages) {
    fieldError._global = makeError(globalMessages);
  }
  return fieldError;
}

/**
 * Create a service-level error (non-field specific)
 */
export function makeServiceError(messages: string | string[]): FieldError {
  return { _global: makeError(messages) };
}

/**
 * Handle try-catch errors and create proper ErrorCollection
 */
export function makeTryCatchError(error: unknown, context?: string): ErrorCollection {
  const message = error instanceof Error ? error.message : String(error);
  const fullMessage = context ? `${context}: ${message}` : message;
  return makeError(fullMessage);
}

/**
 * Create a general error for unexpected failures
 */
export function makeGeneralError(message = 'An unexpected error occurred'): FieldError {
  return { general: makeError(message) };
}
