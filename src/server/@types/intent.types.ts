import type { FieldError } from '../../error/@types/error.types';

export interface GetIntentOptions {
  name?: string;
}

export type IntentResult<T extends readonly string[]> = {
  intent: T[number] | null;
  errors: FieldError | null;
};
