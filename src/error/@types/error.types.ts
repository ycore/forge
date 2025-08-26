export interface BaseError {
  messages: string[];
}

export type ErrorCollection = BaseError[];

export interface FieldError {
  [field: string]: ErrorCollection;
}

export type TypedResult<T = unknown, E = ErrorCollection> =
  | { data: T; errors: null }
  | { data: null; errors: E };

export type ErrorCode = string;
