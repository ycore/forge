export type AppResult<T, E = AppError> = Success<T> | Failure<E>;

export interface Success<T> {
  readonly success: true;
  readonly data: T;
}

export interface Failure<E> {
  readonly success: false;
  readonly error: E;
}

export interface AppError {
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly cause?: Error;
}