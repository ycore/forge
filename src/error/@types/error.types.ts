export interface BaseError {
  messages: string[];
}

export type ErrorCollection = BaseError[];

export interface FieldError {
  [field: string]: ErrorCollection;
}

export type ErrorCode = string;
