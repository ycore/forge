import type { AppError, Result } from '../result/@types/result.types';

export interface IntentProps {
  value: string;
  name?: string;
}

export type IntentHandler<T = unknown> = (formData: FormData) => Promise<Result<T, AppError>>;

export type IntentHandlers = Record<string, IntentHandler>;

export type IntentResponse<Handlers extends IntentHandlers> = {
  [K in keyof Handlers]: Handlers[K] extends IntentHandler<infer R> ? R : never;
}[keyof Handlers];

export interface IntentActionConfig {
  fieldName?: string;
  defaultHandler?: IntentHandler;
  cloneFormData?: boolean;
}
